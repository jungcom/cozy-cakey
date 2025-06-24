import { Button } from '../ui/button';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-foreground py-48 md:py-64 px-4">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-7xl md:text-9xl font-bold whitespace-nowrap font-pacifico text-tertiary/30">
          Cozy Cakey
        </span>
      </div>
      
      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-tertiary">
          Handcrafted Cakes for <br className="hidden md:block" />
          <span className="drop-shadow-md">Every Occasion</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-secondary">
          Baked with love, delivered with joy.
        </p>
        
        <Button href="/cakes" variant="default">
          Explore Our Delicious Cakes
        </Button>
      </div>
    </div>
  );
}
