import {
    calculateStandings,
    getTeamById,
    mergeMatchData,
    sortMatchesByDate,
} from '@worldcup/core';
import { dynamicMatchesMock, staticMatches, teams } from '@worldcup/data';
import { ScrollView, Text, View } from 'react-native';

function getTeamName(teamId?: string) {
    if (!teamId) return 'TBD';

    const team = getTeamById(teams, teamId);

    return team ? `${team.flagEmoji ?? ''} ${team.name}` : 'Unknown';
}

export default function HomeScreen() {
    const matches = sortMatchesByDate(
        mergeMatchData(staticMatches, dynamicMatchesMock),
    );
    const groupStandings = calculateStandings(teams, matches, 'A');

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='gap-6 px-6 py-10'>
                <View>
                    <Text className='text-4xl font-bold text-neutral-950'>
                        World Cup 2026
                    </Text>

                    <Text className='mt-2 text-neutral-500'>
                        Fixture, groups and live results.
                    </Text>
                </View>

                <View className='gap-4'>
                    {matches.map((match) => (
                        <View
                            key={match.id}
                            className='gap-3 rounded-2xl border border-neutral-200 p-4'
                        >
                            <View className='flex-row items-center justify-between gap-4'>
                                <Text className='flex-1 text-lg font-bold text-neutral-950'>
                                    {getTeamName(match.homeTeamId)} vs{' '}
                                    {getTeamName(match.awayTeamId)}
                                </Text>

                                <Text className='rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700'>
                                    {match.status}
                                </Text>
                            </View>

                            <Text className='text-2xl font-bold text-neutral-950'>
                                {match.status === 'finished'
                                    ? `${match.homeScore} - ${match.awayScore}`
                                    : 'vs'}
                            </Text>

                            <Text className='text-sm text-neutral-500'>
                                {new Date(match.date).toLocaleString('es-AR')}
                            </Text>

                            <Text className='text-sm text-neutral-500'>
                                {match.stadium}, {match.city}
                            </Text>
                        </View>
                    ))}
                </View>

                <View className='gap-4 rounded-2xl border border-neutral-200 p-4'>
                    <Text className='text-xl font-bold text-neutral-950'>
                        Group A standings
                    </Text>

                    <View className='gap-3'>
                        <View className='flex-row gap-2'>
                            <Text className='flex-1 text-xs font-medium text-neutral-500'>
                                Team
                            </Text>
                            <Text className='w-8 text-right text-xs font-medium text-neutral-500'>
                                P
                            </Text>
                            <Text className='w-8 text-right text-xs font-medium text-neutral-500'>
                                W
                            </Text>
                            <Text className='w-8 text-right text-xs font-medium text-neutral-500'>
                                D
                            </Text>
                            <Text className='w-8 text-right text-xs font-medium text-neutral-500'>
                                L
                            </Text>
                            <Text className='w-8 text-right text-xs font-medium text-neutral-500'>
                                GD
                            </Text>
                            <Text className='w-8 text-right text-xs font-medium text-neutral-500'>
                                Pts
                            </Text>
                        </View>

                        {groupStandings.map((standing) => (
                            <View
                                key={standing.teamId}
                                className='flex-row items-center gap-2'
                            >
                                <Text className='flex-1 font-medium text-neutral-950'>
                                    {getTeamName(standing.teamId)}
                                </Text>
                                <Text className='w-8 text-right text-neutral-700'>
                                    {standing.played}
                                </Text>
                                <Text className='w-8 text-right text-neutral-700'>
                                    {standing.won}
                                </Text>
                                <Text className='w-8 text-right text-neutral-700'>
                                    {standing.drawn}
                                </Text>
                                <Text className='w-8 text-right text-neutral-700'>
                                    {standing.lost}
                                </Text>
                                <Text className='w-8 text-right text-neutral-700'>
                                    {standing.goalDifference}
                                </Text>
                                <Text className='w-8 text-right font-bold text-neutral-950'>
                                    {standing.points}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
