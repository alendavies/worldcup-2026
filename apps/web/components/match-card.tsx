'use client';

import { Flag } from '@/components/flag';
import { useLanguage } from '@/components/language-provider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { FixtureStatus, UiMatch, UiTeam } from '@/components/web-data';
import { cityName, dateLabel, groupName, teamName } from '@/lib/i18n';
import Link from 'next/link';

function StatusBadge({
    status,
    minute,
}: {
    status: FixtureStatus;
    minute?: number;
}) {
    const { t } = useLanguage();
    if (status === 'live') {
        return (
            <Badge className='bg-accent text-accent-foreground px-3 py-2 md:py-1.5 font-mono text-xs font-bold uppercase tracking-wider'>
                <span className='size-1.5 animate-pulse rounded-full bg-accent-foreground mr-1.5' />
                {t('match.live', { m: minute ?? 0 })}
            </Badge>
        );
    }
    if (status === 'finished') {
        return (
            <Badge
                variant='secondary'
                className='px-3 py-2 md:py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground'
            >
                {t('match.ft')}
            </Badge>
        );
    }
    return (
        <Badge
            variant='outline'
            className='px-3 py-2 md:py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground'
        >
            {t('match.upcoming')}
        </Badge>
    );
}

function TeamRow({
    team,
    score,
    showScore,
    winner,
    loser,
}: {
    team: UiTeam;
    score?: number;
    showScore: boolean;
    winner: boolean;
    loser: boolean;
}) {
    const { lang } = useLanguage();
    return (
        <div className='flex items-center justify-between gap-3'>
            <div className='flex min-w-0 items-center gap-3'>
                <Flag team={team} size='md' />
                <span
                    className={`truncate text-sm font-semibold transition-opacity ${
                        loser ? 'text-foreground/55' : 'text-foreground'
                    }`}
                >
                    <span className='hidden sm:inline'>
                        {teamName(team.code, team.name, lang)}
                    </span>
                    <span className='sm:hidden'>{team.code}</span>
                </span>
                {winner && (
                    <span className='size-1.5 shrink-0 rounded-full bg-pitch' />
                )}
            </div>
            {showScore && (
                <span
                    className={`font-mono text-xl font-black tabular-nums ${
                        loser ? 'text-muted-foreground' : 'text-foreground'
                    }`}
                >
                    {score}
                </span>
            )}
        </div>
    );
}

export function MatchCard({
    match,
    hideDate,
}: {
    match: UiMatch;
    hideDate?: boolean;
}) {
    const { lang } = useLanguage();
    const showScore = match.status !== 'upcoming';
    const isLive = match.status === 'live';
    const homeWin =
        showScore && (match.homeScore ?? 0) > (match.awayScore ?? 0);
    const awayWin =
        showScore && (match.awayScore ?? 0) > (match.homeScore ?? 0);

    return (
        <Link href={`/match/${match.id}`} className='block group'>
            <Card
                className={`relative flex flex-col gap-4 overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md ${
                    isLive
                        ? 'border-accent/40 ring-1 ring-accent/20'
                        : 'border-border group-hover:border-foreground/25'
                }`}
            >
                {isLive && (
                    <span className='absolute inset-x-0 top-0 h-0.5 bg-accent' />
                )}

                <div className='flex items-center justify-between'>
                    <span className='font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                        {groupName(match.group, lang)}
                    </span>
                    <StatusBadge status={match.status} minute={match.minute} />
                </div>

                <div className='flex flex-col gap-3'>
                    <TeamRow
                        team={match.home}
                        score={match.homeScore}
                        showScore={showScore}
                        winner={homeWin}
                        loser={awayWin}
                    />
                    <div className='h-px bg-border' />
                    <TeamRow
                        team={match.away}
                        score={match.awayScore}
                        showScore={showScore}
                        winner={awayWin}
                        loser={homeWin}
                    />
                </div>

                <div className='flex items-center justify-between gap-2 border-t border-border pt-3 font-mono text-xs text-muted-foreground'>
                    <span className='truncate'>
                        {hideDate
                            ? match.status === 'upcoming'
                                ? match.kickoff
                                : ''
                            : match.status === 'upcoming'
                              ? `${dateLabel(match.date, lang)} · ${match.kickoff}`
                              : dateLabel(match.date, lang)}
                    </span>
                    <span className='flex items-center gap-1 truncate text-right'>
                        <svg
                            className='size-3 shrink-0'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            aria-hidden='true'
                        >
                            <path d='M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z' />
                            <circle cx='12' cy='11' r='2' />
                        </svg>
                        {cityName(match.city, lang)}
                    </span>
                </div>
            </Card>
        </Link>
    );
}
