import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppTheme } from '@/constants/AppTheme';

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
}

export default function CustomCheckbox({ checked, onPress, size = 24 }: CustomCheckboxProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.checkbox, 
        { width: size, height: size }, 
        checked && styles.checkboxSelected
      ]} 
      onPress={onPress}
    >
      {checked && (
        <Ionicons name="checkmark" size={size * 0.75} color={AppTheme.colors.primary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: AppTheme.colors.primary,
  },
}); 