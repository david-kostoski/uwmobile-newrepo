import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { AppTheme } from '@/constants/AppTheme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        headerStyle: {
          backgroundColor: AppTheme.colors.primary,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <FontAwesome5 
            name="user" 
            size={20} 
            color="white" 
            style={styles.profileIcon}
          />
        ),
        tabBarStyle: {
          backgroundColor: AppTheme.colors.primary,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'TRIPS',
          headerTitle: 'TRIPS',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="truck" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: 'DOCUMENTS',
          headerTitle: 'DOCUMENTS',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="file-alt" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="detention"
        options={{
          title: 'DETENTION',
          headerTitle: 'DETENTION',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clock" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reimbursement"
        options={{
          title: 'REIMBURSE',
          headerTitle: 'REIMBURSEMENT',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="dollar-sign" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profileIcon: {
    marginRight: AppTheme.spacing.md,
  }
});
