'use client';

import { useLanguage } from '@/components/language-provider';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';

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
        <header className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur'>
            <div className='mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-5 sm:py-3'>
                <div className='flex w-full items-center justify-between sm:w-auto'>
                    <Link href='/' className='flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                        <Image
                            src='/brand/wc26-logo.png'
                            alt='FIFA World Cup 26'
                            width={48}
                            height={48}
                            className='h-10 w-10 object-contain sm:h-12 sm:w-12'
                        />
                        <span className='flex flex-col leading-none'>
                            <span className='font-mono text-sm font-black uppercase tracking-tight'>
                                World Cup <span className='text-accent'>26</span>
                            </span>
                            <span className='hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground sm:block'>
                                {t('header.tagline')}
                            </span>
                        </span>
                    </Link>

                    <div className='flex items-center gap-2 sm:hidden'>
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4'>
                    <nav className='no-scrollbar flex w-full items-center gap-1 overflow-x-auto pb-1 sm:w-auto sm:pb-0'>
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={`/${link.href}`}
                                className='inline-flex min-h-11 shrink-0 items-center justify-center rounded-full px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground active:bg-accent/20 sm:min-h-0 sm:px-3 sm:py-1.5 sm:hover:bg-transparent sm:active:bg-transparent'
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className='hidden items-center gap-3 sm:flex'>
                        <div
                            className='hidden items-center gap-1.5 lg:flex'
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
                                    className='h-3.75 w-5.5 rounded-xs object-cover ring-1 ring-border'
                                />
                            ))}
                        </div>
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
