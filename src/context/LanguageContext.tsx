'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type TranslationKey = string;
type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = Record<Language, Record<string, TranslationValue>>;

const translations: Translations = {
  en: {
    brand: {
      name: 'Cozy Cakey'
    },
    home: 'Home',
    about: 'About Us',
    cakes: 'Our Cakes',
    order: 'Order Online',
    contact: 'Contact',
    hero: {
      title: 'Handcrafted Cakes for Every Occasion',
      subtitle: 'Baked with love, delivered with joy.',
      cta: 'Explore Our Delicious Cakes'
    }
  },
  ko: {
    brand: {
      name: 'Cozy Cakey'
    },
    home: '홈',
    about: '회사소개',
    cakes: '케이크',
    order: '주문하기',
    contact: '문의하기',
    hero: {
      title: '모든 특별한 순간을 위한 핸드메이드 케이크',
      subtitle: '사랑으로 구워 기쁨으로 전해드립니다.',
      cta: '맛있는 케이크 구경하기'
    }
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Persist language choice in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'ko') setLanguage(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key: string, defaultValue: string = ''): string => {
    try {
      const keys = key.split('.');
      let result: TranslationValue = translations[language];
      
      for (const k of keys) {
        if (result === undefined || typeof result !== 'object') break;
        result = result[k];
      }
      
      if (typeof result === 'string') {
        return result;
      }
      
      // If we get here, either the key wasn't found or it points to an object
      return defaultValue || key;
    } catch (e) {
      return defaultValue || key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};