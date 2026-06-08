'use client';

import { useLanguage } from '@/components/language-provider';
import { fixtureMatches } from '@/components/web-data';
import { Flag } from '@/components/flag';

export function LiveTicker() {
    const { t } = useLanguage();
    const items = fixtureMatches.filter(
        (match) => match.status === 'live' || match.status === 'finished',
    );
    if (items.length === 0) return null;

    const loop = [...items, ...items];

    return (
        <div className="border-b border-border bg-zinc-950 text-zinc-50">
            <div className="mx-auto flex w-full max-w-full items-stretch">
                <div className="flex shrink-0 items-center gap-2 border-r border-zinc-50/15 bg-accent px-4 py-2.5 text-accent-foreground">
                    <span className="size-2 animate-pulse rounded-full bg-accent-foreground" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        {t('ticker.live')}
                    </span>
                </div>
                <div className="relative flex-1 overflow-hidden">
                    <div className="wc-marquee flex w-max items-center gap-6 py-2.5 pl-6">
                        {loop.map((match, index) => (
                            <div
                                key={`${match.id}-${index}`}
                                className="flex shrink-0 items-center gap-2 font-mono text-xs"
                            >
                                <Flag team={match.home} size="xs" className="ring-zinc-50/20 rounded-[1px]" />
                                <span className="font-bold">{match.home.code}</span>
                                <span className="rounded bg-zinc-50/15 px-1.5 py-0.5 font-bold tabular-nums">
                                    {match.homeScore}-{match.awayScore}
                                </span>
                                <span className="font-bold">{match.away.code}</span>
                                <Flag team={match.away} size="xs" className="ring-zinc-50/20 rounded-[1px]" />
                                {match.status === 'live' ? (
                                    <span className="text-accent">{match.minute}&apos;</span>
                                ) : (
                                    <span className="text-zinc-50/40">{t('ticker.ft')}</span>
                                )}
                                <span className="text-zinc-50/20">/</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
