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
            <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3'>
                <Link href='/' className='flex items-center gap-2.5'>
                    <Image
                        src='/brand/wc26-logo.png'
                        alt='FIFA World Cup 26'
                        width={48}
                        height={48}
                        className='h-12 w-12 object-contain'
                    />
                    <span className='flex flex-col leading-none'>
                        <span className='font-mono text-sm font-black uppercase tracking-tight'>
                            World Cup <span className='text-accent'>26</span>
                        </span>
                        <span className='font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
                            {t('header.tagline')}
                        </span>
                    </span>
                </Link>

                <nav className='hidden items-center gap-1 md:flex'>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={`/${link.href}`}
                            className='rounded-full px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground'
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className='flex items-center gap-3'>
                    <div
                        className='hidden items-center gap-1.5 sm:flex'
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
        </header>
    );
}
