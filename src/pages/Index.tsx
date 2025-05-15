
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="star-bg-pattern" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <img src="/logo.svg" alt="Synapse Clinic Logo" className="h-24 w-24 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-synapse-purple">Synapse</span> Clinic Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Where Neurology meets Astrology for a holistic approach to your well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-6 bg-synapse-purple hover:bg-synapse-deep-purple"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              variant="outline" 
              className="text-lg px-8 py-6 border-synapse-purple text-synapse-purple hover:bg-synapse-purple hover:text-white"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-synapse-slate py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Neurology Feature */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-synapse-purple/10">
              <div className="h-12 w-12 rounded-full bg-synapse-purple/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-synapse-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Neurological Consultations</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Expert diagnosis and treatment of neurological disorders with our specialist.
              </p>
            </div>
            
            {/* Astrology Feature */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-synapse-purple/10">
              <div className="h-12 w-12 rounded-full bg-synapse-purple/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-synapse-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Astrological Readings</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Personalized birth chart analyses and astrological consultations.
              </p>
            </div>
            
            {/* Integration Feature */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-synapse-purple/10">
              <div className="h-12 w-12 rounded-full bg-synapse-purple/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-synapse-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Holistic Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Unique approach combining neurology and astrology for comprehensive wellness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-synapse-purple to-synapse-deep-purple text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Begin Your Wellness Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Create an account to book appointments, ask questions, and access personalized care.
          </p>
          <Button 
            onClick={() => navigate('/register')}
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-synapse-purple px-8 py-6 text-lg"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/logo.svg" alt="Synapse Clinic Logo" className="h-10 w-10 mr-3" />
            <span className="font-bold text-lg">Synapse Clinic</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Synapse Clinic Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
