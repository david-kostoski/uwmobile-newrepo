import { Platform } from 'react-native';

export type EnvironmentType = 'local' | 'dev' | 'staging';

export interface EnvironmentConfig {
  env: EnvironmentType;
  apiUrl: string;
  appName: string;
}

/**
 * Get the current environment configuration
 * Uses EXPO_PUBLIC_ prefixed environment variables set at build time
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const env = (process.env.EXPO_PUBLIC_ENV as EnvironmentType) || 'local';
  
  // Get platform-specific API URL
  const getApiUrl = (): string => {
    if (Platform.OS === 'android') {
      return process.env.EXPO_PUBLIC_API_URL_ANDROID || 'http://10.0.2.2:5000';
    } else {
      return process.env.EXPO_PUBLIC_API_URL_IOS || 'http://localhost:5000';
    }
  };

  return {
    env,
    apiUrl: getApiUrl(),
    appName: process.env.EXPO_PUBLIC_APP_NAME || 'UWMobile',
  };
}

/**
 * Check if running in development environment
 */
export function isDevelopment(): boolean {
  return getEnvironmentConfig().env === 'local';
}

/**
 * Check if running in staging environment
 */
export function isStaging(): boolean {
  return getEnvironmentConfig().env === 'staging';
}

/**
 * Get current environment name for logging/debugging
 */
export function getCurrentEnvironment(): EnvironmentType {
  return getEnvironmentConfig().env;
}