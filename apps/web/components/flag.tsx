import Image from 'next/image';
import type { UiTeam } from '@/components/web-data';

const sizes = {
    sm: 'h-[14px] w-[21px]',
    md: 'h-[18px] w-[27px]',
    lg: 'h-[22px] w-[33px]',
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
    const width = size === 'sm' ? 21 : size === 'lg' ? 33 : 27;
    const height = size === 'sm' ? 14 : size === 'lg' ? 22 : 18;

    return (
        <Image
            src={`https://flagcdn.com/${team.iso}.svg`}
            alt={`${team.name} flag`}
            width={width}
            height={height}
            className={`${sizes[size]} shrink-0 rounded-[2px] object-cover ring-1 ring-border ${className}`}
        />
    );
}
