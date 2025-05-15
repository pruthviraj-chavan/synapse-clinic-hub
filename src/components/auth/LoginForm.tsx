
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication for now - will connect to MongoDB later
    setTimeout(() => {
      // Demo login logic - in real app we'd validate against database
      if (email === 'admin@example.com' && password === 'password') {
        toast({
          title: "Login successful",
          description: "Welcome back to Synapse Clinic Hub!",
        });
        localStorage.setItem('user', JSON.stringify({
          name: 'Admin User',
          email,
          role: 'admin'
        }));
        navigate('/dashboard');
      } else if (email === 'client@example.com' && password === 'password') {
        toast({
          title: "Login successful",
          description: "Welcome back to Synapse Clinic Hub!",
        });
        localStorage.setItem('user', JSON.stringify({
          name: 'Client User',
          email,
          role: 'client'
        }));
        navigate('/client-dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-[350px] shadow-lg border-synapse-purple/20">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <img src="/logo.svg" alt="Synapse Logo" className="h-16 w-16" />
        </div>
        <CardTitle className="text-2xl text-center font-bold">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-synapse-purple/20 focus:border-synapse-purple"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-synapse-purple hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-synapse-purple/20 focus:border-synapse-purple"
              />
            </div>
            <Button type="submit" className="w-full bg-synapse-purple hover:bg-synapse-deep-purple" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-gray-500 text-center mt-2">
          Demo accounts:
          <div className="grid grid-cols-2 gap-2 text-xs mt-1">
            <div>
              <div>Admin: admin@example.com</div>
              <div>Password: password</div>
            </div>
            <div>
              <div>Client: client@example.com</div>
              <div>Password: password</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-synapse-purple font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
