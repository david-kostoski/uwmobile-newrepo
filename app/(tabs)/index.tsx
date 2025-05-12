import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { AppTheme } from '@/constants/AppTheme';
import TripCard from '@/components/TripCard';

// Mock data
const mockTrips: {
  active: Array<TripType>;
  processing: Array<TripType>;
  completed: Array<TripType>;
} = {
  active: [
    {
      id: '1000077',
      amount: 4500,
      confirmed: true,
      origin: {
        address: '609 S Grant St Amarillo, TX',
        date: 'Jun 28, 2022',
        time: '09:00'
      },
      destination: {
        address: '110 Keystone Blvd E Pottsville, PA',
        date: 'Jun 30, 2022',
        time: '13:00'
      },
      details: {
        deadhead: '585.81 mi',
        trip: '1620.6 mi',
        stops: 2,
        weight: '3200.0 lbs'
      }
    },
    {
      id: '1000078',
      amount: 3200,
      origin: {
        address: '210 Main St Dallas, TX',
        date: 'Jul 2, 2022',
        time: '08:00'
      },
      destination: {
        address: '450 Commerce Dr Atlanta, GA',
        date: 'Jul 3, 2022',
        time: '16:00'
      },
      details: {
        deadhead: '210.5 mi',
        trip: '795.3 mi',
        stops: 1,
        weight: '2800.0 lbs'
      }
    },
    {
      id: '1000079',
      amount: 3850,
      confirmed: true,
      origin: {
        address: '742 Industrial Way, Seattle, WA',
        date: 'Jul 4, 2022',
        time: '07:00'
      },
      destination: {
        address: '1550 Warehouse Blvd, Portland, OR',
        date: 'Jul 4, 2022',
        time: '15:30'
      },
      details: {
        deadhead: '175.2 mi',
        trip: '512.8 mi',
        stops: 1,
        weight: '2500.0 lbs'
      }
    },
    {
      id: '1000080',
      amount: 4100,
      origin: {
        address: '8200 Distribution Ave, Los Angeles, CA',
        date: 'Jul 6, 2022',
        time: '10:15'
      },
      destination: {
        address: '3175 Delivery Way, San Francisco, CA',
        date: 'Jul 7, 2022',
        time: '11:45'
      },
      details: {
        deadhead: '245.7 mi',
        trip: '958.2 mi',
        stops: 2,
        weight: '3100.0 lbs'
      }
    },
    {
      id: '1000081',
      amount: 5200,
      confirmed: true,
      origin: {
        address: '590 Shipping Plaza, Chicago, IL',
        date: 'Jul 8, 2022',
        time: '06:30'
      },
      destination: {
        address: '2275 Transport Rd, New York, NY',
        date: 'Jul 10, 2022',
        time: '14:00'
      },
      details: {
        deadhead: '325.6 mi',
        trip: '1462.3 mi',
        stops: 3,
        weight: '4200.0 lbs'
      }
    },
    {
      id: '1000082',
      amount: 3400,
      origin: {
        address: '1825 Market St, Denver, CO',
        date: 'Jul 12, 2022',
        time: '08:45'
      },
      destination: {
        address: '980 Logistics Pkwy, Salt Lake City, UT',
        date: 'Jul 13, 2022',
        time: '12:30'
      },
      details: {
        deadhead: '198.3 mi',
        trip: '745.9 mi',
        stops: 1,
        weight: '2850.0 lbs'
      }
    }
  ],
  processing: [
    {
      id: '1000075',
      amount: 3800,
      origin: {
        address: '800 Industrial Pkwy Houston, TX',
        date: 'Jun 20, 2022',
        time: '07:30'
      },
      destination: {
        address: '1200 Distribution Ave Chicago, IL',
        date: 'Jun 22, 2022',
        time: '14:00'
      },
      details: {
        deadhead: '320.4 mi',
        trip: '1080.2 mi',
        stops: 2,
        weight: '2950.0 lbs'
      }
    }
  ],
  completed: [
    {
      id: '1000070',
      amount: 4200,
      origin: {
        address: '150 Shipping Lane Miami, FL',
        date: 'Jun 10, 2022',
        time: '06:00'
      },
      destination: {
        address: '750 Delivery Rd New York, NY',
        date: 'Jun 12, 2022',
        time: '15:00'
      },
      details: {
        deadhead: '405.2 mi',
        trip: '1290.8 mi',
        stops: 3,
        weight: '3500.0 lbs'
      }
    },
    {
      id: '1000068',
      amount: 3600,
      origin: {
        address: '300 Freight St Phoenix, AZ',
        date: 'Jun 5, 2022',
        time: '08:30'
      },
      destination: {
        address: '900 Cargo Ave Denver, CO',
        date: 'Jun 6, 2022',
        time: '17:00'
      },
      details: {
        deadhead: '280.6 mi',
        trip: '850.3 mi',
        stops: 1,
        weight: '2600.0 lbs'
      }
    }
  ]
};

// Define Trip Type
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

interface TripType {
  id: string;
  amount: number;
  confirmed?: boolean;
  origin: Location;
  destination: Location;
  details: TripDetails;
}

export default function TripsScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'processing' | 'completed'>('active');
  
  const renderTabs = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]} 
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>ACTIVE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'processing' && styles.activeTab]} 
          onPress={() => setActiveTab('processing')}
        >
          <Text style={[styles.tabText, activeTab === 'processing' && styles.activeTabText]}>PROCESSING</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]} 
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>COMPLETED</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderTrips = () => {
    const trips = mockTrips[activeTab];
    
    if (trips.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={AppTheme.colors.inactive} />
          <Text style={styles.emptyText}>No trips to display</Text>
        </View>
      );
    }
    
    return trips.map((trip: TripType) => (
      <TripCard key={trip.id} trip={trip} tabType={activeTab} />
    ));
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'TRIPS' }} />
      {renderTabs()}
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
        decelerationRate="normal"
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps="handled"
        overScrollMode="always"
        scrollToOverflowEnabled={true}
      >
        {renderTrips()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: AppTheme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: AppTheme.spacing.md,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: AppTheme.colors.accent,
  },
  tabText: {
    fontSize: AppTheme.fontSize.md,
    fontWeight: '600',
    color: AppTheme.colors.textSecondary,
  },
  activeTabText: {
    color: AppTheme.colors.accent,
    fontWeight: '700',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    padding: AppTheme.spacing.md,
    paddingBottom: 120, // Increase bottom padding even more for better scrolling
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: AppTheme.spacing.xxl,
  },
  emptyText: {
    marginTop: AppTheme.spacing.md,
    fontSize: AppTheme.fontSize.lg,
    color: AppTheme.colors.textSecondary,
  },
});
