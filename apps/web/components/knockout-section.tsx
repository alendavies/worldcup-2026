'use client';

import { useLanguage } from '@/components/language-provider';
import { knockoutMatches } from '@/components/web-data';
import { roundName } from '@/lib/i18n';

const rounds = ['Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'];

export function KnockoutSection() {
    const { t, lang } = useLanguage();

    const translatePlaceholder = (text: string) => {
        if (text.startsWith('Champion crowned')) return t('knockout.champion');
        return text
            .replace(/Winner/g, t('knockout.winner'))
            .replace(/ vs /g, ` ${t('knockout.vs')} `);
    };

    return (
        <section
            id='knockout'
            className='scroll-mt-20 bg-zinc-950 text-zinc-50'
        >
            <div className='mx-auto w-full max-w-6xl px-5 py-16 md:py-24'>
                <p className='font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent'>
                    {t('knockout.eyebrow')}
                </p>
                <h2 className='mt-2 text-balance text-4xl font-black uppercase tracking-tight md:text-5xl'>
                    {t('knockout.title')}
                </h2>

                <div className='mt-10 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-5'>
                    {rounds.map((round, _) => {
                        const items = knockoutMatches.filter(
                            (match) => match.round === round,
                        );
                        const isFinal = round === 'Final';
                        return (
                            <div key={round} className='flex flex-col gap-4'>
                                <div className='flex items-center justify-center'>
                                    <h3 className='text-center font-mono text-xs font-bold uppercase tracking-wider text-zinc-50/50'>
                                        {roundName(round, lang)}
                                    </h3>
                                </div>
                                <div className='flex flex-1 flex-col justify-around gap-4'>
                                    {items.map((match) => (
                                        <div
                                            key={match.id}
                                            className={`rounded-xl border p-4 md:p-3 transition-colors ${
                                                isFinal
                                                    ? 'border-accent bg-accent/15'
                                                    : 'border-zinc-50/15 bg-zinc-50/5 hover:border-zinc-50/30'
                                            }`}
                                        >
                                            {isFinal && (
                                                <div className='mb-2 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-accent'>
                                                    <svg
                                                        className='size-3.5'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        aria-hidden='true'
                                                    >
                                                        <path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z' />
                                                    </svg>
                                                    {t('knockout.final')}
                                                </div>
                                            )}
                                            <p className='py-2 text-center font-mono text-xs leading-relaxed text-zinc-50/50'>
                                                {translatePlaceholder(
                                                    match.placeholder,
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
