import { ConservationArea } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin } from 'lucide-react';

interface ConservationAreaCardProps {
  area: ConservationArea;
  onBookNow: (areaId: string) => void;
}

export const ConservationAreaCard = ({ area, onBookNow }: ConservationAreaCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={area.image}
          alt={area.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg">{area.name}</h3>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[hsl(var(--forest-green))]" />
          {area.name}
        </CardTitle>
        <CardDescription>{area.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Max {area.maxVisitors} visitors per session
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {area.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="nature" 
          className="w-full"
          onClick={() => onBookNow(area.id)}
        >
          Book Your Visit
        </Button>
      </CardFooter>
    </Card>
  );
};