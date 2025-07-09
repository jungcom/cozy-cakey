import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Our Story</h2>
          <p className="text-lg text-amber-900 mb-8">
            At Cozy Cakey, we believe every celebration deserves a special cake. Our master bakers use only the finest ingredients to create delicious, handcrafted cakes that make your moments memorable.
          </p>
          <Link 
            href="/about"
            className="inline-block bg-amber-700 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition-colors font-medium"
            style={{ color: 'white' }}
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
