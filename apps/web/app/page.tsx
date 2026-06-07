import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mergeMatchData } from '@worldcup/core';
import { dynamicMatchesMock, staticMatches, teams } from '@worldcup/data';

function getTeamName(teamId?: string) {
    if (!teamId) return 'TBD';

    const team = teams.find((team) => team.id === teamId);

    return team ? `${team.flagEmoji ?? ''} ${team.name}` : 'Unknown';
}

export default function Home() {
    const matches = mergeMatchData(staticMatches, dynamicMatchesMock);

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
        </main>
    );
}
