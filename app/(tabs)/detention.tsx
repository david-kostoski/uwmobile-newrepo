import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { AppTheme } from '@/constants/AppTheme';

// Mock data for detention requests
const detentionRequests = [
  { requestNo: '1001', amount: null, status: 'Open', tripId: '1000077' },
  { requestNo: '1001', amount: 76, status: 'Closed', tripId: '1000075' },
  { requestNo: '1001', amount: null, status: 'Open', tripId: '1000078' },
  { requestNo: '1001', amount: 0, status: 'Closed', tripId: '1000080' },
  { requestNo: '1001', amount: null, status: 'Open', tripId: '1000082' },
  { requestNo: '1001', amount: null, status: 'Open', tripId: '1000085' },
  { requestNo: '1001', amount: null, status: 'Open', tripId: '1000087' },
];

export default function DetentionScreen() {
  const handleRequestPress = (tripId: string) => {
    // Navigate to the specific trip's detention tab
    router.push({
      pathname: '/trip/[id]',
      params: { id: tripId }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DETENTION REQUESTS</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.columnHeader, styles.requestColumn]}>Request No.</Text>
          <Text style={[styles.columnHeader, styles.amountColumn]}>Amount</Text>
          <Text style={[styles.columnHeader, styles.statusColumn]}>Status</Text>
        </View>

        {/* Table Rows */}
        {detentionRequests.map((request, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.tableRow, 
              index % 2 === 0 ? styles.rowEven : styles.rowOdd
            ]}
            onPress={() => handleRequestPress(request.tripId)}
          >
            <Text style={[styles.cellText, styles.requestColumn]}>{request.requestNo}</Text>
            <Text style={[styles.cellText, styles.amountColumn]}>
              {request.amount !== null ? `$${request.amount}` : ''}
            </Text>
            <Text 
              style={[
                styles.cellText, 
                styles.statusColumn, 
                request.status === 'Open' ? styles.statusOpen : styles.statusClosed
              ]}
            >
              {request.status}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  filterButton: {
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: AppTheme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  columnHeader: {
    fontSize: AppTheme.fontSize.sm,
    fontWeight: '600',
    color: AppTheme.colors.textSecondary,
  },
  requestColumn: {
    flex: 1.5,
  },
  amountColumn: {
    flex: 1,
    textAlign: 'center',
  },
  statusColumn: {
    flex: 1,
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  rowEven: {
    backgroundColor: 'white',
  },
  rowOdd: {
    backgroundColor: '#f9fafb',
  },
  cellText: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  statusOpen: {
    fontWeight: '600',
  },
  statusClosed: {
    color: AppTheme.colors.textSecondary,
  },
}); 