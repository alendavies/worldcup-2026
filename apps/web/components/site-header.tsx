'use client';

import Image from 'next/image';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/components/language-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader() {
    const { t } = useLanguage();
    const links = [
        { label: t('nav.fixtures'), href: '#fixtures' },
        { label: t('nav.standings'), href: '#standings' },
        { label: t('nav.bracket'), href: '#knockout' },
    ];
    const hosts = [
        { code: 'ca', label: 'Canada' },
        { code: 'mx', label: 'Mexico' },
        { code: 'us', label: 'United States' },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3">
                <a href="#" className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
                        <Image
                            src="/brand/fifa-mono.svg"
                            alt="FIFA"
                            width={20}
                            height={20}
                            className="h-5 w-5 [filter:invert(1)] dark:[filter:invert(0)]"
                        />
                    </span>
                    <span className="flex flex-col leading-none">
                        <span className="font-mono text-sm font-black uppercase tracking-tight">
                            World Cup <span className="text-accent">26</span>
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            {t('header.tagline')}
                        </span>
                    </span>
                </a>

                <nav className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-full px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <div
                        className="hidden items-center gap-1.5 sm:flex"
                        aria-label={t('header.hosts')}
                    >
                        {hosts.map((host) => (
                            <Image
                                key={host.code}
                                src={`https://flagcdn.com/${host.code}.svg`}
                                alt={host.label}
                                title={host.label}
                                width={22}
                                height={15}
                                className="h-[15px] w-[22px] rounded-[2px] object-cover ring-1 ring-border"
                            />
                        ))}
                    </div>
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
