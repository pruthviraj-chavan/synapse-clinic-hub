
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from '@/components/ui/textarea';

// Time slots for appointment
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM'
];

// Types of services
const serviceTypes = [
  { value: '1', label: 'Initial Neurological Consultation', price: 3500 },
  { value: '2', label: 'Follow-up Consultation', price: 2000 },
  { value: '3', label: 'Neurological Testing', price: 5000 },
  { value: '4', label: 'Personalized Treatment Plan', price: 4500 },
  { value: '5', label: 'Birth Chart Analysis', price: 2500 },
  { value: '6', label: 'Transit Forecast', price: 2000 },
  { value: '7', label: 'Compatibility Analysis', price: 3000 },
  { value: '8', label: 'Career & Finance Reading', price: 3500 }
];

interface BookingFormProps {
  onBook?: (appointmentData: any) => void;
}

const BookingForm = ({ onBook }: BookingFormProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get selected service from navigation state if available
  const initialService = location.state?.selectedService ? 
    serviceTypes.find(s => s.value === location.state.selectedService.id) || serviceTypes[0] :
    serviceTypes[0];

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [serviceType, setServiceType] = useState(initialService.value);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  
  // Find current service price
  const currentService = serviceTypes.find(s => s.value === serviceType);
  const price = currentService ? currentService.price : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !serviceType || !paymentMethod) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all the required fields.",
      });
      return;
    }

    const appointmentData = {
      date: format(date, 'PPP'),
      time: timeSlot,
      serviceTypeId: serviceType,
      serviceTypeName: currentService?.label,
      price,
      paymentMethod,
      notes
    };

    toast({
      title: "Appointment booked!",
      description: `Your appointment has been scheduled for ${format(date, 'PPP')} at ${timeSlot}.`,
    });
    
    // Call the callback if provided
    if (onBook) {
      onBook(appointmentData);
    }
    
    // Navigate back to dashboard
    navigate('/client-dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Service</CardTitle>
            <CardDescription>
              Choose the type of consultation or service you need.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="service-type">Service Type</Label>
                <Select 
                  value={serviceType} 
                  onValueChange={setServiceType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label} - ₹{service.price}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific concerns or information you want to share?"
                  className="min-h-[100px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Date and Time</CardTitle>
            <CardDescription>
              Choose your preferred appointment date and time slot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        // Disable past dates and weekends (0 is Sunday, 6 is Saturday)
                        return date < today || date.getDay() === 0 || date.getDay() === 6;
                      }}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Time</Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Select your preferred payment method.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                      <SelectItem value="cash">Cash (Pay at Clinic)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Total Amount</p>
                  <p className="text-sm text-muted-foreground">{currentService?.label}</p>
                </div>
                <div className="text-xl font-bold text-synapse-purple">₹{price}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-synapse-purple hover:bg-synapse-deep-purple"
            >
              <CreditCard className="mr-2 h-4 w-4" /> Confirm Booking
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default BookingForm;
