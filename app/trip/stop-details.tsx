import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppTheme } from '@/constants/AppTheme';

// Helper function to determine time zone based on state abbreviation
const getTimeZone = (address: string): string => {
  if (address.includes('TX') || address.includes('IL') || address.includes('CO')) return 'CST';
  if (address.includes('PA') || address.includes('NY') || address.includes('GA')) return 'EST';
  if (address.includes('CA') || address.includes('WA') || address.includes('OR')) return 'PST';
  if (address.includes('AZ') || address.includes('UT')) return 'MST';
  return 'EST'; // Default
};

export default function StopDetailsScreen() {
  const { 
    name, 
    address, 
    date,
    dropTrailer = 'No',
    handledBy = 'Company',
    appointmentType = 'Appoitment',
    comment = 'This place has overnight parking'
  } = useLocalSearchParams();

  // Split address into components for display
  const addressLines = decodeURIComponent(String(address)).split(', ');
  const street = addressLines[0] || '';
  const location = addressLines.length > 1 ? addressLines[1] : '';
  
  // Get timezone based on address
  const timeZone = getTimeZone(String(address));

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Stop Details</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Location</Text>
          <Text style={styles.locationName}>{name}</Text>
          <Text style={styles.locationAddress}>{street}</Text>
          <Text style={styles.locationAddress}>{location}</Text>
        </View>
        
        <View style={styles.rowSection}>
          <View style={styles.halfSection}>
            <Text style={styles.sectionLabel}>Date and time</Text>
            <Text style={styles.fieldValue}>{date} ({timeZone})</Text>
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.sectionLabel}>Appointment / FCFS</Text>
            <Text style={styles.fieldValue}>{appointmentType}</Text>
          </View>
        </View>
        
        <View style={styles.rowSection}>
          <View style={styles.halfSection}>
            <Text style={styles.sectionLabel}>Drop trailer</Text>
            <Text style={styles.fieldValue}>{dropTrailer}</Text>
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.sectionLabel}>Handeled by</Text>
            <Text style={styles.fieldValue}>{handledBy}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Comment</Text>
          <Text style={styles.fieldValue}>{comment}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Reference numbers</Text>
          {/* Empty section for reference numbers */}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Commodities</Text>
          {/* Empty section for commodities */}
        </View>
      </ScrollView>
      
      {/* Main Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="truck" size={20} color="white" />
          <Text style={styles.tabLabel}>TRIPS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/documents')}>
          <FontAwesome5 name="file-alt" size={20} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.tabLabel}>DOCUMENTS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/detention')}>
          <FontAwesome5 name="clock" size={20} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.tabLabel}>DETENTION</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/reimbursement')}>
          <FontAwesome5 name="dollar-sign" size={20} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.tabLabel}>REIMBURSE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  header: {
    backgroundColor: AppTheme.colors.primary,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerRight: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    padding: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  rowSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  halfSection: {
    flex: 1,
    padding: AppTheme.spacing.md,
  },
  sectionLabel: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.xs,
    fontWeight: '500',
  },
  locationName: {
    fontSize: AppTheme.fontSize.lg,
    fontWeight: '600',
    color: AppTheme.colors.text,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  fieldValue: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  // Tab bar styling matching the main app tabs
  tabBar: {
    flexDirection: 'row',
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
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  }
}); 