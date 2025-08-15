import { useNavigate } from 'react-router-dom';
import { conservationAreas } from '@/data/conservationAreas';
import { ConservationAreaCard } from '@/components/ConservationAreaCard';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-conservation.jpg';
import { MapPin, Clock, Users, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleBookNow = (areaId: string) => {
    navigate(`/booking?area=${areaId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <div className="absolute top-8 right-8 z-20">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin')}
            className="bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            System Administration
          </Button>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Nature's
            <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Hidden Treasures
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Reserve your spot in our pristine conservation areas. Experience wildlife, hiking trails, 
            and the beauty of protected natural habitats.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => document.getElementById('areas')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Conservation Areas
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[hsl(var(--secondary))]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Conservation Areas?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer unique experiences in carefully managed natural environments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[hsl(var(--forest-green))] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4 Unique Locations</h3>
              <p className="text-muted-foreground">
                From forest trails to mountain lakes, discover diverse ecosystems across our conservation network.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[hsl(var(--sky-blue))] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3-Hour Sessions</h3>
              <p className="text-muted-foreground">
                Perfect time slots from 9 AM to 6 PM, giving you ample time to explore and connect with nature.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[hsl(var(--earth-brown))] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Small Groups</h3>
              <p className="text-muted-foreground">
                Limited capacity ensures an intimate experience while protecting our fragile ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Areas Section */}
      <section id="areas" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Conservation Areas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each area offers unique experiences and carefully preserved natural habitats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conservationAreas.map((area) => (
              <ConservationAreaCard
                key={area.id}
                area={area}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[hsl(var(--secondary))]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Fair Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Support conservation efforts while enjoying unforgettable experiences
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-[var(--shadow-nature)] text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-[hsl(var(--forest-green))]" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Per Visitor</h3>
              <div className="text-5xl font-bold text-[hsl(var(--forest-green))] mb-4">$25</div>
              <p className="text-muted-foreground mb-6">
                For a full 3-hour session in any conservation area
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✓ 3-hour guided experience</li>
                <li>✓ Access to all area facilities</li>
                <li>✓ Educational materials</li>
                <li>✓ Conservation support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--forest-green))] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Regional Conservation Network</h3>
          <p className="text-lg opacity-90 mb-6">
            Protecting and preserving natural habitats for future generations
          </p>
          <p className="opacity-75">
            Book your visit today and become part of our conservation mission
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
