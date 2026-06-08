import type {
    DynamicMatchState,
    Group,
    GroupId,
    Stadium,
    StaticMatch,
    Team,
} from '@worldcup/core';

import fixturesJson from './fixtures.json' with { type: 'json' };
import groupsJson from './groups.json' with { type: 'json' };
import stadiumsJson from './stadiums.json' with { type: 'json' };
import teamsJson from './teams.json' with { type: 'json' };

type TeamInput = [id: string, name: string, code: string, flagEmoji: string, groupId: GroupId];
type GroupInput = [id: GroupId, teamIds: string[]];
type StadiumInput = [id: string, name: string, city: string, country: string];
type MatchInput = [
    id: string,
    groupId: GroupId,
    homeTeamId: string,
    awayTeamId: string,
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    utcOffsetHours: number,
    stadiumId: string,
    externalApiId: string,
];

function scheduledAt(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    utcOffsetHours: number,
) {
    return new Date(
        Date.UTC(year, month - 1, day, hour - utcOffsetHours, minute),
    ).toISOString();
}

function createTeam([id, name, code, flagEmoji, groupId]: TeamInput): Team {
    return { id, name, code, flagEmoji, groupId };
}

function createGroup([id, teamIds]: GroupInput): Group {
    return { id, name: `Group ${id}`, teamIds };
}

function createStadium([id, name, city, country]: StadiumInput): Stadium {
    return { id, name, city, country };
}

function createMatch([
    id,
    groupId,
    homeTeamId,
    awayTeamId,
    year,
    month,
    day,
    hour,
    minute,
    utcOffsetHours,
    stadiumId,
    externalApiId,
]: MatchInput): StaticMatch {
    const stadium = stadiumsById.get(stadiumId);

    if (!stadium) {
        throw new Error(`Unknown stadium ID: ${stadiumId}`);
    }

    return {
        id,
        externalApiId,
        stage: 'group',
        groupId,
        homeTeamId,
        awayTeamId,
        date: scheduledAt(year, month, day, hour, minute, utcOffsetHours),
        stadium: stadium.name,
        city: stadium.city,
    };
}

export const teams: Team[] = (teamsJson as TeamInput[]).map(createTeam);
export const groups: Group[] = (groupsJson as GroupInput[]).map(createGroup);
export const stadiums: Stadium[] = (stadiumsJson as StadiumInput[]).map(createStadium);

const stadiumsById = new Map(stadiums.map((stadium) => [stadium.id, stadium]));

export const staticMatches: StaticMatch[] = (fixturesJson as MatchInput[]).map(createMatch);

export const dynamicMatchesMock: DynamicMatchState[] = [];
