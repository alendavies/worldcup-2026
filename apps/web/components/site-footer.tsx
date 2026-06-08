'use client';

import { useLanguage } from '@/components/language-provider';

export function SiteFooter() {
    const { t } = useLanguage();
    return (
        <footer className="border-t border-border">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {t('footer.label')}
                </p>
                <p className="font-mono text-xs text-muted-foreground">{t('footer.note')}</p>
            </div>
        </footer>
    );
}
