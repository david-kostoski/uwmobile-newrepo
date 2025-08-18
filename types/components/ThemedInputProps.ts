import type { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface ThemedInputProps extends TextInputProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  error?: string | null;
  showError?: boolean;
}