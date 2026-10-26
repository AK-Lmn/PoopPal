<div align="center">
  <img src="public/app-icon.svg" alt="PoopPal Logo" width="128" height="128" />

  <h1>PoopPal</h1>

  <p>
    A retro 16-bit pixel buddy habit counter for Android featuring real-time friend synchronization, native home widgets, system pull-down tiles, and procedural retro sound effects.
  </p>

  <p>
    <a href="#download--installation">
      <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Platform: Android" />
    </a>
    <a href="#ios-installation-via-altstore-classic">
      <img src="https://img.shields.io/badge/Platform-iOS-000000?style=flat-square&logo=apple&logoColor=white" alt="Platform: iOS" />
    </a>
    <a href="https://github.com/AK-Lmn/PoopPal/releases/tag/v1.0.0">
      <img src="https://img.shields.io/badge/Release-v1.0.0-blue?style=flat-square" alt="Release: v1.0.0" />
    </a>
    <img src="https://img.shields.io/badge/Status-Active_Production-success?style=flat-square" alt="Status: Active Production" />
  </p>
</div>

---

## Overview

PoopPal is a retro-styled daily digestive habit tracking application built around a reactive 16-bit virtual pet. It transforms daily routine logging into an engaging experience with custom pixel art animations, real-time cooperative buddy synchronization, native Android home screen widgets, and quick pull-down notification shade actions.

Designed from the ground up for mobile devices, PoopPal delivers a lightweight, responsive interface with strict privacy controls and offline-first capabilities.

---

## Key Features

- **Reactive 16-Bit Pixel Buddy**: An animated virtual companion ("Sir Poops-a-Lot") that reflects daily wellness metrics through expressive mood states, status badges, and hydration/fiber levels.
- **Native Android Home Screen Widget**: An interactive 2x2 companion widget that places your buddy and 1-tap logging directly on your device home screen.
- **Quick Settings Pull-Down Tile**: System notification shade tile (`PoopPal Log`) for instant background logging with system toast confirmation without opening the full app.
- **Launcher Long-Press Shortcuts**: Fast app shortcuts ("Log Flush Now" and "View Paired Pal") accessible directly by long-pressing the app icon.
- **Real-Time Pal Pairing**: Connect with a partner or friend using anonymous 6-character invite codes. View live daily count updates and celebrate mutual milestones in real time.
- **Duo Pal Status & Reaction Cheer**: Keep track of your paired buddy's daily habits side-by-side with instant cheering reactions.
- **Procedural 8-Bit Audio Engine**: Dynamic sound effects generated programmatically via the Web Audio API without requiring bulky external audio file assets.
- **Privacy-First Architecture**: No phone numbers, contacts, or real names are ever collected or indexed. Users pair exclusively through random cryptographic identifiers.
- **Dark & Light Visual Themes**: Full theme support with high-contrast retro palettes optimized for mobile OLED screens and daylight readability.

---

## Download & Installation

PoopPal is distributed directly as an Android application package (`.apk`) and as an iOS package (`.ipa`) for sideloading via AltStore Classic.

### Android Installation (`.apk`)

1. Navigate to the **[Releases](https://github.com/AK-Lmn/PoopPal/releases)** tab of this repository.
2. Under the latest release **Assets**, download `PoopPal.apk`.
3. On your Android device, open the downloaded file.
4. When prompted by Android:
   - Select **Settings** and enable **Allow from this source** (or **Install unknown apps**).
   - Return to the installer and tap **Install**.
5. Launch **PoopPal** from your app drawer.

### iOS Installation via AltStore Classic (`.ipa`)

PoopPal can be installed on any iPhone running iOS 15.0 or later without an Apple Developer subscription ($99/yr) using **AltStore Classic**.

#### Option A: One-Tap AltStore Source (Recommended)

1. Ensure **AltStore Classic** is installed on your iPhone (via [altstore.io](https://altstore.io)).
2. Tap the one-click source link on your iPhone:
   👉 **[Add PoopPal to AltStore](altstore://source?url=https://raw.githubusercontent.com/AK-Lmn/PoopPal/main/altstore.json)**
3. Or manually in AltStore:
   - Open the **Sources** tab and tap **+** in the top-right corner.
   - Enter source URL: `https://raw.githubusercontent.com/AK-Lmn/PoopPal/main/altstore.json`
4. Tap **FREE** or **INSTALL** next to **PoopPal** in the My Apps / Browse tab.

#### Option B: Direct Sideloading via `.ipa`

1. Download `PoopPal.ipa` from the latest **[GitHub Releases](https://github.com/AK-Lmn/PoopPal/releases)** on your iPhone.
2. Open **AltStore**, navigate to the **My Apps** tab, and tap the **+** icon in the top-left corner.
3. Select the downloaded `PoopPal.ipa`. AltStore will sign and install PoopPal.

> [!NOTE]
> **Free Apple ID 7-Day Refresh Policy:** Free Apple IDs have a 7-day personal provisioning limit. AltStore automatically refreshes PoopPal in the background whenever your iPhone is on the same Wi-Fi network as your computer running AltServer. You can also tap **Refresh All** inside AltStore at any time.

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
