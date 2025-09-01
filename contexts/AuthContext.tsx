import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import type { AuthContextType, AuthProviderProps } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = '@uwmobile_auth_token';
const LAST_TAB_KEY = '@uwmobile_last_tab';

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [hasNavigatedToLastTab, setHasNavigatedToLastTab] = useState(false);

  const isAuthenticated = !!token;
  

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (!hasInitialized || isLoading) {
      return;
    }

    if (isAuthenticated && !hasNavigatedToLastTab) {
      navigateToLastTab();
      setHasNavigatedToLastTab(true);
    } else if (!isAuthenticated) {
      router.replace('/login');
      setHasNavigatedToLastTab(false);
    }
  }, [isAuthenticated, isLoading, hasInitialized, hasNavigatedToLastTab]);

  const navigateToLastTab = async () => {
    try {
      const lastTab = await AsyncStorage.getItem(LAST_TAB_KEY);

      let targetRoute = '/(tabs)';
      
      if (lastTab) {
        switch (lastTab) {
          case 'index':
            targetRoute = '/(tabs)';
            break;
          case 'documents':
            targetRoute = '/(tabs)/documents';
            break;
          case 'detention':
            targetRoute = '/(tabs)/detention';
            break;
          case 'reimbursement':
            targetRoute = '/(tabs)/reimbursement';
            break;
          default:
            targetRoute = '/(tabs)';
        }
      }
      
      router.replace(targetRoute as any);
    } catch (error) {
      console.error('Error in navigateToLastTab:', error);
      router.replace('/(tabs)');
    }
  };

  const checkAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
    }
  };

  const login = async (newToken: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error storing token:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      setToken(null);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  const setLastActiveTab = async (tabName: string) => {
    try {
      await AsyncStorage.setItem(LAST_TAB_KEY, tabName);
    } catch (error) {
      console.error('Error storing last active tab:', error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    token,
    login,
    logout,
    setLastActiveTab,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}