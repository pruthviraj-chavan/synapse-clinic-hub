
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useToast } from "@/components/ui/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: 'neurology' | 'astrology';
}

const Services = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [services] = useState<Service[]>([
    {
      id: '1',
      title: 'Initial Neurological Consultation',
      description: 'Comprehensive assessment of neurological health with our specialist Dr. Sharma.',
      price: 3500,
      duration: '60 minutes',
      category: 'neurology'
    },
    {
      id: '2',
      title: 'Follow-up Consultation',
      description: 'Review of progress, test results, and treatment adjustments.',
      price: 2000,
      duration: '30 minutes',
      category: 'neurology'
    },
    {
      id: '3',
      title: 'Neurological Testing',
      description: 'Advanced diagnostic procedures to identify neurological conditions.',
      price: 5000,
      duration: '90 minutes',
      category: 'neurology'
    },
    {
      id: '4',
      title: 'Personalized Treatment Plan',
      description: 'Custom-designed therapy and medication regimen based on your specific needs.',
      price: 4500,
      duration: '60 minutes',
      category: 'neurology'
    },
    {
      id: '5',
      title: 'Birth Chart Analysis',
      description: 'Detailed analysis of your natal chart to understand your life path and tendencies.',
      price: 2500,
      duration: '60 minutes',
      category: 'astrology'
    },
    {
      id: '6',
      title: 'Transit Forecast',
      description: 'Analysis of current planetary positions and their effects on your life.',
      price: 2000,
      duration: '45 minutes',
      category: 'astrology'
    },
    {
      id: '7',
      title: 'Compatibility Analysis',
      description: 'Assessment of relationship dynamics through astrological comparison.',
      price: 3000,
      duration: '75 minutes',
      category: 'astrology'
    },
    {
      id: '8',
      title: 'Career & Finance Reading',
      description: 'Astrological insights into your professional life and financial prospects.',
      price: 3500,
      duration: '60 minutes',
      category: 'astrology'
    }
  ]);

  const handleBookService = (service: Service) => {
    toast({
      title: "Booking initiated",
      description: `You selected: ${service.title}`,
    });
    navigate('/client-appointments/book', { state: { selectedService: service } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Our Services</h1>
        <p className="text-muted-foreground">
          Explore our specialized neurology and astrology offerings for optimal health and well-being.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="neurology">Neurology</TabsTrigger>
          <TabsTrigger value="astrology">Astrology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onBook={() => handleBookService(service)} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="neurology" className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.category === 'neurology')
              .map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onBook={() => handleBookService(service)} 
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="astrology" className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.category === 'astrology')
              .map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onBook={() => handleBookService(service)} 
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-synapse-purple/10 rounded-lg p-6 border border-synapse-purple/20">
        <h3 className="text-xl font-semibold mb-2">Personalized Services</h3>
        <p className="mb-4">
          Need a customized consultation combining neurology and astrology? Contact us for a tailored solution that addresses your specific needs.
        </p>
        <Button onClick={() => navigate('/contact')} variant="outline" className="border-synapse-purple text-synapse-purple hover:bg-synapse-purple hover:text-white">
          Contact Us
        </Button>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

const ServiceCard = ({ service, onBook }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border-synapse-purple/10">
      <div className={`h-2 w-full ${service.category === 'neurology' ? 'bg-synapse-purple' : 'bg-synapse-gold'}`} />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
            <CardDescription className="mt-1">{service.duration}</CardDescription>
          </div>
          <div className="px-3 py-1 rounded-full bg-synapse-purple/10 text-synapse-purple text-sm">
            {service.category === 'neurology' ? 'Neurology' : 'Astrology'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {service.description}
        </p>
        <div className="text-xl font-bold text-synapse-purple">
          ₹{service.price}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onBook} className="w-full bg-synapse-purple hover:bg-synapse-deep-purple">
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Services;
