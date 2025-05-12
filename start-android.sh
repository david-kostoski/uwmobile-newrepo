#!/bin/bash

# Set PATH to include Homebrew binaries where npm, npx and node are installed
export PATH="/opt/homebrew/bin:$PATH"

# Run prebuild if needed
# npm run prebuild

# Start the app with Expo Go on Android
npx expo start --android 