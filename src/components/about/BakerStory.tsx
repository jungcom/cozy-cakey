export default function BakerStory() {
  return (
    <section className="text-center">
      <div className="mb-8">
        <img 
          src="/images/baker-portrait.jpg" 
          alt="Our passionate baker" 
          className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
        />
      </div>
      <div className="prose prose-lg max-w-none text-amber-900">
        <p className="text-xl leading-relaxed mb-6">
          What started as a childhood fascination with my grandmother's secret recipes has blossomed into a lifelong passion for creating memorable moments through cake.
        </p>
        <p className="text-lg leading-relaxed">
          Every cake tells a story, and we're honored to be part of your most special celebrations. From intimate family gatherings to grand celebrations, our handcrafted cakes are designed to bring joy and sweetness to life's most precious moments.
        </p>
      </div>
    </section>
  );
}