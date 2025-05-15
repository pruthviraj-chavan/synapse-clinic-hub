
import BookingForm from "@/components/appointments/BookingForm";

const BookAppointment = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Book an Appointment</h1>
        <p className="text-muted-foreground">Schedule a consultation with Dr. Sharma.</p>
      </div>
      
      <BookingForm />
    </div>
  );
};

export default BookAppointment;
