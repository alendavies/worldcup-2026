'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isObscure = theme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(isObscure ? 'light' : 'dark')}
            aria-label={isObscure ? 'Switch to Clear mode' : 'Switch to Obscure mode'}
            title={isObscure ? 'Clear mode' : 'Obscure mode'}
            className="group relative flex h-9 items-center gap-2 rounded-full border border-border bg-secondary px-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
            <span
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                    mounted && !isObscure
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground'
                }`}
            >
                <Sun className="h-3.5 w-3.5" />
            </span>
            <span
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                    mounted && isObscure
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground'
                }`}
            >
                <Moon className="h-3.5 w-3.5" />
            </span>
            <span className="sr-only">
                {mounted ? (isObscure ? 'Obscure' : 'Clear') : 'Theme'}
            </span>
        </button>
    );
}
