import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    calculateStandings,
    getTeamById,
    mergeMatchData,
    sortMatchesByDate,
} from '@worldcup/core';
import { dynamicMatchesMock, staticMatches, teams } from '@worldcup/data';

function getTeamName(teamId?: string) {
    if (!teamId) return 'TBD';

    const team = getTeamById(teams, teamId);

    return team ? `${team.flagEmoji ?? ''} ${team.name}` : 'Unknown';
}

export default function Home() {
    const matches = sortMatchesByDate(
        mergeMatchData(staticMatches, dynamicMatchesMock),
    );
    const groupStandings = calculateStandings(teams, matches, 'A');

    return (
        <main className='mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10'>
            <header>
                <h1 className='text-4xl font-bold tracking-tight'>
                    World Cup 2026
                </h1>
                <p className='mt-2 text-muted-foreground'>
                    Fixture, groups and live results.
                </p>
            </header>

            <section className='grid gap-4'>
                {matches.map((match) => (
                    <Card key={match.id}>
                        <CardHeader>
                            <div className='flex items-center justify-between gap-4'>
                                <CardTitle className='text-lg'>
                                    {getTeamName(match.homeTeamId)} vs{' '}
                                    {getTeamName(match.awayTeamId)}
                                </CardTitle>

                                <Badge variant='secondary'>
                                    {match.status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className='space-y-2'>
                            <p className='text-2xl font-bold'>
                                {match.status === 'finished'
                                    ? `${match.homeScore} - ${match.awayScore}`
                                    : 'vs'}
                            </p>

                            <p className='text-sm text-muted-foreground'>
                                {new Date(match.date).toLocaleString('es-AR')}
                            </p>

                            <p className='text-sm text-muted-foreground'>
                                {match.stadium}, {match.city}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Group A standings</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className='grid grid-cols-[1fr_repeat(6,2.5rem)] gap-2 text-sm'>
                            <div className='font-medium text-muted-foreground'>
                                Team
                            </div>
                            <div className='text-right font-medium text-muted-foreground'>
                                P
                            </div>
                            <div className='text-right font-medium text-muted-foreground'>
                                W
                            </div>
                            <div className='text-right font-medium text-muted-foreground'>
                                D
                            </div>
                            <div className='text-right font-medium text-muted-foreground'>
                                L
                            </div>
                            <div className='text-right font-medium text-muted-foreground'>
                                GD
                            </div>
                            <div className='text-right font-medium text-muted-foreground'>
                                Pts
                            </div>

                            {groupStandings.map((standing) => (
                                <div key={standing.teamId} className='contents'>
                                    <div className='font-medium'>
                                        {getTeamName(standing.teamId)}
                                    </div>
                                    <div className='text-right'>
                                        {standing.played}
                                    </div>
                                    <div className='text-right'>
                                        {standing.won}
                                    </div>
                                    <div className='text-right'>
                                        {standing.drawn}
                                    </div>
                                    <div className='text-right'>
                                        {standing.lost}
                                    </div>
                                    <div className='text-right'>
                                        {standing.goalDifference}
                                    </div>
                                    <div className='text-right font-bold'>
                                        {standing.points}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
