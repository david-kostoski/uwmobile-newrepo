import { useEffect } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { AppTheme } from '@/constants/AppTheme';

export default function AuthCheck() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <ThemedView style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <ActivityIndicator size="large" color={AppTheme.colors.primary} />
    </ThemedView>
  );
}