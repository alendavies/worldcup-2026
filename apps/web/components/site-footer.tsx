'use client';

import { useLanguage } from '@/components/language-provider';

export function SiteFooter() {
    const { t } = useLanguage();
    return (
        <footer className="border-t border-border">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-5 sm:py-8">
                <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground sm:text-left">
                    {t('footer.label')}
                </p>
                <p className="text-center font-mono text-xs text-muted-foreground sm:text-left">
                    {t('footer.note')}
                </p>
            </div>
        </footer>
    );
}
