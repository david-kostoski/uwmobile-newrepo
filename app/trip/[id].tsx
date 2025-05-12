import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Pressable, Linking, Platform, Modal, TextInput, FlatList, Alert } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { AppTheme } from '@/constants/AppTheme';

// US time zones
const TIME_ZONES = ['EST', 'CST', 'MST', 'PST'];

// Helper function to determine time zone based on state abbreviation
const getTimeZone = (address: string): string => {
  if (address.includes('TX') || address.includes('IL') || address.includes('CO')) return 'CST';
  if (address.includes('PA') || address.includes('NY') || address.includes('GA')) return 'EST';
  if (address.includes('CA') || address.includes('WA') || address.includes('OR')) return 'PST';
  if (address.includes('AZ') || address.includes('UT')) return 'MST';
  return 'EST'; // Default
};

// Function to get the current date and time formatted
const getCurrentDateTime = () => {
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'short' });
  const day = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  
  return `${month} ${day}, ${year}, ${hours}:${minutes}`;
};

// Mock data for trip details
const tripDetails = {
  '1000077': {
    status: 'active',
    info: {
      equipment: '53\' Reefer',
      weight: '45000',
      temperature: '35 F Start-stop',
      miles: '835',
      stops: [
        {
          name: 'Pilgrims Pride',
          address: '7515 Sheridan Dr, Willowbrook, IL 60527',
          date: 'Jan 18, 2023, 16:00',
          checkInTime: 'Jan 18, 2023, 16:23',
          checkOutTime: 'Jan 18, 2023, 16:23',
        },
        {
          name: 'Pilgrims Pride',
          address: '7515 Sheridan Dr, Willowbrook, IL 60527',
          date: 'Jan 18, 2023, 16:00',
          checkInTime: 'Jan 18, 2023, 16:23',
          checkOutTime: 'Jan 18, 2023, 16:23',
        }
      ]
    },
    docs: [
      { id: '1', name: '206354 - 1', type: 'BOL' },
      { id: '2', name: '206354 - 2', type: 'RECEIPTS' }
    ],
    detention: [
      { 
        requestNo: '1001', 
        status: 'Open',
        stop: 'STOP 1 - Willowbrook, IL',
        checkInTime: 'Aug 5, 2023 - 08:26',
        checkOutTime: 'Aug 5, 2023 - 08:26',
        documents: [
          { id: '206354 - 1', uploadedOn: 'Aug 5 2023' }
        ]
      }
    ]
  },
  '1000078': {
    status: 'processing',
    info: {
      equipment: '48\' Flatbed',
      weight: '32000',
      temperature: 'N/A',
      miles: '795',
      stops: [
        {
          name: 'Distribution Center',
          address: '123 Main St, Dallas, TX 75201',
          date: 'Jul 2, 2022, 08:00',
          checkInTime: 'Jul 2, 2022, 08:30',
          checkOutTime: 'Jul 2, 2022, 10:45',
        }
      ]
    },
    docs: [
      { id: '1', name: '207890 - 1', type: 'POD' }
    ],
    detention: []
  }
};

// Define the type for tabs
type TabType = 'info' | 'docs' | 'detention';

// Add this interface definition at the top of the file, right after the type TabType definition
interface Document {
  id: string;
  name: string;
  type?: 'BOL' | 'RECEIPTS' | 'POD';
}

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [isLoadConfirmed, setIsLoadConfirmed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkType, setCheckType] = useState<'in' | 'out'>('in');
  const [currentStop, setCurrentStop] = useState<any>(null);
  const [checkTime, setCheckTime] = useState('');
  const [checkTimeZone, setCheckTimeZone] = useState('');
  const [timeZoneDropdownVisible, setTimeZoneDropdownVisible] = useState(false);
  
  // Get trip data or show error if not found
  const tripId = Array.isArray(id) ? id[0] : id;
  const [tripData, setTripData] = useState(tripDetails[tripId as keyof typeof tripDetails]);
  
  if (!tripData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerTitle}>Trip# {tripId}</Text>
          <View style={styles.headerRight} />
        </View>
        
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={AppTheme.colors.error} />
          <Text style={styles.errorText}>Trip not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Function to open address in Google Maps
  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = Platform.select({
      ios: `maps://maps.apple.com/?q=${encodedAddress}`,
      android: `https://maps.google.com/maps?q=${encodedAddress}`
    });
    
    if (mapUrl) {
      Linking.openURL(mapUrl).catch(err => 
        console.error('An error occurred opening maps:', err)
      );
    }
  };

  // Function to handle load confirmation
  const handleConfirmLoad = () => {
    setIsLoadConfirmed(true);
  };

  // Function to handle stop card click
  const handleStopCardClick = (stop: {
    name: string;
    address: string;
    date: string;
    checkInTime: string;
    checkOutTime: string;
  }) => {
    router.push({
      pathname: '/trip/stop-details',
      params: {
        name: stop.name,
        address: stop.address,
        date: stop.date,
      }
    });
  };

  // Function to handle check-in button press
  const handleCheckIn = (stop: any) => {
    setCheckType('in');
    setCurrentStop(stop);
    setCheckTime(getCurrentDateTime());
    setCheckTimeZone(getTimeZone(stop.address));
    setModalVisible(true);
  };

  // Function to handle check-out button press
  const handleCheckOut = (stop: any) => {
    setCheckType('out');
    setCurrentStop(stop);
    setCheckTime(getCurrentDateTime());
    setCheckTimeZone(getTimeZone(stop.address));
    setModalVisible(true);
  };

  // Function to save check time
  const saveCheckTime = () => {
    // Create a deep copy of the trip data
    const updatedTripData = JSON.parse(JSON.stringify(tripData));
    
    // Find the stop in the stops array
    const stopIndex = updatedTripData.info.stops.findIndex(
      (stop: any) => stop.name === currentStop.name && stop.address === currentStop.address
    );
    
    if (stopIndex !== -1) {
      // Update the appropriate time
      if (checkType === 'in') {
        updatedTripData.info.stops[stopIndex].checkInTime = checkTime;
      } else {
        updatedTripData.info.stops[stopIndex].checkOutTime = checkTime;
      }
      
      // Update trip data state
      setTripData(updatedTripData);
    }
    
    // Close the modal
    setModalVisible(false);
  };

  // Function to handle time zone selection
  const handleTimeZoneSelect = (zone: string) => {
    setCheckTimeZone(zone);
    setTimeZoneDropdownVisible(false);
  };

  const renderTabs = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'info' && styles.activeTab]} 
          onPress={() => setActiveTab('info')}
        >
          <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>INFO</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'docs' && styles.activeTab]} 
          onPress={() => setActiveTab('docs')}
        >
          <Text style={[styles.tabText, activeTab === 'docs' && styles.activeTabText]}>DOCS</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'detention' && styles.activeTab]} 
          onPress={() => setActiveTab('detention')}
        >
          <Text style={[styles.tabText, activeTab === 'detention' && styles.activeTabText]}>DETENTION</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderInfoTab = () => {
    const isActiveTrip = tripData.status === 'active';
    
    return (
      <ScrollView style={styles.tabContentContainer}>
        {isActiveTrip && (
          <TouchableOpacity 
            style={isLoadConfirmed ? styles.confirmedLoadButton : styles.confirmLoadButton}
            onPress={handleConfirmLoad}
            disabled={isLoadConfirmed}
          >
            {isLoadConfirmed ? (
              <View style={styles.confirmedContainer}>
                <Text style={styles.confirmedLoadButtonText}>LOAD CONFIRMED</Text>
                <Ionicons name="checkmark-circle" size={20} color="#22c55e" style={styles.checkmarkIcon} />
              </View>
            ) : (
              <Text style={styles.confirmLoadButtonText}>CONFIRM LOAD</Text>
            )}
          </TouchableOpacity>
        )}
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Equipment</Text>
            <Text style={styles.infoValue}>{tripData.info.equipment}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Temperature</Text>
            <Text style={styles.infoValue}>{tripData.info.temperature}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{tripData.info.weight}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Miles</Text>
            <Text style={styles.infoValue}>{tripData.info.miles}</Text>
          </View>
        </View>
        
        {tripData.info.stops.map((stop, index) => {
          const timeZone = getTimeZone(stop.address);
          return (
            <TouchableOpacity 
              key={index} 
              style={styles.stopCard}
              onPress={() => handleStopCardClick(stop)}
            >
              <View style={styles.stopHeader}>
                <View style={styles.stopHeaderLeft}>
                  <Text style={styles.stopNumber}>#{index + 1}</Text>
                  <Text style={styles.stopName}>{stop.name}</Text>
                </View>
                <TouchableOpacity onPress={() => openInMaps(stop.address)}>
                  <Ionicons name="location" size={20} color={AppTheme.colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.stopAddress}>{stop.address}</Text>
              <Text style={styles.stopDate}>{stop.date} ({timeZone})</Text>
              
              <View style={styles.checkButtons}>
                <View style={styles.checkButtonContainer}>
                  <TouchableOpacity 
                    style={styles.checkButton}
                    onPress={() => handleCheckIn(stop)}
                  >
                    <Text style={styles.checkButtonText}>Check in</Text>
                  </TouchableOpacity>
                  <Text style={styles.checkTime}>{stop.checkInTime} ({timeZone})</Text>
                </View>
                <View style={styles.checkButtonContainer}>
                  <TouchableOpacity 
                    style={styles.checkButton}
                    onPress={() => handleCheckOut(stop)}
                  >
                    <Text style={styles.checkButtonText}>Check out</Text>
                  </TouchableOpacity>
                  <Text style={styles.checkTime}>{stop.checkOutTime} ({timeZone})</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Check In/Out Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Check {checkType === 'in' ? 'In' : 'Out'} Time
                </Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color={AppTheme.colors.text} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalLabel}>Time:</Text>
              <TextInput
                style={styles.modalInput}
                value={checkTime}
                onChangeText={setCheckTime}
                placeholder="Enter time (e.g., Apr 15, 2023, 14:30)"
              />

              <Text style={styles.modalLabel}>Time Zone:</Text>
              <TouchableOpacity
                style={styles.timeZoneSelector}
                onPress={() => setTimeZoneDropdownVisible(!timeZoneDropdownVisible)}
              >
                <Text style={styles.timeZoneSelectorText}>{checkTimeZone}</Text>
                <Ionicons name="chevron-down" size={20} color={AppTheme.colors.text} />
              </TouchableOpacity>
              
              {/* Time Zone Dropdown */}
              {timeZoneDropdownVisible && (
                <View style={styles.timeZoneDropdown}>
                  {TIME_ZONES.map((zone) => (
                    <TouchableOpacity
                      key={zone}
                      style={[
                        styles.timeZoneOption,
                        zone === checkTimeZone && styles.timeZoneOptionSelected
                      ]}
                      onPress={() => handleTimeZoneSelect(zone)}
                    >
                      <Text 
                        style={[
                          styles.timeZoneOptionText,
                          zone === checkTimeZone && styles.timeZoneOptionTextSelected
                        ]}
                      >
                        {zone}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={saveCheckTime}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  };
  
  const renderDocsTab = () => {
    const handleAddDocuments = () => {
      // Simulate adding a document since we can't use ImagePicker
      Alert.alert(
        "Select Document Type",
        "Choose a document type to add",
        [
          {
            text: "BOL",
            onPress: () => addNewDocument('BOL')
          },
          {
            text: "RECEIPTS",
            onPress: () => addNewDocument('RECEIPTS')
          },
          {
            text: "POD",
            onPress: () => addNewDocument('POD')
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      );
    };
    
    const addNewDocument = (type: 'BOL' | 'RECEIPTS' | 'POD') => {
      // Simulate adding a new document
      const newDoc = {
        id: String(tripData.docs.length + 1),
        name: `Document ${tripData.docs.length + 1}`,
        type: type,
      };
      
      setTripData({
        ...tripData,
        docs: [...tripData.docs, newDoc]
      });
    };
    
    return (
      <ScrollView style={styles.tabContentContainer}>
        <TouchableOpacity style={styles.detentionRequestButton} onPress={handleAddDocuments}>
          <Text style={styles.detentionRequestButtonText}>ADD DOCUMENTS</Text>
        </TouchableOpacity>
        
        <View style={styles.docsContainer}>
          <View style={styles.docsHeaderRow}>
            <Text style={[styles.docsHeader, { flex: 3 }]}>Name</Text>
            <Text style={[styles.docsHeader, { flex: 2 }]}>Type</Text>
          </View>
          {tripData.docs.map((doc) => (
            <TouchableOpacity key={doc.id} style={styles.docItem}>
              <Text style={[styles.docName, { flex: 3 }]}>{doc.name}</Text>
              <Text style={[styles.docType, { flex: 2 }]}>{doc.type || 'BOL'}</Text>
              <Ionicons name="chevron-forward" size={20} color={AppTheme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  const renderDetentionTab = () => {
    const handleCreateDetentionRequest = () => {
      router.push({
        pathname: '/trip/detention-request',
        params: { tripId }
      });
    };
    
    return (
      <ScrollView style={styles.tabContentContainer}>
        <TouchableOpacity style={styles.detentionRequestButton} onPress={handleCreateDetentionRequest}>
          <Text style={styles.detentionRequestButtonText}>DETENTION REQUEST</Text>
        </TouchableOpacity>
        
        {tripData.detention.length > 0 ? (
          <View style={styles.detentionContainer}>
            <View style={styles.detentionHeader}>
              <Text style={styles.detentionHeaderText}>Request No.</Text>
              <Text style={styles.detentionHeaderText}>Status</Text>
            </View>
            {tripData.detention.map((item, index) => (
              <TouchableOpacity key={index} style={styles.detentionItem}>
                <Text style={styles.detentionRequestNo}>{item.requestNo}</Text>
                <Text style={styles.detentionStatus}>{item.status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={48} color={AppTheme.colors.inactive} />
            <Text style={styles.emptyText}>No detention requests</Text>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'info':
        return renderInfoTab();
      case 'docs':
        return renderDocsTab();
      case 'detention':
        return renderDetentionTab();
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable 
          onPress={() => {
            if (activeTab !== 'info') {
              // If we're not on the info tab, go back to the info tab instead of leaving the trip
              setActiveTab('info');
            } else {
              // Only go back to trips list if we're already on the info tab
              router.push('/');
            }
          }} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>{tripId}</Text>
        <View style={styles.headerRight} />
      </View>
      
      {renderTabs()}
      {renderTabContent()}
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
  confirmLoadButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmedLoadButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  confirmLoadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  confirmedLoadButtonText: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  confirmedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkIcon: {
    marginLeft: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppTheme.spacing.xl,
  },
  errorText: {
    fontSize: AppTheme.fontSize.xl,
    color: AppTheme.colors.error,
    marginTop: AppTheme.spacing.md,
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
    borderBottomColor: AppTheme.colors.primary,
  },
  tabText: {
    fontSize: AppTheme.fontSize.md,
    fontWeight: '600',
    color: AppTheme.colors.textSecondary,
  },
  activeTabText: {
    color: AppTheme.colors.primary,
    fontWeight: '700',
  },
  tabContentContainer: {
    flex: 1,
    padding: AppTheme.spacing.md,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: AppTheme.spacing.lg,
  },
  infoItem: {
    width: '50%',
    paddingVertical: AppTheme.spacing.md,
    paddingHorizontal: AppTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  infoLabel: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.xs,
  },
  infoValue: {
    fontSize: AppTheme.fontSize.lg,
    fontWeight: '600',
    color: AppTheme.colors.text,
  },
  stopCard: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.borderRadius.lg,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.sm,
  },
  stopHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopNumber: {
    fontSize: AppTheme.fontSize.md,
    fontWeight: '700',
    color: AppTheme.colors.primary,
    marginRight: AppTheme.spacing.sm,
  },
  stopName: {
    fontSize: AppTheme.fontSize.lg,
    fontWeight: '700',
    color: AppTheme.colors.text,
  },
  stopAddress: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.xs,
  },
  stopDate: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.md,
  },
  checkButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkButtonContainer: {
    width: '48%',
  },
  checkButton: {
    backgroundColor: '#0077b6',
    borderRadius: AppTheme.borderRadius.md,
    paddingVertical: AppTheme.spacing.sm,
    alignItems: 'center',
    marginBottom: AppTheme.spacing.xs,
  },
  checkButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  checkTime: {
    textAlign: 'center',
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  docsContainer: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.borderRadius.lg,
    overflow: 'hidden',
  },
  docsHeaderRow: {
    flexDirection: 'row',
    backgroundColor: AppTheme.colors.background,
    paddingRight: AppTheme.spacing.md,
  },
  docsHeader: {
    paddingVertical: AppTheme.spacing.sm,
    paddingHorizontal: AppTheme.spacing.md,
    backgroundColor: AppTheme.colors.background,
    color: AppTheme.colors.textSecondary,
    fontSize: AppTheme.fontSize.sm,
    fontWeight: '600',
  },
  docItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: AppTheme.spacing.md,
    paddingHorizontal: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  docName: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  docType: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.textSecondary,
  },
  detentionContainer: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.borderRadius.lg,
    overflow: 'hidden',
    marginTop: AppTheme.spacing.md,
  },
  detentionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: AppTheme.spacing.md,
    backgroundColor: AppTheme.colors.background,
  },
  detentionHeaderText: {
    color: AppTheme.colors.textSecondary,
    fontSize: AppTheme.fontSize.sm,
    fontWeight: '600',
  },
  detentionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  detentionRequestNo: {
    fontSize: AppTheme.fontSize.md,
    fontWeight: '600',
    color: AppTheme.colors.text,
  },
  detentionStatus: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: AppTheme.spacing.xxl,
  },
  emptyText: {
    marginTop: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.lg,
    fontSize: AppTheme.fontSize.lg,
    color: AppTheme.colors.textSecondary,
  },
  addButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingVertical: AppTheme.spacing.md,
    paddingHorizontal: AppTheme.spacing.lg,
    borderRadius: AppTheme.borderRadius.md,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: AppTheme.fontSize.md,
  },
  detentionRequestButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingVertical: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.md,
    alignItems: 'center',
    marginBottom: AppTheme.spacing.md,
  },
  detentionRequestButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: AppTheme.fontSize.md,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppTheme.colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: AppTheme.colors.text,
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: AppTheme.colors.textSecondary,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  timeZoneSelector: {
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeZoneSelectorText: {
    fontSize: 16,
    color: AppTheme.colors.text,
  },
  timeZoneDropdown: {
    marginTop: -12,
    marginBottom: 16,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: AppTheme.colors.border,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  timeZoneOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  timeZoneOptionSelected: {
    backgroundColor: AppTheme.colors.primary + '20', // 20% opacity
  },
  timeZoneOptionText: {
    fontSize: 16,
    color: AppTheme.colors.text,
  },
  timeZoneOptionTextSelected: {
    fontWeight: '600',
    color: AppTheme.colors.primary,
  },
}); 