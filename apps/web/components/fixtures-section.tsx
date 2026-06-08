'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { MatchCard } from '@/components/match-card';
import { fixtureMatches, type FixtureStatusFilter } from '@/components/web-data';

export function FixturesSection() {
    const { t } = useLanguage();
    const [active, setActive] = useState<FixtureStatusFilter>('upcoming');

    const filters: { label: string; value: FixtureStatusFilter }[] = [
        { label: t('fixtures.filter.all'), value: 'all' },
        { label: t('fixtures.filter.live'), value: 'live' },
        { label: t('fixtures.filter.finished'), value: 'finished' },
        { label: t('fixtures.filter.upcoming'), value: 'upcoming' },
    ];

    const counts = useMemo(
        () => ({
            all: fixtureMatches.length,
            live: fixtureMatches.filter((match) => match.status === 'live').length,
            finished: fixtureMatches.filter((match) => match.status === 'finished').length,
            upcoming: fixtureMatches.filter((match) => match.status === 'upcoming').length,
        }),
        [],
    );

    const filtered = useMemo(
        () =>
            active === 'all'
                ? fixtureMatches
                : fixtureMatches.filter((match) => match.status === active),
        [active],
    );

    return (
        <section id="fixtures" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-16 md:py-24">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {t('fixtures.eyebrow')}
                    </p>
                    <h2 className="mt-2 text-balance text-4xl font-black uppercase tracking-tight md:text-5xl">
                        {t('fixtures.title')}
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const isActive = active === filter.value;
                        const isLive = filter.value === 'live';
                        return (
                            <button
                                key={filter.value}
                                onClick={() => setActive(filter.value)}
                                aria-pressed={isActive}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                                    isActive
                                        ? 'bg-foreground text-background shadow-sm'
                                        : 'border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                                }`}
                            >
                                {isLive && counts.live > 0 && (
                                    <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                                )}
                                {filter.label}
                                <span
                                    className={`tabular-nums ${
                                        isActive ? 'text-background/60' : 'text-muted-foreground/60'
                                    }`}
                                >
                                    {counts[filter.value]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((match) => (
                    <MatchCard key={match.id} match={match} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="mt-12 flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="font-mono text-sm text-muted-foreground">
                        {t('fixtures.empty')}
                    </p>
                </div>
            )}
        </section>
    );
}
