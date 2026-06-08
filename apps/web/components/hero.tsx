'use client';

import Image from 'next/image';
import { useLanguage } from '@/components/language-provider';
import { heroStats } from '@/components/web-data';

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
        <section className="relative overflow-hidden bg-zinc-950 text-zinc-50">
            <div className="absolute inset-0">
                <Image
                    src="/stadium-hero.png"
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
            </div>

            <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-20 md:pb-16 md:pt-28">
                <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-50">
                        <Image
                            src="/brand/fifa.svg"
                            alt="FIFA"
                            width={22}
                            height={22}
                            className="h-[22px] w-[22px]"
                        />
                    </span>
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-50/20 bg-zinc-50/10 px-3 py-1.5 backdrop-blur">
                        <span className="size-1.5 rounded-full bg-pitch" />
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-50/80">
                            {t('hero.dates')}
                        </span>
                    </div>
                </div>

                <h1 className="mt-6 text-balance text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl md:text-8xl">
                    {t('hero.title')}
                    <span className="mt-1 block bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                        2026
                    </span>
                </h1>

                <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-50/70">
                    {t('hero.lede')}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-50/50">
                        {t('hero.hostedBy')}
                    </span>
                    {hosts.map((host) => (
                        <div key={host.name} className="flex items-center gap-2">
                            <Image
                                src={`https://flagcdn.com/${host.code}.svg`}
                                alt=""
                                width={26}
                                height={18}
                                className="h-[18px] w-[26px] rounded-[2px] object-cover ring-1 ring-zinc-50/20"
                            />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-50/80">
                                {host.name}
                            </span>
                        </div>
                    ))}
                </div>

                <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-50/15 bg-zinc-50/15 sm:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-zinc-950/40 px-5 py-5 backdrop-blur">
                            <dt className="font-mono text-xs uppercase tracking-wider text-zinc-50/50">
                                {stat.label}
                            </dt>
                            <dd className="mt-1 text-3xl font-black tabular-nums md:text-4xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
