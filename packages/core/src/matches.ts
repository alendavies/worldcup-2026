import type {
    DynamicMatchState,
    Group,
    GroupId,
    MatchStage,
    MatchView,
    StaticMatch,
    Team,
} from './worldcup';

export function mergeMatchData(
    staticMatches: StaticMatch[],
    dynamicMatches: DynamicMatchState[],
): MatchView[] {
    return staticMatches.map((match) => {
        const dynamicMatch = dynamicMatches.find(
            (dynamicMatch) => dynamicMatch.matchId === match.id,
        );

        return {
            ...match,
            matchId: match.id,
            status: dynamicMatch?.status ?? 'scheduled',
            homeScore: dynamicMatch?.homeScore,
            awayScore: dynamicMatch?.awayScore,
            minute: dynamicMatch?.minute,
        };
    });
}

export function getTeamById(
    teams: Team[],
    teamId: string | undefined,
): Team | undefined {
    if (!teamId) return undefined;

    return teams.find((team) => team.id === teamId);
}

export function getGroupById(
    groups: Group[],
    groupId: GroupId | undefined,
): Group | undefined {
    if (!groupId) return undefined;

    return groups.find((group) => group.id === groupId);
}

export function sortMatchesByDate<TMatch extends StaticMatch>(
    matches: TMatch[],
): TMatch[] {
    return [...matches].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
}

export function getMatchesByGroup<TMatch extends StaticMatch>(
    matches: TMatch[],
    groupId: GroupId,
): TMatch[] {
    return matches.filter((match) => match.groupId === groupId);
}

export function getMatchesByTeam<TMatch extends StaticMatch>(
    matches: TMatch[],
    teamId: string,
): TMatch[] {
    return matches.filter(
        (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    );
}

export function getMatchesByStage<TMatch extends StaticMatch>(
    matches: TMatch[],
    stage: MatchStage,
): TMatch[] {
    return matches.filter((match) => match.stage === stage);
}
