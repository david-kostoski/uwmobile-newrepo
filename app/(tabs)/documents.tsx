import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { AppTheme } from '@/constants/AppTheme';

export default function DocumentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Documents</Text>
        <Text style={styles.subtitle}>This screen is under development</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppTheme.spacing.lg,
  },
  title: {
    fontSize: AppTheme.fontSize.xxl,
    fontWeight: '700',
    color: AppTheme.colors.primary,
    marginBottom: AppTheme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: AppTheme.fontSize.lg,
    color: AppTheme.colors.textSecondary,
    textAlign: 'center',
  },
}); 