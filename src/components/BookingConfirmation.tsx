import { Booking } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, Clock, Users, MapPin, Mail, Phone, User } from 'lucide-react';

interface BookingConfirmationProps {
  booking: Booking;
  areaName: string;
  timeSlotLabel: string;
  onNewBooking: () => void;
}

export const BookingConfirmation = ({ booking, areaName, timeSlotLabel, onNewBooking }: BookingConfirmationProps) => {
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-[hsl(var(--forest-green))]" />
        </div>
        <CardTitle className="text-2xl text-[hsl(var(--forest-green))]">
          Booking Confirmed!
        </CardTitle>
        <CardDescription>
          Your reservation has been successfully submitted. You'll receive a confirmation email shortly.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-[hsl(var(--secondary))] p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Booking Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{areaName}</div>
                  <div className="text-sm text-muted-foreground">Conservation Area</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{formattedDate}</div>
                  <div className="text-sm text-muted-foreground">Visit Date</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{timeSlotLabel}</div>
                  <div className="text-sm text-muted-foreground">Time Slot</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{booking.visitors} visitor{booking.visitors > 1 ? 's' : ''}</div>
                  <div className="text-sm text-muted-foreground">Total Guests</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{booking.customerName}</div>
                  <div className="text-sm text-muted-foreground">Lead Visitor</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{booking.customerEmail}</div>
                  <div className="text-sm text-muted-foreground">Email</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[hsl(var(--forest-green))] text-white p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-lg">Total Cost</h4>
              <p className="text-sm opacity-90">Booking ID: {booking.id}</p>
            </div>
            <div className="text-3xl font-bold">${booking.totalPrice}</div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Important Information</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Please arrive 15 minutes before your scheduled time</li>
            <li>• Bring appropriate clothing and footwear for outdoor activities</li>
            <li>• Follow all conservation area guidelines and respect wildlife</li>
            <li>• Contact us at least 24 hours in advance for cancellations</li>
          </ul>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={() => window.print()}>
            Print Confirmation
          </Button>
          <Button variant="hero" className="flex-1" onClick={onNewBooking}>
            Make Another Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};