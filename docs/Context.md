# Formula 1 Mobile App Overview

## Overall Structure

The app features a tab-based navigation system with four main sections:

- **Home**: Displays the next race and an F1 rules guide.
- **Schedule**: Shows the race calendar with past and upcoming races.
- **Rankings**: Contains driver and constructor standings.
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

- Highlights the next race with an image and countdown.
- Includes an F1 rules guide covering qualifying, points system, and sprint races.
- Features a clean, dark theme design with F1's signature red (#E10600).

### Schedule Screen

- Provides a complete race calendar listing.
- Uses visual indicators for completed races with winners.
- Displays round numbers with distinctive red badges.
- Offers interactive race cards with chevron indicators.

### Rankings Section

- Utilizes Material Top Tabs navigation for Drivers/Constructors.
- Implements SafeArea with matching header colors.
- Includes a help icon with a championship rules modal.
- Supports horizontal swipe transitions between tabs.
- Shows detailed standings with points and team information.

### More Screen

- Features an additional menu with icons.
- Maintains consistent styling with the app theme.
- Provides options for rules, track guides, teams, news, and settings.

## Technical Implementations

- Proper navigation setup using expo-router.
- SafeArea handling for different devices.
- Modal implementation for rules explanation.
- Consistent styling using StyleSheet.
- Proper type definitions with TypeScript.
- Integration of Expo Vector Icons.
- Linear gradients for visual effects.

## Design Language

- Dark theme with #141414 background.
- F1 red (#E10600) for accents and primary elements.
- Consistent card-based UI with #1E1E1E backgrounds.
- Clear typography hierarchy.
- Proper spacing and padding.
- Interactive elements with proper visual feedback.

The app is fully functional with a professional, production-ready design that adheres to F1's branding guidelines while ensuring excellent usability and user experience.
