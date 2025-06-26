'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { pacifico } from '@/app/layout';

export default function NavBar() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className={`text-4xl md:text-5xl text-tertiary leading-tight hover:opacity-90 transition-opacity ${pacifico.className}`}>
          Cozy Cakey
        </Link>
        <div className="hidden md:flex space-x-6 mr-24">
          <Link href="/" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">{t('home')}</Link>
          <Link href="/about" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">{t('about')}</Link>
          <Link href="/menu" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">{t('cakes')}</Link>
          <Link href="/contact" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">{t('contact')}</Link>
        </div>
        {/* Language Switcher - top right, tighter and further in corner */}
        <div className="hidden md:flex fixed right-3 top-3 z-30 items-center space-x-1 bg-primary/80 rounded-full px-1 py-0.5 shadow-sm">
          <button
            onClick={() => setLanguage('en')}
            className={`px-1.5 py-0.5 rounded-full text-xl transition-colors ${language === 'en' ? 'bg-white/30 text-white' : 'text-secondary hover:text-white'}`}
            aria-label="Switch to English"
          >
            🇺🇸
          </button>
          <span className="text-white/40 text-lg">|</span>
          <button
            onClick={() => setLanguage('ko')}
            className={`px-1.5 py-0.5 rounded-full text-xl transition-colors ${language === 'ko' ? 'bg-white/30 text-white' : 'text-secondary hover:text-white'}`}
            aria-label="Switch to Korean"
          >
            🇰🇷
          </button>
        </div>
        <button className="md:hidden text-3xl text-secondary hover:text-foreground transition-colors p-2 -mr-2">
          ☰
        </button>
      </nav>
    </header>
  );
}
