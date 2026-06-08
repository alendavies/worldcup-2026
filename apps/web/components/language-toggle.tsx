'use client';

import { useLanguage } from '@/components/language-provider';
import type { Lang } from '@/lib/i18n';

const options: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' },
];

export function LanguageToggle() {
    const { lang, setLang, t } = useLanguage();

    return (
        <div
            role="group"
            aria-label={t('lang.label')}
            className="flex h-9 items-center gap-1 rounded-full border border-border bg-secondary px-1.5"
        >
            {options.map((option) => {
                const active = lang === option.value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setLang(option.value)}
                        aria-pressed={active}
                        className={`flex h-6 items-center rounded-full px-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                            active
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
