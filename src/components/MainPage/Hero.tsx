'use client';

import { Button } from '../ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-foreground py-48 md:py-64 px-4">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-7xl md:text-9xl font-bold whitespace-nowrap font-pacifico text-tertiary/30">
          {t('brand.name', 'Cozy Cakey')}
        </span>
      </div>
      
      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-tertiary">
          {t('hero.title', 'Handcrafted Cakes for Every Occasion')}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-secondary">
          {t('hero.subtitle', 'Baked with love, delivered with joy.')}
        </p>
        
        <Button href="/cakes" variant="default">
          {t('hero.cta', 'Explore Our Delicious Cakes')}
        </Button>
      </div>
    </div>
  );
}
