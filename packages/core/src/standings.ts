import type { MatchView, Standing, Team } from './worldcup';

export function calculateStandings(
    teams: Team[],
    matches: MatchView[],
    groupId: string,
): Standing[] {
    const groupTeams = teams.filter((team) => team.groupId === groupId);

    const standings = new Map<string, Standing>();

    for (const team of groupTeams) {
        standings.set(team.id, {
            teamId: team.id,
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0,
        });
    }

    const finishedMatches = matches.filter(
        (match) =>
            match.groupId === groupId &&
            match.status === 'finished' &&
            match.homeTeamId &&
            match.awayTeamId &&
            typeof match.homeScore === 'number' &&
            typeof match.awayScore === 'number',
    );

    for (const match of finishedMatches) {
        const home = standings.get(match.homeTeamId!);
        const away = standings.get(match.awayTeamId!);

        if (!home || !away) continue;

        home.played += 1;
        away.played += 1;

        home.goalsFor += match.homeScore!;
        home.goalsAgainst += match.awayScore!;

        away.goalsFor += match.awayScore!;
        away.goalsAgainst += match.homeScore!;

        if (match.homeScore! > match.awayScore!) {
            home.won += 1;
            home.points += 3;
            away.lost += 1;
        } else if (match.homeScore! < match.awayScore!) {
            away.won += 1;
            away.points += 3;
            home.lost += 1;
        } else {
            home.drawn += 1;
            away.drawn += 1;
            home.points += 1;
            away.points += 1;
        }
    }

    return Array.from(standings.values())
        .map((standing) => ({
            ...standing,
            goalDifference: standing.goalsFor - standing.goalsAgainst,
        }))
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference) {
                return b.goalDifference - a.goalDifference;
            }
            return b.goalsFor - a.goalsFor;
        });
}
