'use client';

import { Flag } from '@/components/flag';
import { useLanguage } from '@/components/language-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { UiMatch } from '@/components/web-data';
import { cityName, dateLabel, groupName, teamName } from '@/lib/i18n';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function MatchDetailClient({ match }: { match: UiMatch }) {
    const { t, lang } = useLanguage();
    const showScore = match.status !== 'upcoming';
    const isLive = match.status === 'live';

    return (
        <div className='mx-auto w-full max-w-4xl px-5 py-8 md:py-12'>
            <Button
                variant='ghost'
                render={<Link href='/#fixtures' />}
                nativeButton={false}
                className='mb-8 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground'
            >
                <ChevronLeft className='size-4' />
                {t('match.back')}
            </Button>

            <Card className='overflow-hidden rounded-2xl border-border shadow-sm p-0'>
                {isLive && <div className='h-1 w-full bg-accent' />}

                <div className='p-6 md:p-10'>
                    <div className='flex flex-col items-center text-center mb-10'>
                        <span className='font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2'>
                            {groupName(match.group, lang)}
                        </span>
                        <h1 className='text-2xl md:text-3xl font-black uppercase tracking-tight'>
                            {t('match.details')}
                        </h1>
                    </div>

                    <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16'>
                        <Link
                            href={`/team/${match.home.id}`}
                            className='flex flex-col items-center gap-4 w-32 md:w-48 hover:opacity-80 transition-opacity'
                        >
                            <Flag
                                team={match.home}
                                size='lg'
                                className='size-20 md:size-24 rounded-md'
                            />
                            <span className='text-xl md:text-2xl font-bold text-center'>
                                {teamName(
                                    match.home.code,
                                    match.home.name,
                                    lang,
                                )}
                            </span>
                        </Link>

                        <div className='flex flex-col items-center justify-center min-w-30'>
                            {showScore ? (
                                <div className='flex items-center gap-4 text-5xl md:text-7xl font-black tabular-nums'>
                                    <span>{match.homeScore}</span>
                                    <span className='text-muted-foreground/30'>
                                        -
                                    </span>
                                    <span>{match.awayScore}</span>
                                </div>
                            ) : (
                                <div className='text-3xl md:text-4xl font-black text-muted-foreground'>
                                    VS
                                </div>
                            )}

                            <div className='mt-4'>
                                {isLive ? (
                                    <Badge className='bg-accent text-accent-foreground px-4 py-1.5 font-mono text-sm font-bold uppercase tracking-wider'>
                                        <span className='size-2 animate-pulse rounded-full bg-accent-foreground mr-1.5' />
                                        {t('match.live', {
                                            m: match.minute ?? 0,
                                        })}
                                    </Badge>
                                ) : match.status === 'finished' ? (
                                    <Badge
                                        variant='secondary'
                                        className='px-4 py-1.5 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground'
                                    >
                                        {t('match.ft')}
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant='outline'
                                        className='px-4 py-1.5 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground'
                                    >
                                        {t('match.upcoming')}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <Link
                            href={`/team/${match.away.id}`}
                            className='flex flex-col items-center gap-4 w-32 md:w-48 hover:opacity-80 transition-opacity'
                        >
                            <Flag
                                team={match.away}
                                size='lg'
                                className='size-20 md:size-24 rounded-md'
                            />
                            <span className='text-xl md:text-2xl font-bold text-center'>
                                {teamName(
                                    match.away.code,
                                    match.away.name,
                                    lang,
                                )}
                            </span>
                        </Link>
                    </div>
                </div>

                <div className='bg-secondary/30 border-t border-border p-6 md:p-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left'>
                        <div>
                            <p className='font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1'>
                                Date & Time
                            </p>
                            <p className='font-medium'>
                                {dateLabel(match.date, lang)} · {match.kickoff}
                            </p>
                        </div>
                        <div>
                            <p className='font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1'>
                                {t('match.stadium')}
                            </p>
                            <p className='font-medium'>{match.venue}</p>
                        </div>
                        <div>
                            <p className='font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1'>
                                {t('match.city')}
                            </p>
                            <p className='font-medium'>
                                {cityName(match.city, lang)}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
