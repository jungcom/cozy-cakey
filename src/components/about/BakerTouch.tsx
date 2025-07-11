export default function BakerTouch() {
  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">The Baker's Touch</h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-amber-800 text-lg leading-relaxed mb-4">
            Our founder brings years of culinary expertise and an unwavering commitment to quality in every creation.
          </p>
          <p className="text-amber-700 leading-relaxed">
            We believe in using only the finest, locally-sourced ingredients and traditional baking techniques combined with innovative designs to create cakes that not only taste incredible but are true works of art.
          </p>
        </div>
        <div>
          <img 
            src="/images/kitchen-behind-scenes.jpg" 
            alt="Our kitchen where magic happens" 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}