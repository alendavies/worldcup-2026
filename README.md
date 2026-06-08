# 🏆 FIFA World Cup 2026 — Fixtures & Results

A modern, Match Center for the 2026 FIFA World Cup hosted across the United States, Canada, and Mexico.

Built as a high-performance monorepo, this project shares core tournament logic and static data between a Next.js web application and an Expo React Native mobile app.

## ✨ Features

- **Live Match Center:** Real-time ticker and match status updates.
- **Advanced Fixtures Feed:** Sticky date-grouped match lists with progressive "Load more" pagination.
- **Smart Filtering:** Quickly narrow down matches by Status (Live/Upcoming/Finished), Group, or specific Team.
- **Match Details:** Dedicated pages for each match featuring large scoreboards, stadium info, and kickoff times.
- **Group Standings:** Auto-calculated group tables based on match results.
- **Knockout Bracket:** Visual roadmap from the Round of 32 to the Final.
- **Bilingual Support:** Full i18n support for English and Spanish.
- **Dark Mode:** Beautiful dark theme built with Tailwind CSS and shadcn/ui.

## 🏗️ Architecture

This project is a [Turborepo](https://turbo.build/) monorepo using `pnpm`. It strictly separates UI from domain logic to ensure 100% consistency between the web and mobile apps.

### Apps and Packages

- `apps/web`: The web application built with Next.js (App Router), React, Tailwind CSS, and shadcn/ui.
- `apps/mobile`: The mobile application built with Expo, React Native, and NativeWind.
- `packages/core`: Pure, shared domain logic (e.g., standings calculation, match sorting, types).
- `packages/data`: Static tournament data (teams, groups, stadiums, base fixtures) stored in JSON.
- `packages/api-client`: Shared API client and external data normalization layer for future live-data integration.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- [pnpm](https://pnpm.io/) (v8+)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/worldcup-2026.git
    cd worldcup-2026
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Apps

**Start the Web App (Next.js):**

```bash
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Start the Mobile App (Expo):**

```bash
pnpm --filter mobile start
```

Use the Expo Go app on your phone to scan the QR code, or press `i` to open in an iOS simulator / `a` for Android emulator.

**Run everything at once:**

```bash
pnpm dev
```

## 🛠️ Commands

- `pnpm build`: Build all apps and packages.
- `pnpm typecheck`: Run TypeScript type checking across the entire monorepo.
- `pnpm lint`: Run ESLint across the monorepo.

## 📝 Data Management

The tournament's static data (teams, stadiums, groups, and the initial fixture schedule) is maintained in `packages/data/src/*.json`.

Dynamic data (live scores, minutes, finished statuses) is designed to be merged at runtime via the `packages/api-client` and `packages/core` helpers, ensuring the UI always reflects the latest state without mutating the base schedule.

## 📄 License

This is an unofficial fan project. All FIFA World Cup logos, team flags, and related trademarks are the property of their respective owners.
