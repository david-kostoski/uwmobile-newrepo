import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCurrentEnvironment, isDevelopment } from '@/constants/Environment';
import { AppTheme } from '@/constants/AppTheme';

/**
 * Environment indicator component to show current environment in development
 * Only visible in development builds
 */
export default function EnvironmentIndicator() {
  if (!__DEV__) {
    return null;
  }

  const currentEnv = getCurrentEnvironment();

  if (currentEnv === 'local') {
    return null;
  }

  const getEnvColor = () => {
    switch (currentEnv) {
      case 'dev':
        return '#ff9500';
      case 'staging':
        return '#ff3b30';
      default:
        return AppTheme.colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getEnvColor() }]}>
      <Text style={styles.text}>{currentEnv.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1000,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});