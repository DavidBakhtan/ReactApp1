import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Booking } from '@/types/booking';
import { conservationAreas } from '@/data/conservationAreas';
import { timeSlots } from '@/data/conservationAreas';
import { Trash2, Edit2, Eye, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    }
  };

  const handleLogin = () => {
    if (password === 'root') {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Panel",
      });
    } else {
      toast({
        title: "Password Error",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/bookings/${id}`, {
        method: 'DELETE',
      });
      setBookings(bookings.filter(booking => booking.id !== id));
      toast({
        title: "Deleted Successfully",
        description: "Booking deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive",
      });
    }
  };

  const updateBooking = async (updatedBooking: Booking) => {
    try {
      await fetch(`http://localhost:3001/bookings/${updatedBooking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });
      setBookings(bookings.map(booking => 
        booking.id === updatedBooking.id ? updatedBooking : booking
      ));
      setEditingBooking(null);
      toast({
        title: "Updated Successfully",
        description: "Booking updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  const getAreaName = (id: string) => {
    const area = conservationAreas.find(area => area.id === id);
    return area ? area.name : id;
  };

  const getTimeSlotLabel = (id: string) => {
    const slot = timeSlots.find(slot => slot.id === id);
    return slot ? slot.label : id;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-[hsl(var(--forest-green))] text-white">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Lock className="h-6 w-6" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full"
              variant="default"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Booking Management Panel</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Bookings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Bookings ({bookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Conservation Area</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Visitors</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">#{booking.id}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{getAreaName(booking.conservationAreaId)}</TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString('en-US')}</TableCell>
                      <TableCell>{getTimeSlotLabel(booking.timeSlotId)}</TableCell>
                      <TableCell>{booking.visitors}</TableCell>
                      <TableCell>${booking.totalPrice}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                               <DialogTitle>Booking Details #{booking.id}</DialogTitle>
                               </DialogHeader>
                               <div className="space-y-4">
                                 <div>
                                   <Label>Customer Name</Label>
                                   <p className="text-sm text-muted-foreground">{booking.customerName}</p>
                                 </div>
                                 <div>
                                   <Label>Email</Label>
                                   <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                                 </div>
                                 <div>
                                   <Label>Phone Number</Label>
                                   <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                                 </div>
                                 <div>
                                   <Label>Created Date</Label>
                                   <p className="text-sm text-muted-foreground">
                                     {new Date(booking.createdAt).toLocaleString('en-US')}
                                   </p>
                                 </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingBooking(booking)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Booking #{booking.id}</DialogTitle>
                               </DialogHeader>
                               {editingBooking && (
                                 <div className="space-y-4">
                                   <div>
                                     <Label>Status</Label>
                                     <Select
                                       value={editingBooking.status}
                                       onValueChange={(value: 'pending' | 'confirmed' | 'cancelled') => 
                                         setEditingBooking({ ...editingBooking, status: value })
                                       }
                                     >
                                       <SelectTrigger>
                                         <SelectValue />
                                       </SelectTrigger>
                                       <SelectContent>
                                         <SelectItem value="pending">Pending</SelectItem>
                                         <SelectItem value="confirmed">Confirmed</SelectItem>
                                         <SelectItem value="cancelled">Cancelled</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </div>
                                   <div>
                                     <Label>Number of Visitors</Label>
                                     <Input
                                       type="number"
                                       value={editingBooking.visitors}
                                       onChange={(e) => {
                                         const visitors = parseInt(e.target.value);
                                         setEditingBooking({ 
                                           ...editingBooking, 
                                           visitors,
                                           totalPrice: visitors * 25
                                         });
                                       }}
                                       min="1"
                                       max="8"
                                     />
                                   </div>
                                   <Button 
                                     onClick={() => updateBooking(editingBooking)}
                                     className="w-full"
                                   >
                                     Save Changes
                                   </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteBooking(booking.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;