import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BookingForm as BookingFormType, Booking as BookingType } from '@/types/booking';
import { conservationAreas, timeSlots, PRICE_PER_VISITOR } from '@/data/conservationAreas';
import { BookingForm } from '@/components/BookingForm';
import { BookingConfirmation } from '@/components/BookingConfirmation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingType | null>(null);
  const { toast } = useToast();

  const areaId = searchParams.get('area');
  const area = conservationAreas.find(a => a.id === areaId);

  const handleBookingComplete = async (bookingData: BookingFormType) => {
    const newBooking: BookingType = {
      id: `BOOK-${Date.now()}`,
      ...bookingData,
      totalPrice: bookingData.visitors * PRICE_PER_VISITOR,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
   try {
      // Save booking to JSON server database
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        setBooking(newBooking);
        toast({
          title: "Booking Confirmed",
          description: "Your reservation has been successfully saved.",
        });
      } else {
        throw new Error('Failed to save booking');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewBooking = () => {
    setBooking(null);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Conservation Area Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested conservation area could not be found.</p>
          <Button onClick={() => navigate('/')} variant="hero">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  if (booking) {
    const timeSlot = timeSlots.find(slot => slot.id === booking.timeSlotId);
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Conservation Areas
            </Button>
          </div>
          
          <BookingConfirmation
            booking={booking}
            areaName={area.name}
            timeSlotLabel={timeSlot?.label || ''}
            onNewBooking={handleNewBooking}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Conservation Areas
          </Button>
        </div>
        
        <BookingForm
          area={area}
          onBookingComplete={handleBookingComplete}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default Booking;