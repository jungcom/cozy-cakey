import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-600 text-white py-20 md:py-32 px-4">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-7xl md:text-9xl font-bold whitespace-nowrap font-dancing-script">
          Cozy Cakey
        </span>
      </div>
      
      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Handcrafted Cakes for <br className="hidden md:block" />
          <span className="text-amber-100">Every Occasion</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Baked with love, delivered with joy.
        </p>
        
        <Link 
          href="/cakes"
          className="inline-block bg-white text-amber-700 hover:bg-amber-50 font-medium rounded-full px-8 py-3 text-lg transition-colors shadow-lg"
        >
          Explore Our Delicious Cakes
        </Link>
      </div>
    </div>
  );
}
