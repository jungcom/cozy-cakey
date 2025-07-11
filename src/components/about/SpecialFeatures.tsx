export default function SpecialFeatures() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold text-amber-900 mb-8">What Makes Us Special</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">Fresh Ingredients</h3>
          <p className="text-amber-700">
            We source the freshest, highest-quality ingredients from local suppliers to ensure every bite is perfect.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">Custom Designs</h3>
          <p className="text-amber-700">
            Every cake is uniquely designed to match your vision and make your celebration truly special.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">Attention to Detail</h3>
          <p className="text-amber-700">
            From the first sketch to the final decoration, we pour love and precision into every detail.
          </p>
        </div>
      </div>
    </section>
  );
}