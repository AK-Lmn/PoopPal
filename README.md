<div align="center">
  <img width="1200" height="475" alt="PoopPal Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  <h1>PoopPal</h1>

  <p>
    A retro 16-bit pixel buddy habit counter for Android featuring real-time friend synchronization, companion home widgets, and procedural retro sound effects.
  </p>

  <p>
    <a href="#download--installation-android">
      <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Platform: Android" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square" alt="License: Apache 2.0" />
    </a>
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

---

## Overview

PoopPal is a retro-styled daily digestive habit tracking application built around a reactive 16-bit virtual pet. It transforms daily routine logging into an engaging experience with custom pixel art animations, real-time cooperative buddy synchronization, and an interactive home-screen companion widget.

Designed from the ground up for mobile devices, PoopPal delivers a lightweight, responsive interface with strict privacy controls and offline-first capabilities.

---

## Key Features

- **Reactive 16-Bit Pixel Buddy**: An animated virtual companion that reflects daily wellness metrics through expressive mood states, status badges, and hydration/fiber levels.
- **Real-Time Pal Pairing**: Connect with a partner or friend using anonymous six-character invite codes. View live daily count updates and celebrate mutual milestones in real time.
- **Companion Home Widget**: A dedicated compact widget interface that can be placed or docked on screen to display real-time dual buddy statuses and quick-log triggers.
- **Procedural 8-Bit Audio Engine**: Dynamic sound effects generated programmatically via the Web Audio API without requiring bulky external audio file assets.
- **Privacy-First Architecture**: No phone numbers, contacts, or real names are ever collected or indexed. Users pair exclusively through random cryptographic identifiers.
- **Dark & Light Visual Themes**: Full theme support with high-contrast retro palettes optimized for mobile OLED screens and daylight readability.

---

## Download & Installation (Android)

PoopPal is distributed directly as an Android application package (`.apk`).

### Quick Start via GitHub Releases

1. Navigate to the **[Releases](https://github.com/AK-Lmn/PoopPal/releases)** tab of this repository.
2. Under the latest release **Assets**, download `PoopPal.apk`.
3. On your Android device, open the downloaded file.
4. When prompted by Android:
   - Select **Settings** and enable **Allow from this source** (or **Install unknown apps**).
   - Return to the installer and tap **Install**.
5. Launch **PoopPal** from your app drawer.

---

## Architecture & Tech Stack

```text
+--------------------------------------------------------------+
|                       PoopPal Android                        |
+--------------------------------------------------------------+
| UI Layer          | React 19, Tailwind CSS v4, Lucide Icons  |
| State Management  | React Hooks, LocalStorage Cache Fallback |
| Audio Generation  | Web Audio API (Synthesized Chiptune)     |
| Real-Time Sync    | Firebase Firestore Real-Time Listeners   |
| Authentication    | Firebase Auth (Anonymous / Google Auth)  |
| Bundler & Runtime | Vite 8, Modern ECMAScript Modules        |
+--------------------------------------------------------------+
```

### Technology Breakdown

- **Framework**: React 19 with strict TypeScript typing.
- **Styling**: Tailwind CSS v4 utilizing modernized CSS variables and zero-runtime CSS delivery.
- **Icons**: Lucide React for consistent, scalable vector interface glyphs.
- **Audio**: Custom Web Audio API synthesizer generating 8-bit square and triangle waveform tones dynamically.
- **Backend**: Firebase Firestore for low-latency document subscriptions, paired friend synchronization, and granular security rules.
- **Build System**: Vite 8 for fast sub-second hot module reloading and optimized production bundles.

---

## Repository Structure

```text
PoopPal/
├── .github/              # Continuous integration and build workflows
├── public/               # Public static assets, icons, and verification files
│   ├── .well-known/      # Digital Asset Links for Android verification
│   └── icons/            # App launcher icons and splash assets
├── src/
│   ├── components/       # Core UI views and screens
│   │   ├── AndroidFrame.tsx          # Mobile layout and system bar container
│   │   ├── BuddyDisplay.tsx          # 16-bit animated pixel pet renderer
│   │   ├── LogModal.tsx              # Daily habit logging modal
│   │   ├── PalsScreen.tsx            # Real-time paired friend manager
│   │   ├── SettingsScreen.tsx        # Audio, theme, and account settings
│   │   └── WidgetSimulator.tsx       # Companion widget preview and launcher
│   ├── data/             # Static datasets, tips, and mock pal profiles
│   ├── types/            # TypeScript interfaces and data models
│   ├── utils/            # Audio synthesizer, date helpers, and sound effects
│   ├── App.tsx           # Primary application router and state coordinator
│   └── firebase.ts       # Firebase initialization and authentication layer
├── firestore.rules       # Granular Firestore security access rules
├── package.json          # Project dependencies and script declarations
├── tsconfig.json         # TypeScript compiler configuration
└── vite.config.ts        # Vite configuration and path aliases
```

---

## Developer Setup

### Prerequisites

- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/AK-Lmn/PoopPal.git
   cd PoopPal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Production Build

To compile and bundle the application:

```bash
npm run build
```

The compiled output will be generated inside the `dist/` directory. You can preview the production bundle locally with:

```bash
npm run preview
```

---

## Security & Privacy Model

PoopPal follows strict data minimization principles:

- **Anonymous Identifier System**: Each installation generates an isolated user ID and an alphanumeric pair code.
- **Zero Social Harvesting**: The app does not request access to device contacts, phone numbers, location services, or SMS.
- **Scoped Security Rules**: Firestore security rules restrict write operations strictly to authenticated document owners while allowing paired pals read-only access to aggregate daily counters.

---

## Contributing

Contributions are welcome. If you would like to report an issue or propose a feature:

1. Fork the repository.
2. Create a dedicated feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes with clear, descriptive commit messages adhering to standard Developer Certificate of Origin (DCO) signoffs.
4. Push to your branch and open a Pull Request against `main`.

---

## License

This project is licensed under the **Apache License, Version 2.0**. See the [LICENSE](LICENSE) file for complete details.
