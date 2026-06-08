'use client';

import { useLanguage } from '@/components/language-provider';
import { MatchCard } from '@/components/match-card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    fixtureMatches,
    groupIds,
    type FixtureStatusFilter,
} from '@/components/web-data';
import { useMemo, useState } from 'react';

export function FixturesSection() {
    const { t } = useLanguage();
    const [active, setActive] = useState<FixtureStatusFilter>('upcoming');
    const [selectedGroup, setSelectedGroup] = useState<string>('all');
    const [selectedTeam, setSelectedTeam] = useState<string>('all');

    const filters: { label: string; value: FixtureStatusFilter }[] = [
        { label: t('fixtures.filter.all'), value: 'all' },
        { label: t('fixtures.filter.live'), value: 'live' },
        { label: t('fixtures.filter.finished'), value: 'finished' },
        { label: t('fixtures.filter.upcoming'), value: 'upcoming' },
    ];

    const groupFilters = [
        { label: t('fixtures.group.all'), value: 'all' },
        ...groupIds.map((groupId) => ({
            label: `${t('fixtures.group.label')} ${groupId}`,
            value: `Group ${groupId}`,
        })),
    ];

    const teamFilters = useMemo(() => {
        const teams = new Map<string, { label: string; value: string }>();

        for (const match of fixtureMatches) {
            teams.set(match.home.code, {
                label: `${match.home.name} (${match.home.code})`,
                value: match.home.code,
            });
            teams.set(match.away.code, {
                label: `${match.away.name} (${match.away.code})`,
                value: match.away.code,
            });
        }

        return [
            { label: t('fixtures.team.all'), value: 'all' },
            ...Array.from(teams.values()).sort((a, b) =>
                a.label.localeCompare(b.label),
            ),
        ];
    }, [t]);

    const counts = useMemo(
        () => ({
            all: fixtureMatches.length,
            live: fixtureMatches.filter((match) => match.status === 'live')
                .length,
            finished: fixtureMatches.filter(
                (match) => match.status === 'finished',
            ).length,
            upcoming: fixtureMatches.filter(
                (match) => match.status === 'upcoming',
            ).length,
        }),
        [],
    );

    const filtered = useMemo(() => {
        return fixtureMatches.filter((match) => {
            const statusOk = active === 'all' || match.status === active;
            const groupOk =
                selectedGroup === 'all' || match.group === selectedGroup;
            const teamOk =
                selectedTeam === 'all' ||
                match.home.code === selectedTeam ||
                match.away.code === selectedTeam;

            return statusOk && groupOk && teamOk;
        });
    }, [active, selectedGroup, selectedTeam]);

    return (
        <section
            id='fixtures'
            className='mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-16 md:py-24'
        >
            <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
                <div>
                    <p className='font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent'>
                        {t('fixtures.eyebrow')}
                    </p>
                    <h2 className='mt-2 text-balance text-4xl font-black uppercase tracking-tight md:text-5xl'>
                        {t('fixtures.title')}
                    </h2>
                </div>

                <div className='flex flex-col gap-3 lg:min-w-105'>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                        <label className='flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                            <span>{t('fixtures.status.label')}</span>
                            <Select
                                value={active}
                                onValueChange={(value) =>
                                    setActive(value as FixtureStatusFilter)
                                }
                            >
                                <SelectTrigger className='h-12 w-full rounded-full border-border bg-card px-4 text-xs text-foreground'>
                                    <SelectValue
                                        placeholder={t('fixtures.status.label')}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {filters.map((filter) => (
                                        <SelectItem
                                            key={filter.value}
                                            value={filter.value}
                                        >
                                            {filter.label}
                                            {filter.value !== 'all'
                                                ? ` (${counts[filter.value]})`
                                                : ` (${counts.all})`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </label>

                        <label className='flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                            <span>{t('fixtures.group.label')}</span>
                            <Select
                                value={selectedGroup}
                                onValueChange={(value) =>
                                    setSelectedGroup(value ?? 'all')
                                }
                            >
                                <SelectTrigger className='h-12 w-full rounded-full border-border bg-card px-4 text-xs text-foreground'>
                                    <SelectValue
                                        placeholder={t('fixtures.group.label')}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {groupFilters.map((filter) => (
                                        <SelectItem
                                            key={filter.value}
                                            value={filter.value}
                                        >
                                            {filter.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </label>

                        <label className='flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                            <span>{t('fixtures.team.label')}</span>
                            <Select
                                value={selectedTeam}
                                onValueChange={(value) =>
                                    setSelectedTeam(value ?? 'all')
                                }
                            >
                                <SelectTrigger className='h-10 w-full rounded-full border-border bg-card px-4 text-xs text-foreground'>
                                    <SelectValue
                                        placeholder={t('fixtures.team.label')}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {teamFilters.map((filter) => (
                                        <SelectItem
                                            key={filter.value}
                                            value={filter.value}
                                        >
                                            {filter.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </label>
                    </div>
                </div>
            </div>

            <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {filtered.map((match) => (
                    <MatchCard key={match.id} match={match} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className='mt-12 flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center'>
                    <p className='font-mono text-sm text-muted-foreground'>
                        {t('fixtures.empty')}
                    </p>
                </div>
            )}
        </section>
    );
}
