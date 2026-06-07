import type { DynamicMatchState } from '@worldcup/core';

export type WorldCupApiClientConfig = {
    baseUrl: string;
};

export class WorldCupApiClient {
    constructor(private readonly config: WorldCupApiClientConfig) {}

    async getDynamicMatches(): Promise<DynamicMatchState[]> {
        const response = await fetch(`${this.config.baseUrl}/matches/live`);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch dynamic matches: ${response.status}`,
            );
        }

        return response.json() as Promise<DynamicMatchState[]>;
    }
}
