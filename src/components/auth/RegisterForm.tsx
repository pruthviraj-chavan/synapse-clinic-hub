
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { findUserByEmail, createUser } from '@/lib/mongodb';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both password fields match.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Check if user already exists
      const existingUser = await findUserByEmail(formData.email);
      
      if (existingUser) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "An account with this email already exists.",
        });
        setIsLoading(false);
        return;
      }
      
      // Create new user in MongoDB
      await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password, // In production, hash this password
        role: 'client' // Default role for new users
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px] shadow-lg border-synapse-purple/20">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <img src="/logo.svg" alt="Synapse Logo" className="h-16 w-16" />
        </div>
        <CardTitle className="text-2xl text-center font-bold">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to register for Synapse Clinic Hub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-synapse-purple/20 focus:border-synapse-purple"
                autoComplete="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-synapse-purple/20 focus:border-synapse-purple"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-synapse-purple/20 focus:border-synapse-purple"
                autoComplete="new-password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-synapse-purple/20 focus:border-synapse-purple"
                autoComplete="new-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-synapse-purple hover:bg-synapse-deep-purple" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full">
          Already have an account?{" "}
          <Link to="/login" className="text-synapse-purple font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
