export default function CallToAction() {
  return (
    <section className="text-center bg-primary rounded-lg p-12">
      <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Plan Your Dream Cake?</h2>
      <p className="text-xl text-secondary mb-8">
        Let's create something sweet together for your next celebration.
      </p>
      <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
        <a 
          href="/collection" 
          className="inline-block bg-secondary text-background px-8 py-3 rounded-lg font-semibold hover:bg-tertiary transition-colors"
        >
          Browse Our Cake Creations
        </a>
        <a 
          href="/order" 
          className="inline-block bg-background text-secondary px-8 py-3 rounded-lg font-semibold border-2 border-secondary hover:bg-background1 transition-colors"
        >
          Get in Touch for a Sweet Consultation
        </a>
      </div>
    </section>
  );
}