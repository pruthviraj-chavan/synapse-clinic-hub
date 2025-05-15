
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Users, CreditCard } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [name, setName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setName(user.name);
    }
  }, []);

  const stats = [
    { 
      title: "Total Clients", 
      value: "136", 
      icon: <Users className="h-5 w-5 text-synapse-purple" />,
      change: "+18.2%",
      status: "increase"
    },
    { 
      title: "Appointments Today", 
      value: "8", 
      icon: <Calendar className="h-5 w-5 text-synapse-purple" />,
      change: "Same as yesterday",
      status: "neutral"
    },
    { 
      title: "Unread Messages", 
      value: "12", 
      icon: <MessageSquare className="h-5 w-5 text-synapse-purple" />,
      change: "+3 new",
      status: "increase"
    },
    { 
      title: "Monthly Revenue", 
      value: "₹58,243", 
      icon: <CreditCard className="h-5 w-5 text-synapse-purple" />,
      change: "+12.3%",
      status: "increase"
    },
  ];

  const renderUpcomingAppointments = () => {
    // Mock data for upcoming appointments
    const appointments = [
      { id: 1, patientName: 'Rahul Sharma', time: '9:00 AM', date: 'Today', reason: 'Neurological Consultation' },
      { id: 2, patientName: 'Priya Patel', time: '11:30 AM', date: 'Today', reason: 'Astrology Reading' },
      { id: 3, patientName: 'Amit Kumar', time: '2:00 PM', date: 'Today', reason: 'Follow-up' },
      { id: 4, patientName: 'Deepa Singh', time: '10:15 AM', date: 'Tomorrow', reason: 'Initial Consultation' },
    ];

    return (
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-900 border border-synapse-purple/10 shadow-sm">
            <div className="flex-1">
              <p className="font-medium">{appointment.patientName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {appointment.reason}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {appointment.time} • <span className="text-synapse-purple">{appointment.date}</span>
              </p>
            </div>
          </div>
        ))}
        <Button className="w-full bg-synapse-purple hover:bg-synapse-deep-purple">
          View All Appointments
        </Button>
      </div>
    );
  };

  const renderRecentMessages = () => {
    // Mock data for recent messages
    const messages = [
      { id: 1, from: 'Rahul Sharma', time: '10:23 AM', message: 'Thank you for the consultation yesterday...' },
      { id: 2, from: 'Priya Patel', time: 'Yesterday', message: 'I had some questions about my birth chart...' },
      { id: 3, from: 'System', time: 'Yesterday', message: 'New appointment request from Vikram Malhotra' },
    ];

    return (
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start p-4 rounded-lg bg-white dark:bg-gray-900 border border-synapse-purple/10 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-synapse-purple/20 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-synapse-purple font-medium">{message.from[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium truncate">{message.from}</p>
                <p className="text-xs text-gray-500">{message.time}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{message.message}</p>
            </div>
          </div>
        ))}
        <Button className="w-full bg-synapse-purple hover:bg-synapse-deep-purple">
          View All Messages
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {name}</h1>
        <Button onClick={() => {
          toast({
            title: "Note",
            description: "This is a demo with mock data. MongoDB integration will be added later.",
          });
        }}>
          View Analytics
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.status === 'increase' ? 'text-green-500' : 
                stat.status === 'decrease' ? 'text-red-500' : 
                'text-gray-500'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {renderUpcomingAppointments()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {renderRecentMessages()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
