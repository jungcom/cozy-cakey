'use client';

import { PageContainer } from '@/components/ui/page/PageContainer';
import { PageHeader } from '@/components/ui/page/PageHeader';

export default function AboutPage() {
  return (
    <PageContainer className="bg-background1">
      <PageHeader
        title="Our Story"
        subtitle="Baked with Love"
        description="Discover the passion and dedication behind every cake we create"
      />
      
      <div className="max-w-4xl mx-auto space-y-16">
        {/* The Spark */}
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

        {/* The Baker's Touch */}
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

        {/* What Makes Us Special */}
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

        {/* Call to Action */}
        <section className="text-center bg-amber-100 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Ready to Plan Your Dream Cake?</h2>
          <p className="text-xl text-amber-800 mb-8">
            Let's create something sweet together for your next celebration.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <a 
              href="/collection" 
              className="inline-block bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
            >
              Browse Our Cake Creations
            </a>
            <a 
              href="/order" 
              className="inline-block bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold border-2 border-amber-700 hover:bg-amber-50 transition-colors"
            >
              Get in Touch for a Sweet Consultation
            </a>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}