import {
    calculateStandings,
    getTeamById,
    mergeMatchData,
    sortMatchesByDate,
    type GroupId,
    type MatchStatus,
    type MatchView,
    type Standing,
    type Team,
} from '@worldcup/core';
import { dynamicMatchesMock, groups, staticMatches, stadiums, teams } from '@worldcup/data';

export type FixtureStatus = 'finished' | 'live' | 'upcoming';
export type FixtureStatusFilter = FixtureStatus | 'all';

export type UiTeam = Team & {
    iso: string;
};

export type UiMatch = {
    id: string;
    group: string;
    date: string;
    kickoff: string;
    venue: string;
    city: string;
    status: FixtureStatus;
    minute?: number;
    home: UiTeam;
    away: UiTeam;
    homeScore?: number;
    awayScore?: number;
};

export type UiStandingRow = {
    team: UiTeam;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gf: number;
    ga: number;
    points: number;
};

export type UiKnockoutMatch = {
    id: string;
    round: string;
    placeholder: string;
};

export const matches = sortMatchesByDate(
    mergeMatchData(staticMatches, dynamicMatchesMock),
);

export const firstMatch = matches[0];

export const groupIds = groups.map((group) => group.id);

const teamIsoByCode: Record<string, string> = {
    ALG: 'dz',
    ARG: 'ar',
    AUS: 'au',
    AUT: 'at',
    BEL: 'be',
    BIH: 'ba',
    BRA: 'br',
    CAN: 'ca',
    CIV: 'ci',
    COD: 'cd',
    COL: 'co',
    CPV: 'cv',
    CRO: 'hr',
    CUW: 'cw',
    CZE: 'cz',
    ECU: 'ec',
    EGY: 'eg',
    ENG: 'gb-eng',
    ESP: 'es',
    FRA: 'fr',
    GER: 'de',
    GHA: 'gh',
    HAI: 'ht',
    IRN: 'ir',
    IRQ: 'iq',
    JOR: 'jo',
    JPN: 'jp',
    KOR: 'kr',
    KSA: 'sa',
    MAR: 'ma',
    MEX: 'mx',
    NED: 'nl',
    NOR: 'no',
    NZL: 'nz',
    PAN: 'pa',
    PAR: 'py',
    POR: 'pt',
    QAT: 'qa',
    RSA: 'za',
    SCO: 'gb-sct',
    SEN: 'sn',
    SUI: 'ch',
    SWE: 'se',
    TUN: 'tn',
    TUR: 'tr',
    URU: 'uy',
    USA: 'us',
    UZB: 'uz',
};

export function getTeam(teamId?: string): Team | undefined {
    return getTeamById(teams, teamId);
}

export function getUiTeam(teamId?: string): UiTeam {
    const team = getTeam(teamId);
    if (!team) {
        return {
            id: 'tbd',
            name: 'TBD',
            code: 'TBD',
            flagEmoji: '🏳️',
            iso: 'un',
        };
    }

    return {
        ...team,
        iso: teamIsoByCode[team.code] ?? 'un',
    };
}

export function getTeamDisplayName(teamId?: string) {
    if (!teamId) return 'TBD';

    return getTeam(teamId)?.name ?? 'Unknown';
}

export function getTeamFlag(teamId?: string) {
    return getTeam(teamId)?.flagEmoji ?? '🏳️';
}

export function getStatusLabel(status: MatchStatus) {
    if (status === 'finished') return 'Final';
    if (status === 'live') return 'Live';

    return 'Upcoming';
}

function toFixtureStatus(status: MatchStatus): FixtureStatus {
    if (status === 'scheduled') return 'upcoming';
    return status;
}

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
});

function formatDisplayDate(date: string) {
    return dateFormatter.format(new Date(date));
}

function formatKickoff(date: string) {
    return timeFormatter.format(new Date(date));
}

export const fixtureMatches: UiMatch[] = matches.map((match) => ({
    id: match.id,
    group: match.groupId ? `Group ${match.groupId}` : 'Knockout',
    date: formatDisplayDate(match.date),
    kickoff: formatKickoff(match.date),
    venue: match.stadium,
    city: match.city,
    status: toFixtureStatus(match.status),
    minute: match.minute,
    home: getUiTeam(match.homeTeamId),
    away: getUiTeam(match.awayTeamId),
    homeScore: match.homeScore,
    awayScore: match.awayScore,
}));

export const standingsByGroup: Record<string, UiStandingRow[]> = Object.fromEntries(
    groupIds.map((groupId) => [
        `Group ${groupId}`,
        getStandings(groupId).map((row) => ({
            team: getUiTeam(row.teamId),
            played: row.played,
            won: row.won,
            drawn: row.drawn,
            lost: row.lost,
            gf: row.goalsFor,
            ga: row.goalsAgainst,
            points: row.points,
        })),
    ]),
);

export const knockoutMatches: UiKnockoutMatch[] = [
    ...Array.from({ length: 8 }, (_, index) => ({
        id: `r16-${index + 1}`,
        round: 'Round of 16',
        placeholder: `Winner R32-${index * 2 + 1} vs Winner R32-${index * 2 + 2}`,
    })),
    ...Array.from({ length: 4 }, (_, index) => ({
        id: `qf-${index + 1}`,
        round: 'Quarter-finals',
        placeholder: `Winner R16-${index * 2 + 1} vs Winner R16-${index * 2 + 2}`,
    })),
    ...Array.from({ length: 2 }, (_, index) => ({
        id: `sf-${index + 1}`,
        round: 'Semi-finals',
        placeholder: `Winner QF-${index * 2 + 1} vs Winner QF-${index * 2 + 2}`,
    })),
    {
        id: 'final',
        round: 'Final',
        placeholder: 'Champion crowned · Jul 19, 2026',
    },
];

export const heroStats = {
    teams: teams.length,
    matches: 104,
    cities: stadiums.length,
    days: 39,
};

export function getMatchScore(match: MatchView) {
    if (match.status === 'scheduled') return undefined;
    if (typeof match.homeScore !== 'number' || typeof match.awayScore !== 'number') {
        return undefined;
    }

    return `${match.homeScore}-${match.awayScore}`;
}

export function getStandings(groupId: GroupId): Standing[] {
    return calculateStandings(teams, matches, groupId);
}

export function formatMatchDate(date: string) {
    return new Intl.DateTimeFormat('en', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date));
}
