import { useState } from 'react';
import { BookingForm as BookingFormType, ConservationArea } from '@/types/booking';
import { timeSlots, PRICE_PER_VISITOR } from '@/data/conservationAreas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  area: ConservationArea;
  onBookingComplete: (booking: BookingFormType) => void;
  onCancel: () => void;
}

export const BookingForm = ({ area, onBookingComplete, onCancel }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<BookingFormType>>({
    conservationAreaId: area.id,
    visitors: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.timeSlotId || !formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if ((formData.visitors || 0) > area.maxVisitors) {
      toast({
        title: "Too Many Visitors",
        description: `Maximum ${area.maxVisitors} visitors allowed per session.`,
        variant: "destructive"
      });
      return;
    }

    onBookingComplete(formData as BookingFormType);
  };

  const totalPrice = (formData.visitors || 0) * PRICE_PER_VISITOR;
  const selectedTimeSlot = timeSlots.find(slot => slot.id === formData.timeSlotId);

  // Get tomorrow's date as minimum booking date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[hsl(var(--forest-green))]" />
          Book Your Visit to {area.name}
        </CardTitle>
        <CardDescription>
          Reserve your spot for a 3-hour session in this beautiful conservation area.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Visit Date
              </Label>
              <Input
                id="date"
                type="date"
                min={minDate}
                value={formData.date || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time Slot
              </Label>
              <Select value={formData.timeSlotId} onValueChange={(value) => setFormData(prev => ({ ...prev, timeSlotId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="visitors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Number of Visitors (Max: {area.maxVisitors})
            </Label>
            <Input
              id="visitors"
              type="number"
              min="1"
              max={area.maxVisitors}
              value={formData.visitors || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, visitors: parseInt(e.target.value) || 1 }))}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.customerName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.customerEmail || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.customerPhone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          
          {formData.visitors && formData.visitors > 0 && (
            <Card className="bg-[hsl(var(--secondary))] border-[hsl(var(--forest-green))]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-medium">
                      <DollarSign className="h-4 w-4" />
                      Total Cost
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formData.visitors} visitor{formData.visitors > 1 ? 's' : ''} × ${PRICE_PER_VISITOR}
                    </div>
                    {selectedTimeSlot && (
                      <div className="text-sm text-muted-foreground">
                        {selectedTimeSlot.label}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-[hsl(var(--forest-green))]">
                    ${totalPrice}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              Complete Booking
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};