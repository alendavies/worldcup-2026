export type Team = {
    id: string;
    name: string;
    code: string;
    flagEmoji?: string;
    groupId?: string;
};

export type Group = {
    id: GroupId;
    name: string;
    teamIds: string[];
};

export type GroupId =
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L';

export type MatchStage =
    | 'group'
    | 'round_of_32'
    | 'round_of_16'
    | 'quarter_final'
    | 'semi_final'
    | 'third_place'
    | 'final';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export type StaticMatch = {
    id: string;
    externalApiId?: string;

    stage: MatchStage;
    groupId?: GroupId;

    homeTeamId?: string;
    awayTeamId?: string;

    homePlaceholder?: string;
    awayPlaceholder?: string;

    date: string;
    stadium: string;
    city: string;
};

export type DynamicMatchState = {
    matchId: string;
    status: MatchStatus;
    homeScore?: number;
    awayScore?: number;
    minute?: number;
};

export type MatchView = StaticMatch & DynamicMatchState;

export type Standing = {
    teamId: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
};
