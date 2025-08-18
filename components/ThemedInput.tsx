import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppTheme } from '@/constants/AppTheme';
import type { ThemedInputProps } from '@/types/components';

export default function ThemedInput({ 
  leftIcon, 
  isPassword = false, 
  error, 
  showError = false, 
  style, 
  ...rest 
}: ThemedInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const hasError = showError && error;

  return (
    <View style={style as ViewStyle}>
      <View style={[styles.container, hasError && styles.containerError]}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={hasError ? AppTheme.colors.error : AppTheme.colors.textSecondary} 
            style={styles.leftIcon} 
          />
        )}
        
        <TextInput
          style={[styles.input, hasError && styles.inputError]}
          placeholderTextColor={AppTheme.colors.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />
        
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={hasError ? AppTheme.colors.error : AppTheme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {hasError && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    paddingHorizontal: AppTheme.spacing.md,
    paddingVertical: AppTheme.spacing.sm,
    marginBottom: AppTheme.spacing.sm,
  },
  containerError: {
    borderColor: AppTheme.colors.error,
    borderWidth: 1.5,
  },
  leftIcon: {
    marginRight: AppTheme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    paddingVertical: AppTheme.spacing.sm,
  },
  inputError: {
    color: AppTheme.colors.text,
  },
  eyeIcon: {
    padding: AppTheme.spacing.xs,
  },
  errorText: {
    color: AppTheme.colors.error,
    fontSize: AppTheme.fontSize.sm,
    marginTop: AppTheme.spacing.xs,
    marginBottom: AppTheme.spacing.md,
    marginLeft: AppTheme.spacing.xs,
  },
});