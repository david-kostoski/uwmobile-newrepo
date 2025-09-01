import { Tabs, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Text, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { AppTheme } from '@/constants/AppTheme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';
import { useTabTracking } from '@/hooks/useTabTracking';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useTabTracking();

  const handleLogout = async () => {
    try {
      setShowUserMenu(false);
      await logout();
    } catch (error) {
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
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
            <TouchableOpacity onPress={toggleUserMenu} style={styles.profileIcon}>
              <FontAwesome5 
                name="user-circle" 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
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
              <FontAwesome5 name="shipping-fast" size={20} color={color} />
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

      {/* User Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showUserMenu}
        onRequestClose={() => setShowUserMenu(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowUserMenu(false)}
        >
          <View style={styles.userMenu}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleLogout}
            >
              <FontAwesome5 
                name="sign-out-alt" 
                size={16} 
                color={AppTheme.colors.text} 
              />
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  profileIcon: {
    marginRight: AppTheme.spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  userMenu: {
    backgroundColor: 'white',
    marginTop: 80,
    marginRight: AppTheme.spacing.md,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: AppTheme.colors.text,
  },
});
