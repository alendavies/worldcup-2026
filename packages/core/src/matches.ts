import type { DynamicMatchState, MatchView, StaticMatch } from './worldcup';

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
