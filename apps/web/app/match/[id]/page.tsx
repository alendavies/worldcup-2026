import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { fixtureMatches } from '@/components/web-data';
import { notFound } from 'next/navigation';
import { MatchDetailClient } from './match-detail-client';

export function generateStaticParams() {
    return fixtureMatches.map((match) => ({
        id: match.id,
    }));
}

export default async function MatchPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const match = fixtureMatches.find((m) => m.id === id);

    if (!match) {
        notFound();
    }

    return (
        <main className='min-h-screen bg-background flex flex-col'>
            <SiteHeader />
            <div className='flex-1'>
                <MatchDetailClient match={match} />
            </div>
            <SiteFooter />
        </main>
    );
}
