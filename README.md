<div align="center">
  <h1>PoopPal</h1>

  <p>
    A retro 16-bit pixel buddy habit counter for Android featuring real-time friend synchronization, cooperative milestones, and procedural retro sound effects.
  </p>

  <p>
    <a href="#download--installation">
      <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Platform: Android" />
    </a>
    <img src="https://img.shields.io/badge/Status-Active_Release-blue?style=flat-square" alt="Status: Active Release" />
  </p>
</div>

---

## Overview

PoopPal is a retro-styled daily digestive habit tracking application built around a reactive 16-bit virtual pet. It transforms daily routine logging into an engaging experience with custom pixel art animations, real-time cooperative buddy synchronization, and tactile feedback.

Designed from the ground up for mobile devices, PoopPal delivers a lightweight, responsive interface with strict privacy controls and offline-first capabilities.

---

## Key Features

- **Reactive 16-Bit Pixel Buddy**: An animated virtual companion that reflects daily wellness metrics through expressive mood states, status badges, and hydration/fiber levels.
- **Real-Time Pal Pairing**: Connect with a partner or friend using anonymous six-character invite codes. View live daily count updates and celebrate mutual milestones in real time.
- **Duo Pal Status & Reaction Cheer**: Keep track of your paired buddy's daily habits side-by-side with instant cheering reactions.
- **Procedural 8-Bit Audio Engine**: Dynamic sound effects generated programmatically via the Web Audio API without requiring bulky external audio file assets.
- **Privacy-First Architecture**: No phone numbers, contacts, or real names are ever collected or indexed. Users pair exclusively through random cryptographic identifiers.
- **Dark & Light Visual Themes**: Full theme support with high-contrast retro palettes optimized for mobile OLED screens and daylight readability.

---

## Download & Installation

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
|                     PoopPal Android App                      |
+--------------------------------------------------------------+
| Runtime           | Capacitor Native Standalone Android APK  |
| UI Layer          | React 19, Tailwind CSS v4, Lucide Icons  |
| State Management  | React Hooks, LocalStorage Cache Fallback |
| Audio Generation  | Web Audio API (Synthesized Chiptune)     |
| Real-Time Sync    | Firebase Firestore Real-Time Listeners   |
| Offline Support   | 100% Embedded Local Assets (No Web Host) |
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

## Security & Privacy Model

PoopPal follows strict data minimization principles:

- **Anonymous Identifier System**: Each installation generates an isolated user ID and an alphanumeric pair code.
- **Zero Social Harvesting**: The app does not request access to device contacts, phone numbers, location services, or SMS.
- **Scoped Security Rules**: Firestore security rules restrict write operations strictly to authenticated document owners while allowing paired pals read-only access to aggregate daily counters.

---

## Copyright & License

Copyright 2026 PoopPal. All rights reserved.

Unauthorized copying, modification, distribution, or commercial use of this software and associated media assets, via any medium, is strictly prohibited.
