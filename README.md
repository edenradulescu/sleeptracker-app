# Sleep Tracker

A mobile-first app for logging and reviewing your sleep. Built with [Ionic](https://ionicframework.com/) and [Angular](https://angular.dev/), and packaged with [Capacitor](https://capacitorjs.com/) to run natively on iOS and Android (as well as in the browser).

The app lets you log overnight sleep sessions and daytime sleepiness ratings (using the [Stanford Sleepiness Scale](https://web.stanford.edu/~dement/sss.html)), then review that history over time — all stored locally on-device.

## Features

- **Log Sleep** — record a bedtime and wake-up time; the app calculates and displays total sleep duration.
- **Log Sleepiness** — rate your alertness on the 7-point Stanford Sleepiness Scale (1 = "wide awake" to 7 = "fighting sleep").
- **Sleep History** — browse past overnight sleep entries.
- **Sleepiness Log** — browse past sleepiness ratings.
- **Home dashboard** — quick-access buttons to each feature plus at-a-glance cards for your most recent sleep and sleepiness entries.
- **Local persistence** — all data is saved on-device via [`@ionic/storage-angular`](https://github.com/ionic-team/ionic-storage), so it survives app restarts without any backend or account.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Angular 19](https://angular.dev/) (standalone components, no NgModules) |
| UI components | [Ionic 8](https://ionicframework.com/docs/components) |
| Native runtime | [Capacitor 7](https://capacitorjs.com/) (`@capacitor/app`, `haptics`, `keyboard`, `status-bar`) |
| Storage | `@ionic/storage-angular` (IndexedDB/SQLite-backed local storage) |
| State | RxJS `BehaviorSubject`s exposed as observables from `SleepService` |
| Testing | Karma + Jasmine |
| Linting | ESLint (`@angular-eslint`, `@typescript-eslint`) |

## Project structure

```
src/app/
├── data/                        # Domain models
│   ├── sleep-data.ts            # Base class: id, loggedAt, summaryString()
│   ├── overnight-sleep-data.ts  # A single night's sleep (start/end time)
│   └── stanford-sleepiness-data.ts # A sleepiness rating (1–7)
├── services/
│   └── sleep.service.ts         # Loads/saves data via Ionic Storage, exposes observables
├── home/                        # Dashboard page
└── pages/
    ├── log-sleep/                # Form to log a night's sleep
    ├── sleep-history/             # List of past sleep entries
    ├── sleepiness/                # Form to log a sleepiness rating
    └── sleepiness-history/        # List of past sleepiness entries
```

Routing is defined in [`src/app/app.routes.ts`](src/app/app.routes.ts) using lazy-loaded standalone components.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Ionic CLI](https://ionicframework.com/docs/cli) — `npm install -g @ionic/cli`
- For native builds: [Xcode](https://developer.apple.com/xcode/) (iOS) and/or [Android Studio](https://developer.android.com/studio) (Android)

### Install dependencies

```bash
npm install
```

### Run in the browser

```bash
npm start
# or: ionic serve
```

This starts a dev server (via `ng serve`) with live reload at `http://localhost:4200`.

### Run tests

```bash
npm test
```

Runs the unit test suite with Karma/Jasmine.

### Lint

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

Output is written to the `www/` directory.

## Running on iOS / Android

This project uses Capacitor to wrap the web app in a native shell.

```bash
# Build the web assets, then sync them into the native projects
npm run build
npx cap sync

# Open in the native IDE
npx cap open ios
npx cap open android
```

From there, run the app on a simulator/emulator or a connected device via Xcode or Android Studio.

## Data model

- **`SleepData`** — abstract base with a generated `id` (via `nanoid`), a `loggedAt` timestamp, and `summaryString()` / `dateString()` helpers.
- **`OvernightSleepData`** — extends `SleepData` with `sleepStart` / `sleepEnd`; `summaryString()` returns the computed duration (e.g. "8 hours, 0 minutes").
- **`StanfordSleepinessData`** — extends `SleepData` with a `1–7` `loggedValue` mapped to a human-readable description from the Stanford Sleepiness Scale.

`SleepService` is the single source of truth: it loads persisted data on startup, seeds a couple of example entries the first time the app runs, and exposes `overnightData$` / `sleepinessData$` observables that pages subscribe to. All writes (`logOvernightData`, `logSleepinessData`, `deleteOvernightData`, `deleteSleepinessData`) persist immediately to local storage.

## License

No license has been specified for this project.
