# UWMobile

Professional mobile application for logistics and transportation management.

## Prerequisites

- **Node.js**: 18.0.0 or higher
- **Java JDK**: 17 or higher (for Android development)
- **Android Studio**: Latest version with Android SDK
- **Git**: For version control

## Technology Stack

| Component | Version |
|-----------|---------|
| Expo SDK | 53.0.20 |
| React Native | 0.79.6 |
| React | 19.0.0 |
| TypeScript | 5.8.3 |
| Android Target SDK | 35 |
| Android Min SDK | 24 |

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uwmobile-newrepo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   ```

   Configure environment variables in `.env`:
   ```env
   EXPO_PUBLIC_ENV=local
   EXPO_PUBLIC_API_URL_ANDROID=http://10.0.2.2:5000
   EXPO_PUBLIC_API_URL_IOS=http://localhost:5000
   EXPO_PUBLIC_APP_NAME=UWMobile Local
   ```

## Development

### Start Development Server

```bash
npm start
```

### Platform-Specific Development

**Android**
```bash
npm run android
```

**Web Browser**
```bash
npm run web
```

## Production Build

### Android App Bundle (for Google Play Store)

```bash
cd android
./gradlew bundleRelease
```

**Output**: `android/app/build/outputs/bundle/release/app-release.aab`

### Android APK (for testing)

```bash
cd android
./gradlew assembleRelease
```

**Output**: `android/app/build/outputs/apk/release/app-release.apk`

## Environment Configuration

The application supports multiple environments:

- **local**: Development environment
- **dev**: Development server environment  
- **staging**: Pre-production environment

Configure the environment by setting `EXPO_PUBLIC_ENV` in your `.env` file.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Run Android development build |
| `npm run web` | Run web version |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |
| `npm run prebuild` | Generate native Android project |

## Authentication

The application requires user authentication. Users must sign in with valid credentials to access the main application features.

## Build Requirements

### Android
- **Android Studio**: Latest version
- **Android SDK**: API level 24-35
- **Java JDK**: 17 or higher
- **Gradle**: 8.10.2
- **Kotlin**: 2.0.21

## Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npm start -- --reset-cache
```

**Android build issues**
```bash
cd android && ./gradlew clean
```

**Dependency conflicts**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Android Build Environment

Ensure the following environment variables are set:
