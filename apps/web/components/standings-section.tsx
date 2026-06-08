'use client';

import { Flag } from '@/components/flag';
import { useLanguage } from '@/components/language-provider';
import { standingsByGroup } from '@/components/web-data';
import { groupName, teamName } from '@/lib/i18n';
import Link from 'next/link';
import { useState } from 'react';

export function StandingsSection() {
    const { t, lang } = useLanguage();
    const groupNames = Object.keys(standingsByGroup);
    const [active, setActive] = useState(groupNames[0]);
    const rows = standingsByGroup[active] ?? [];

    return (
        <section
            id='standings'
            className='scroll-mt-20 border-y border-border bg-secondary/40'
        >
            <div className='mx-auto w-full max-w-6xl px-5 py-16 md:py-24'>
                <p className='font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent'>
                    {t('standings.eyebrow')}
                </p>
                <h2 className='mt-2 text-balance text-4xl font-black uppercase tracking-tight md:text-5xl'>
                    {t('standings.title')}
                </h2>

                <div className='mt-8 flex flex-wrap gap-2'>
                    {groupNames.map((group) => (
                        <button
                            key={group}
                            onClick={() => setActive(group)}
                            aria-pressed={active === group}
                            className={`rounded-full px-4 py-3 md:py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                                active === group
                                    ? 'bg-accent text-accent-foreground shadow-sm'
                                    : 'border border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                            }`}
                        >
                            {groupName(group, lang)}
                        </button>
                    ))}
                </div>

                <div className='mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm'>
                    <table className='w-full min-w-140 border-collapse text-sm'>
                        <thead>
                            <tr className='border-b border-border bg-secondary/50 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
                                <th className='px-4 py-3 text-left font-bold'>
                                    #
                                </th>
                                <th className='px-4 py-3 text-left font-bold'>
                                    {t('standings.col.team')}
                                </th>
                                <th className='px-3 py-3 text-center font-bold'>
                                    P
                                </th>
                                <th className='px-3 py-3 text-center font-bold'>
                                    W
                                </th>
                                <th className='px-3 py-3 text-center font-bold'>
                                    D
                                </th>
                                <th className='px-3 py-3 text-center font-bold'>
                                    L
                                </th>
                                <th className='px-3 py-3 text-center font-bold'>
                                    GF
                                </th>
                                <th className='px-3 py-3 text-center font-bold'>
                                    GA
                                </th>
                                <th className='px-3 py-3 text-center font-bold'>
                                    GD
                                </th>
                                <th className='px-4 py-3 text-center font-bold text-foreground'>
                                    Pts
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => {
                                const qualifies = index < 2;
                                const goalDifference = row.gf - row.ga;
                                return (
                                    <tr
                                        key={row.team.code}
                                        className={`border-b border-border transition-colors last:border-0 hover:bg-secondary/60 ${
                                            qualifies ? 'bg-pitch/5' : ''
                                        }`}
                                    >
                                        <td className='relative px-4 py-3'>
                                            {qualifies && (
                                                <span
                                                    className='absolute inset-y-0 left-0 w-1 bg-pitch'
                                                    aria-hidden='true'
                                                />
                                            )}
                                            <span
                                                className={`inline-flex size-6 items-center justify-center rounded font-mono text-xs font-bold ${
                                                    qualifies
                                                        ? 'bg-pitch text-pitch-foreground'
                                                        : 'text-muted-foreground'
                                                }`}
                                            >
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className='px-4 py-3'>
                                            <Link
                                                href={`/team/${row.team.id}`}
                                                className='flex min-h-11 items-center gap-2.5 hover:opacity-80 transition-opacity'
                                            >
                                                <Flag
                                                    team={row.team}
                                                    size='md'
                                                />
                                                <span className='font-semibold'>
                                                    {teamName(
                                                        row.team.code,
                                                        row.team.name,
                                                        lang,
                                                    )}
                                                </span>
                                            </Link>
                                        </td>
                                        <td className='px-3 py-3 text-center font-mono tabular-nums text-muted-foreground'>
                                            {row.played}
                                        </td>
                                        <td className='px-3 py-3 text-center font-mono tabular-nums text-muted-foreground'>
                                            {row.won}
                                        </td>
                                        <td className='px-3 py-3 text-center font-mono tabular-nums text-muted-foreground'>
                                            {row.drawn}
                                        </td>
                                        <td className='px-3 py-3 text-center font-mono tabular-nums text-muted-foreground'>
                                            {row.lost}
                                        </td>
                                        <td className='px-3 py-3 text-center font-mono tabular-nums text-muted-foreground'>
                                            {row.gf}
                                        </td>
                                        <td className='px-3 py-3 text-center font-mono tabular-nums text-muted-foreground'>
                                            {row.ga}
                                        </td>
                                        <td className='px-3 py-3 text-center font-mono tabular-nums text-muted-foreground'>
                                            {goalDifference > 0
                                                ? `+${goalDifference}`
                                                : goalDifference}
                                        </td>
                                        <td className='px-4 py-3 text-center font-mono text-base font-black tabular-nums'>
                                            {row.points}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <p className='mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground'>
                    <span className='inline-block size-2.5 rounded-sm bg-pitch align-middle' />
                    {t('standings.legend')}
                </p>
            </div>
        </section>
    );
}
