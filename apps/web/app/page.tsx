import { FixturesSection } from '@/components/fixtures-section';
import { Hero } from '@/components/hero';
import { KnockoutSection } from '@/components/knockout-section';
import { LiveTicker } from '@/components/live-ticker';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { StandingsSection } from '@/components/standings-section';

export default function Page() {
    return (
        <main className='min-h-screen bg-background'>
            <SiteHeader />
            <LiveTicker />
            <Hero />
            <FixturesSection />
            <StandingsSection />
            <KnockoutSection />
            <SiteFooter />
        </main>
    );
}
