
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, Plus } from 'lucide-react';

const ClientDashboard = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setName(user.name);
    }
  }, []);

  const renderUpcomingAppointments = () => {
    // Mock data
    const appointments = [
      { id: 1, type: 'Neurological Consultation', time: '10:00 AM', date: 'Friday, May 20, 2025', doctor: 'Dr. Sharma' },
      { id: 2, type: 'Astrology Reading', time: '2:30 PM', date: 'Monday, May 23, 2025', doctor: 'Dr. Sharma' },
    ];

    return (
      <>
        {appointments.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-gray-500 mb-4">No upcoming appointments</p>
            <Button 
              variant="outline"
              className="border-synapse-purple text-synapse-purple hover:bg-synapse-purple hover:text-white"
              onClick={() => navigate('/client-appointments/book')}
            >
              <Plus className="mr-2 h-4 w-4" /> Book Appointment
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-synapse-purple/10 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-synapse-purple mr-2" />
                    <span className="font-medium">{appointment.type}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-synapse-purple hover:text-synapse-deep-purple hover:bg-synapse-purple/10">
                    Reschedule
                  </Button>
                </div>
                <div className="pl-7">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.doctor}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <Button
                variant="outline" 
                className="border-synapse-purple text-synapse-purple hover:bg-synapse-purple hover:text-white"
              >
                View All
              </Button>
              <Button 
                className="bg-synapse-purple hover:bg-synapse-deep-purple"
                onClick={() => navigate('/client-appointments/book')}
              >
                <Plus className="mr-2 h-4 w-4" /> Book Appointment
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderRecentQueries = () => {
    // Mock data for recent queries
    const queries = [
      { 
        id: 1, 
        title: 'Question about recurring headaches', 
        date: 'May 15, 2025',
        status: 'Answered',
        summary: 'I\'ve been experiencing headaches every afternoon...'
      },
      { 
        id: 2, 
        title: 'Birth chart reading request', 
        date: 'May 12, 2025',
        status: 'Pending',
        summary: 'I would like to understand how my recent career change...'
      },
    ];

    return (
      <div className="space-y-4">
        {queries.map((query) => (
          <div key={query.id} className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-synapse-purple/10 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{query.title}</h4>
              <div className={`text-xs px-2 py-1 rounded ${
                query.status === 'Answered' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {query.status}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{query.date}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{query.summary}</p>
          </div>
        ))}
        <div className="flex justify-between">
          <Button
            variant="outline" 
            className="border-synapse-purple text-synapse-purple hover:bg-synapse-purple hover:text-white"
            onClick={() => navigate('/queries')}
          >
            View All
          </Button>
          <Button 
            className="bg-synapse-purple hover:bg-synapse-deep-purple"
            onClick={() => navigate('/queries/new')}
          >
            <Plus className="mr-2 h-4 w-4" /> New Query
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome, {name}</h1>
        <p className="text-muted-foreground">Here's an overview of your health journey with us.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,500</div>
            <p className="text-xs text-muted-foreground">May 25, 2025</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="queries">Health & Astrology Queries</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled visits with Dr. Sharma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderUpcomingAppointments()}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="queries" className="pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Recent Queries</CardTitle>
              <CardDescription>Questions about neurology or astrology you've submitted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderRecentQueries()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Reports uploaded by Dr. Sharma for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-4 text-center">
              <p className="text-muted-foreground mb-2">No reports have been uploaded yet</p>
              <p className="text-sm text-muted-foreground">Reports will appear here when your doctor uploads them</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Recent communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <div className="text-center">
                <MessageSquare className="h-10 w-10 text-synapse-purple mx-auto mb-3" />
                <h3 className="font-medium mb-1">Start a conversation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Message your doctor directly through our secure platform
                </p>
                <Button 
                  className="bg-synapse-purple hover:bg-synapse-deep-purple"
                  onClick={() => navigate('/messages')}
                >
                  Open Messages
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
