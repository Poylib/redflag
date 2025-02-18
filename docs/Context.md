# Formula 1 Mobile App Overview

## Overall Structure

The app is organized with a tab-based navigation system, featuring four main sections:

- **Home**: Highlights the next race and provides an F1 rules guide.
- **Schedule**: Displays the race calendar, including past and upcoming races.
- **Rankings**: Shows driver and constructor standings.
- **More**: Offers additional menu options and features.

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- React Query
- React Hook Form
- React Native Reanimated
- Backend/Database: Supabase
- UI Framework: React Native Paper

## Key Features Implemented

### Home Screen

- **Next Race Highlight**: Displays race name, circuit information, date, and time.
- **Track Characteristics**: Includes track length, number of corners, DRS zones, top speed, and lap record.
- **Design**: Utilizes a clean, dark theme with F1's signature red color (#E10600).

### Schedule Screen

- **Race Calendar**: Provides a complete listing of races with status (completed/upcoming).
- **Visual Indicators**: Marks completed races and displays winners.

### Rankings Section

- **Driver and Constructor Championships**: Displays detailed standings and championship rules.

### More Screen

- **Features Menu**: Includes race rules, track guides, team information, news, and settings.

## Technical Implementations

- **Framework**: Built with Expo (SDK 52.0.33).
- **Routing**: Managed using Expo Router 4.0.17.
- **UI Components**: Developed with React Native.
- **Icons**: Integrated using @expo/vector-icons.
- **Animations**: Implemented with react-native-reanimated.

## Design Language

- **Theme**: Dark background (#141414) with F1 red accents (#E10600).
- **UI**: Card-based design with #1E1E1E backgrounds.
- **Typography**: Clear hierarchy for readability.
- **Spacing**: Proper padding and spacing for a clean layout.
- **Interactivity**: Elements provide visual feedback upon interaction.

## Key Components

- **LinearGradient**: Used for image overlay effects.
- **ScrollView**: Allows for scrollable content.
- **SafeAreaView**: Manages safe area for different devices.
- **Animated**: Provides animation effects for transitions.
- **Modal**: Used for pop-up dialogs.

## Environment Configuration (app.json)

- **App Name**: F1 Race Hub
- **Version**: 1.0.0
- **Supported Platforms**: iOS, Android, Web
- **Bundle ID**: com.f1racehub.app
- **Icon and Splash Screen Settings**

The app is fully functional and features a professional, production-ready design that aligns with F1's branding guidelines, ensuring excellent usability and user experience.
