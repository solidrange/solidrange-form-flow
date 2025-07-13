
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    dashboard: 'Dashboard',
    review: 'Review',
    forms: 'Forms',
    build: 'Build',
    settings: 'Settings',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    theme: 'Theme & Appearance',
    globalTheme: 'Global Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    brandIdentity: 'Brand Identity',
    languageSettings: 'Language Settings',
    selectLanguage: 'Select Language',
    languageDescription: 'Choose your preferred language for the application interface',
    themeDescription: 'Set the default theme for the entire application'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    review: 'مراجعة',
    forms: 'النماذج',
    build: 'إنشاء',
    settings: 'الإعدادات',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    theme: 'المظهر والثيم',
    globalTheme: 'الثيم العام',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    brandIdentity: 'هوية العلامة التجارية',
    languageSettings: 'إعدادات اللغة',
    selectLanguage: 'اختر اللغة',
    languageDescription: 'اختر لغتك المفضلة لواجهة التطبيق',
    themeDescription: 'تعيين الثيم الافتراضي للتطبيق بأكمله'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-language', language);
    
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
