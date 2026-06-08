import {
    calculateStandings,
    getTeamById,
    mergeMatchData,
    sortMatchesByDate,
} from '@worldcup/core';
import { dynamicMatchesMock, staticMatches, teams } from '@worldcup/data';
import { ScrollView, Text, View } from 'react-native';

function getStatusLabel(status: string) {
    if (status === 'finished') return 'Final';
    if (status === 'live') return 'Live';

    return 'Scheduled';
}

function getStatusClassName(status: string) {
    if (status === 'finished') return 'bg-emerald-50 text-emerald-700';
    if (status === 'live') return 'bg-rose-50 text-rose-700';

    return 'bg-sky-50 text-sky-700';
}

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
        <ScrollView className='flex-1 bg-sky-50'>
            <View className='gap-6 px-5 py-8'>
                <View className='overflow-hidden rounded-[32px] bg-slate-950 p-6'>
                    <Text className='self-start rounded-full bg-sky-400/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-200'>
                        MVP Preview
                    </Text>

                    <Text className='mt-5 text-4xl font-black tracking-tight text-white'>
                        World Cup 2026
                    </Text>

                    <Text className='mt-3 text-base leading-6 text-slate-300'>
                        Fixture, live results and group tables for football fans.
                    </Text>

                    <View className='mt-6 self-start rounded-2xl bg-white/10 px-4 py-3'>
                        <Text className='text-xs font-semibold uppercase tracking-widest text-sky-200'>
                            Next match
                        </Text>
                        <Text className='mt-1 text-2xl font-bold text-white'>
                            11 Jun 2026
                        </Text>
                    </View>
                </View>

                <View className='gap-4'>
                    <View>
                        <Text className='text-xs font-bold uppercase tracking-widest text-sky-700'>
                            Matches
                        </Text>
                        <Text className='mt-1 text-2xl font-bold text-slate-950'>
                            Fixture & results
                        </Text>
                    </View>

                    {matches.map((match) => (
                        <View
                            key={match.id}
                            className='gap-4 rounded-[28px] border border-white bg-white/90 p-5 shadow-sm'
                        >
                            <View className='flex-row items-center justify-between gap-4'>
                                <Text className='flex-1 text-xl font-bold text-slate-950'>
                                    {getTeamName(match.homeTeamId)} vs{' '}
                                    {getTeamName(match.awayTeamId)}
                                </Text>

                                <Text
                                    className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClassName(match.status)}`}
                                >
                                    {getStatusLabel(match.status)}
                                </Text>
                            </View>

                            <Text className='text-4xl font-black tracking-tight text-slate-950'>
                                {match.status === 'finished'
                                    ? `${match.homeScore} - ${match.awayScore}`
                                    : 'vs'}
                            </Text>

                            <Text className='text-sm font-medium text-slate-500'>
                                {new Date(match.date).toLocaleString('es-AR')}
                            </Text>

                            <Text className='text-sm text-slate-500'>
                                {match.stadium}, {match.city}
                            </Text>
                        </View>
                    ))}
                </View>

                <View className='gap-4 rounded-[28px] border border-white bg-white/90 p-5 shadow-sm'>
                    <View>
                        <Text className='text-xs font-bold uppercase tracking-widest text-sky-700'>
                            Group stage
                        </Text>
                    <Text className='mt-1 text-2xl font-bold text-slate-950'>
                        Group A standings
                    </Text>
                    </View>

                    <View className='gap-3'>
                        <View className='flex-row gap-2'>
                            <Text className='flex-1 text-xs font-bold uppercase text-slate-500'>
                                Team
                            </Text>
                            <Text className='w-8 text-right text-xs font-bold uppercase text-slate-500'>
                                P
                            </Text>
                            <Text className='w-8 text-right text-xs font-bold uppercase text-slate-500'>
                                W
                            </Text>
                            <Text className='w-8 text-right text-xs font-bold uppercase text-slate-500'>
                                D
                            </Text>
                            <Text className='w-8 text-right text-xs font-bold uppercase text-slate-500'>
                                L
                            </Text>
                            <Text className='w-8 text-right text-xs font-bold uppercase text-slate-500'>
                                GD
                            </Text>
                            <Text className='w-8 text-right text-xs font-bold uppercase text-slate-500'>
                                Pts
                            </Text>
                        </View>

                        {groupStandings.map((standing) => (
                            <View
                                key={standing.teamId}
                                className='flex-row items-center gap-2'
                            >
                                <Text className='flex-1 font-semibold text-slate-950'>
                                    {getTeamName(standing.teamId)}
                                </Text>
                                <Text className='w-8 text-right text-slate-600'>
                                    {standing.played}
                                </Text>
                                <Text className='w-8 text-right text-slate-600'>
                                    {standing.won}
                                </Text>
                                <Text className='w-8 text-right text-slate-600'>
                                    {standing.drawn}
                                </Text>
                                <Text className='w-8 text-right text-slate-600'>
                                    {standing.lost}
                                </Text>
                                <Text className='w-8 text-right text-slate-600'>
                                    {standing.goalDifference}
                                </Text>
                                <Text className='w-8 text-right font-black text-sky-700'>
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
