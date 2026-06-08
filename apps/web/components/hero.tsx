'use client';

import { Countdown } from '@/components/countdown';
import { useLanguage } from '@/components/language-provider';
import { firstMatch, heroStats } from '@/components/web-data';
import Image from 'next/image';

export function Hero() {
    const { t } = useLanguage();
    const hosts = [
        { code: 'ca', name: 'Canada' },
        { code: 'mx', name: 'Mexico' },
        { code: 'us', name: 'USA' },
    ];
    const stats = [
        { value: String(heroStats.teams), label: t('hero.stat.teams') },
        { value: String(heroStats.matches), label: t('hero.stat.matches') },
        { value: String(heroStats.cities), label: t('hero.stat.cities') },
        { value: String(heroStats.days), label: t('hero.stat.days') },
    ];

    return (
        <section className='relative overflow-hidden bg-zinc-950 text-zinc-50'>
            <div className='absolute inset-0'>
                <Image
                    src='/stadium-hero.png'
                    alt=''
                    fill
                    priority
                    className='object-cover opacity-40'
                />
                <div className='absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30' />
            </div>

            <div className='relative mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-5 sm:pb-12 sm:pt-20 md:pb-16 md:pt-28'>
                <div className='flex items-center gap-3'>
                    <Image
                        src='/brand/wc26-logo.png'
                        alt='FIFA World Cup 26'
                        width={64}
                        height={64}
                        className='h-16 w-16 object-contain'
                    />
                    <div className='inline-flex items-center gap-2 rounded-full border border-zinc-50/20 bg-zinc-50/10 px-3 py-1.5 backdrop-blur'>
                        <span className='size-1.5 rounded-full bg-pitch' />
                        <span className='font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-50/80'>
                            {t('hero.dates')}
                        </span>
                    </div>
                </div>

                <h1 className='mt-6 text-balance text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl md:text-8xl'>
                    {t('hero.title')}
                    <span className='mt-1 block bg-linear-to-t from-accent to-accent/70 bg-clip-text text-transparent'>
                        2026
                    </span>
                </h1>

                <p className='mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-50/70'>
                    {t('hero.lede')}
                </p>

                <div className='mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3'>
                    <span className='font-mono text-xs uppercase tracking-wider text-zinc-50/50'>
                        {t('hero.hostedBy')}
                    </span>
                    <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
                        {hosts.map((host) => (
                            <div
                                key={host.name}
                                className='flex items-center gap-2'
                            >
                                <Image
                                    src={`https://flagcdn.com/${host.code}.svg`}
                                    alt=''
                                    width={26}
                                    height={18}
                                    className='h-4.5 w-6.5 rounded-xs object-cover ring-1 ring-zinc-50/20'
                                />
                                <span className='font-mono text-xs font-bold uppercase tracking-wider text-zinc-50/80'>
                                    {host.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <Countdown targetDate={firstMatch.date} />

                <dl className='mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-50/15 bg-zinc-50/15 sm:mt-12 sm:grid-cols-4'>
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className='flex min-h-22 flex-col justify-center bg-zinc-950/40 p-4 backdrop-blur sm:px-5 sm:py-5'
                        >
                            <dt className='font-mono text-[0.625rem] uppercase tracking-wider text-zinc-50/50 sm:text-xs'>
                                {stat.label}
                            </dt>
                            <dd className='mt-1 text-2xl font-black tabular-nums sm:text-3xl md:text-4xl'>
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
