'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createT, type Lang, type TKey } from '@/lib/i18n';

type LanguageContextValue = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: TKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = 'wc26-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>('en');

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
        if (stored === 'en' || stored === 'es') {
            setTimeout(() => setLangState(stored), 0);
        } else if (navigator.language.toLowerCase().startsWith('es')) {
            setTimeout(() => setLangState('es'), 0);
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (next: Lang) => {
        setLangState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: createT(lang) }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
}
