
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      // Get user role and redirect accordingly
      const userObj = JSON.parse(user);
      if (userObj.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/client-dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-synapse-purple/5">
      <div className="relative w-full max-w-md">
        <div className="star-bg-pattern" aria-hidden="true"></div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
