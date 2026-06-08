export type Lang = 'en' | 'es';

export const dict = {
    en: {
        'nav.fixtures': 'Fixtures',
        'nav.standings': 'Standings',
        'nav.bracket': 'Bracket',
        'header.tagline': 'Fixtures & Results',
        'header.hosts': 'Host nations: Canada, Mexico, United States',
        'hero.dates': 'Jun 11 — Jul 19, 2026',
        'hero.title': 'FIFA World Cup',
        'hero.lede':
            'Every fixture, live score and result from the first-ever 48-team World Cup, hosted across the United States, Canada and Mexico. Follow the road from the group stage to the final.',
        'hero.hostedBy': 'Hosted by',
        'hero.stat.teams': 'Teams',
        'hero.stat.matches': 'Matches',
        'hero.stat.cities': 'Host Cities',
        'hero.stat.days': 'Days',
        'ticker.live': 'Live',
        'ticker.ft': 'FT',
        'fixtures.eyebrow': 'Matchday',
        'fixtures.title': 'Fixtures & Results',
        'fixtures.filter.all': 'All',
        'fixtures.filter.live': 'Live',
        'fixtures.filter.finished': 'Results',
        'fixtures.filter.upcoming': 'Upcoming',
        'fixtures.group.all': 'All groups',
        'fixtures.group.label': 'Group',
        'fixtures.team.all': 'All teams',
        'fixtures.team.label': 'Team',
        'fixtures.search': 'Search team or code',
        'fixtures.status.label': 'Status',
        'fixtures.loadMore': 'Load more',
        'fixtures.empty': 'No matches in this category yet.',
        'match.live': "{m}'",
        'match.ft': 'Full Time',
        'match.upcoming': 'Upcoming',
        'standings.eyebrow': 'Group Stage',
        'standings.title': 'Standings',
        'standings.col.team': 'Team',
        'standings.legend': 'Top two advance to the knockout stage',
        'knockout.eyebrow': 'Road to the title',
        'knockout.title': 'Knockout Bracket',
        'knockout.final': 'The Final',
        'knockout.vs': 'vs',
        'knockout.winner': 'Winner',
        'knockout.champion': 'Champion crowned · Jul 19, 2026',
        'footer.label': 'WC26 · Fixtures & Results',
        'footer.note': 'Unofficial fan project. Scores update through the project data layer.',
        'lang.label': 'Language',
    },
    es: {
        'nav.fixtures': 'Partidos',
        'nav.standings': 'Clasificación',
        'nav.bracket': 'Eliminatorias',
        'header.tagline': 'Calendario y Resultados',
        'header.hosts': 'Países anfitriones: Canadá, México, Estados Unidos',
        'hero.dates': '11 Jun — 19 Jul, 2026',
        'hero.title': 'Copa Mundial FIFA',
        'hero.lede':
            'Todos los partidos, marcadores en vivo y resultados de la primera Copa del Mundo con 48 selecciones, organizada en Estados Unidos, Canadá y México. Sigue el camino desde la fase de grupos hasta la final.',
        'hero.hostedBy': 'Organizan',
        'hero.stat.teams': 'Selecciones',
        'hero.stat.matches': 'Partidos',
        'hero.stat.cities': 'Sedes',
        'hero.stat.days': 'Días',
        'ticker.live': 'En vivo',
        'ticker.ft': 'Final',
        'fixtures.eyebrow': 'Jornada',
        'fixtures.title': 'Calendario y Resultados',
        'fixtures.filter.all': 'Todos',
        'fixtures.filter.live': 'En vivo',
        'fixtures.filter.finished': 'Resultados',
        'fixtures.filter.upcoming': 'Próximos',
        'fixtures.group.all': 'Todos los grupos',
        'fixtures.group.label': 'Grupo',
        'fixtures.team.all': 'Todas las selecciones',
        'fixtures.team.label': 'Selección',
        'fixtures.search': 'Buscar selección o código',
        'fixtures.status.label': 'Estado',
        'fixtures.loadMore': 'Cargar más',
        'fixtures.empty': 'Aún no hay partidos en esta categoría.',
        'match.live': "{m}'",
        'match.ft': 'Tiempo Completo',
        'match.upcoming': 'Próximo',
        'standings.eyebrow': 'Fase de Grupos',
        'standings.title': 'Clasificación',
        'standings.col.team': 'Equipo',
        'standings.legend': 'Los dos primeros avanzan a la fase eliminatoria',
        'knockout.eyebrow': 'Camino al título',
        'knockout.title': 'Cuadro Eliminatorio',
        'knockout.final': 'La Final',
        'knockout.vs': 'vs',
        'knockout.winner': 'Ganador',
        'knockout.champion': 'Campeón coronado · 19 Jul, 2026',
        'footer.label': 'WC26 · Calendario y Resultados',
        'footer.note': 'Proyecto no oficial. Los marcadores se actualizan desde la capa de datos.',
        'lang.label': 'Idioma',
    },
} as const;

export type TKey = keyof (typeof dict)['en'];

const teamNamesEs: Record<string, string> = {
    USA: 'Estados Unidos',
    MEX: 'México',
    CAN: 'Canadá',
    BRA: 'Brasil',
    MAR: 'Marruecos',
    PAR: 'Paraguay',
    GER: 'Alemania',
    CIV: 'Costa de Marfil',
    JPN: 'Japón',
    SWE: 'Suecia',
    BEL: 'Bélgica',
    EGY: 'Egipto',
    NZL: 'Nueva Zelanda',
    ESP: 'España',
    KSA: 'Arabia Saudita',
    URU: 'Uruguay',
    FRA: 'Francia',
    SEN: 'Senegal',
    NOR: 'Noruega',
    ARG: 'Argentina',
    ALG: 'Argelia',
    AUT: 'Austria',
    POR: 'Portugal',
    COL: 'Colombia',
    ENG: 'Inglaterra',
    CRO: 'Croacia',
    GHA: 'Ghana',
};

const citiesEs: Record<string, string> = {
    'Mexico City': 'Ciudad de México',
    'Los Angeles': 'Los Ángeles',
    'New York/New Jersey': 'Nueva York/Nueva Jersey',
    Philadelphia: 'Filadelfia',
};

const monthsEs: Record<string, string> = {
    Jan: 'Ene',
    Feb: 'Feb',
    Mar: 'Mar',
    Apr: 'Abr',
    May: 'May',
    Jun: 'Jun',
    Jul: 'Jul',
    Aug: 'Ago',
    Sep: 'Sep',
    Oct: 'Oct',
    Nov: 'Nov',
    Dec: 'Dic',
};

const roundsEs: Record<string, string> = {
    'Round of 32': 'Dieciseisavos de Final',
    'Round of 16': 'Octavos de Final',
    'Quarter-finals': 'Cuartos de Final',
    'Semi-finals': 'Semifinales',
    Final: 'Final',
};

export function createT(lang: Lang) {
    return (key: TKey, vars?: Record<string, string | number>) => {
        let str: string = dict[lang][key] ?? dict.en[key] ?? key;
        if (vars) {
            for (const [k, v] of Object.entries(vars)) {
                str = str.replace(`{${k}}`, String(v));
            }
        }
        return str;
    };
}

export function teamName(code: string, fallback: string, lang: Lang) {
    return lang === 'es' ? teamNamesEs[code] ?? fallback : fallback;
}

export function cityName(city: string, lang: Lang) {
    return lang === 'es' ? citiesEs[city] ?? city : city;
}

export function groupName(group: string, lang: Lang) {
    return lang === 'es' ? group.replace('Group', 'Grupo') : group;
}

export function roundName(round: string, lang: Lang) {
    return lang === 'es' ? roundsEs[round] ?? round : round;
}

export function dateLabel(date: string, lang: Lang) {
    const m = date.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s*(\d{4})$/);
    if (!m) return date;
    const [, mon, day, year] = m;
    if (lang === 'es') return `${day} ${monthsEs[mon] ?? mon}, ${year}`;
    return date;
}
