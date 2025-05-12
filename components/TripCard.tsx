import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { AppTheme } from '@/constants/AppTheme';

interface TripDetails {
  deadhead: string;
  trip: string;
  stops: number;
  weight: string;
}

interface Location {
  address: string;
  date: string;
  time: string;
}

interface Trip {
  id: string;
  amount: number;
  origin: Location;
  destination: Location;
  details: TripDetails;
  confirmed?: boolean;
}

interface TripCardProps {
  trip: Trip;
  tabType?: 'active' | 'processing' | 'completed';
}

// Helper function to determine time zone based on state abbreviation
const getTimeZone = (address: string): string => {
  if (address.includes('TX') || address.includes('IL') || address.includes('CO')) return 'CST';
  if (address.includes('PA') || address.includes('NY') || address.includes('GA')) return 'EST';
  if (address.includes('CA') || address.includes('WA') || address.includes('OR')) return 'PST';
  if (address.includes('AZ') || address.includes('UT')) return 'MST';
  return 'EST'; // Default
};

export default function TripCard({ trip, tabType = 'active' }: TripCardProps) {
  const handlePress = () => {
    // Navigate to trip detail page with a workaround for linting issues
    // This works since we've created /trip/[id].tsx
    router.navigate(`/trip/${trip.id}` as any);
  };

  const originTimeZone = getTimeZone(trip.origin.address);
  const destinationTimeZone = getTimeZone(trip.destination.address);

  const renderStatus = () => {
    if (tabType === 'active') {
      return trip.confirmed ? (
        <Text style={styles.confirmedText}>Confirmed Load</Text>
      ) : (
        <Text style={styles.notConfirmedText}>Not Confirmed</Text>
      );
    } else if (tabType === 'processing') {
      return <Text style={styles.missingBOLText}>Missing BOL</Text>;
    } else if (tabType === 'completed') {
      return <Text style={styles.completedText}>Completed</Text>;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
      delayPressIn={200}
    >
      <View style={styles.header}>
        <Text style={styles.tripId}>Trip# {trip.id}</Text>
        {renderStatus()}
      </View>
      
      {/* Origin location */}
      <View style={styles.locationRow}>
        <Ionicons name="arrow-up" size={26} color="#F87171" style={styles.directionIcon} />
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>{trip.origin.address}</Text>
          <Text style={styles.dateTime}>{trip.origin.date} @ {trip.origin.time} ({originTimeZone})</Text>
        </View>
      </View>
      
      {/* Destination location */}
      <View style={styles.locationRow}>
        <Ionicons name="arrow-down" size={26} color="#60A5FA" style={styles.directionIcon} />
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>{trip.destination.address}</Text>
          <Text style={styles.dateTime}>{trip.destination.date} @ {trip.destination.time} ({destinationTimeZone})</Text>
        </View>
      </View>
      
      {/* Trip details */}
      <View style={styles.tripDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>TRIP</Text>
          <Text style={styles.detailValue}>{trip.details.trip}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>STOPS</Text>
          <Text style={styles.detailValue}>{trip.details.stops}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>WEIGHT</Text>
          <Text style={styles.detailValue}>{trip.details.weight}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.borderRadius.lg,
    marginBottom: AppTheme.spacing.md,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  header: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripId: {
    fontSize: AppTheme.fontSize.lg,
    fontWeight: '600',
    color: AppTheme.colors.text,
  },
  confirmedText: {
    fontSize: AppTheme.fontSize.sm,
    fontWeight: '700',
    color: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 12,
  },
  notConfirmedText: {
    fontSize: AppTheme.fontSize.sm,
    fontWeight: '700',
    color: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
  },
  missingBOLText: {
    fontSize: AppTheme.fontSize.sm,
    fontWeight: '700',
    color: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 12,
  },
  completedText: {
    fontSize: AppTheme.fontSize.sm,
    fontWeight: '700',
    color: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  directionIcon: {
    width: 32,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    fontSize: AppTheme.fontSize.md,
    fontWeight: '500',
    color: AppTheme.colors.text,
  },
  dateTime: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    marginBottom: 2,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: AppTheme.colors.border,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: AppTheme.fontSize.sm,
    color: AppTheme.colors.text,
    marginBottom: 2,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    fontWeight: '500',
  },
}); 