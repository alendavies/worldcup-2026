'use client';

import { useLanguage } from '@/components/language-provider';
import { useEffect, useState } from 'react';

export function Countdown({ targetDate }: { targetDate: string }) {
    const { t } = useLanguage();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const target = new Date(targetDate).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    ),
                    minutes: Math.floor(
                        (difference % (1000 * 60 * 60)) / (1000 * 60),
                    ),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    if (!isMounted) {
        return null; // Avoid hydration mismatch
    }

    // If the tournament has started, don't show the countdown
    if (
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
    ) {
        return null;
    }

    return (
        <div className='mt-8 flex flex-col items-center sm:items-start gap-3'>
            <span className='font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent'>
                {t('hero.countdown')}
            </span>
            <div className='flex items-center gap-2 sm:gap-4 text-center'>
                <div className='flex flex-col items-center justify-center rounded-xl border border-zinc-50/15 bg-zinc-950/40 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur min-w-16 sm:min-w-18'>
                    <span className='text-xl sm:text-2xl font-black tabular-nums text-zinc-50'>
                        {timeLeft.days}
                    </span>
                    <span className='font-mono text-[0.5625rem] sm:text-[0.625rem] uppercase tracking-wider text-zinc-50/50'>
                        {t('time.days')}
                    </span>
                </div>
                <span className='text-lg sm:text-xl font-black text-zinc-50/30'>
                    :
                </span>
                <div className='flex flex-col items-center justify-center rounded-xl border border-zinc-50/15 bg-zinc-950/40 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur min-w-16 sm:min-w-18'>
                    <span className='text-xl sm:text-2xl font-black tabular-nums text-zinc-50'>
                        {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className='font-mono text-[0.5625rem] sm:text-[0.625rem] uppercase tracking-wider text-zinc-50/50'>
                        {t('time.hours')}
                    </span>
                </div>
                <span className='text-lg sm:text-xl font-black text-zinc-50/30'>
                    :
                </span>
                <div className='flex flex-col items-center justify-center rounded-xl border border-zinc-50/15 bg-zinc-950/40 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur min-w-16 sm:min-w-18'>
                    <span className='text-xl sm:text-2xl font-black tabular-nums text-zinc-50'>
                        {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className='font-mono text-[0.5625rem] sm:text-[0.625rem] uppercase tracking-wider text-zinc-50/50'>
                        {t('time.minutes')}
                    </span>
                </div>
                <span className='text-lg sm:text-xl font-black text-zinc-50/30 hidden sm:inline'>
                    :
                </span>
                <div className='flex flex-col items-center justify-center rounded-xl border border-zinc-50/15 bg-zinc-950/40 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur min-w-16 sm:min-w-18 hidden sm:flex'>
                    <span className='text-xl sm:text-2xl font-black tabular-nums text-zinc-50'>
                        {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className='font-mono text-[0.5625rem] sm:text-[0.625rem] uppercase tracking-wider text-zinc-50/50'>
                        {t('time.seconds')}
                    </span>
                </div>
            </div>
        </div>
    );
}
