import type { UiTeam } from '@/components/web-data';
import Image from 'next/image';

const sizes = {
    xs: 'h-3 w-4.5',
    sm: 'h-3.5 w-[1.3125rem]',
    md: 'h-4.5 w-[1.6875rem]',
    lg: 'h-5.5 w-[2.0625rem]',
};

export function Flag({
    team,
    size = 'md',
    className = '',
}: {
    team: UiTeam;
    size?: keyof typeof sizes;
    className?: string;
}) {
    const width =
        size === 'xs' ? 18 : size === 'sm' ? 21 : size === 'lg' ? 33 : 27;
    const height =
        size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 22 : 18;

    return (
        <Image
            src={`https://flagcdn.com/${team.iso}.svg`}
            alt={`${team.name} flag`}
            width={width}
            height={height}
            className={`${sizes[size]} shrink-0 rounded-xs object-cover ring-1 ring-border ${className}`}
        />
    );
}
