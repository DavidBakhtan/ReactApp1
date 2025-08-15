export interface ConservationArea {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  maxVisitors: number;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
}

export interface Booking {
  id: string;
  conservationAreaId: string;
  date: string;
  timeSlotId: string;
  visitors: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface BookingForm {
  conservationAreaId: string;
  date: string;
  timeSlotId: string;
  visitors: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}