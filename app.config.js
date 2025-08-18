import 'dotenv/config';

const IS_DEV = process.env.EXPO_PUBLIC_ENV === 'dev';
const IS_STAGING = process.env.EXPO_PUBLIC_ENV === 'staging';

export default {
  expo: {
    name: process.env.EXPO_PUBLIC_APP_NAME || 'UWMobile3App',
    slug: 'UWMobile3App',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_STAGING 
        ? 'com.uwmobile3.app.staging' 
        : IS_DEV 
        ? 'com.uwmobile3.app.dev' 
        : 'com.uwmobile3.app'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: IS_STAGING 
        ? 'com.uwmobile3.app.staging' 
        : IS_DEV 
        ? 'com.uwmobile3.app.dev' 
        : 'com.uwmobile3.app'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff'
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      environment: process.env.EXPO_PUBLIC_ENV || 'local'
    }
  }
};