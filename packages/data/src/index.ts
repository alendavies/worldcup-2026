import type {
    DynamicMatchState,
    Group,
    StaticMatch,
    Team,
} from '@worldcup/core';

export const teams: Team[] = [
    {
        id: 'argentina',
        name: 'Argentina',
        code: 'ARG',
        flagEmoji: '🇦🇷',
        groupId: 'A',
    },
    {
        id: 'france',
        name: 'France',
        code: 'FRA',
        flagEmoji: '🇫🇷',
        groupId: 'A',
    },
    {
        id: 'japan',
        name: 'Japan',
        code: 'JPN',
        flagEmoji: '🇯🇵',
        groupId: 'A',
    },
    {
        id: 'mexico',
        name: 'Mexico',
        code: 'MEX',
        flagEmoji: '🇲🇽',
        groupId: 'A',
    },
];

export const groups: Group[] = [
    {
        id: 'A',
        name: 'Group A',
        teamIds: ['argentina', 'france', 'japan', 'mexico'],
    },
];

export const staticMatches: StaticMatch[] = [
    {
        id: 'match-1',
        externalApiId: 'api-match-1',
        stage: 'group',
        groupId: 'A',
        homeTeamId: 'argentina',
        awayTeamId: 'japan',
        date: '2026-06-11T19:00:00.000Z',
        stadium: 'Example Stadium',
        city: 'Example City',
    },
    {
        id: 'match-2',
        externalApiId: 'api-match-2',
        stage: 'group',
        groupId: 'A',
        homeTeamId: 'france',
        awayTeamId: 'mexico',
        date: '2026-06-12T22:00:00.000Z',
        stadium: 'Example Stadium',
        city: 'Example City',
    },
];

export const dynamicMatchesMock: DynamicMatchState[] = [
    {
        matchId: 'match-1',
        status: 'finished',
        homeScore: 2,
        awayScore: 1,
    },
    {
        matchId: 'match-2',
        status: 'scheduled',
    },
];
