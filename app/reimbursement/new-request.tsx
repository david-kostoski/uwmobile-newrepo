import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

import { AppTheme } from '@/constants/AppTheme';

export default function NewReimbursementRequestScreen() {
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptAttached, setReceiptAttached] = useState(false);

  const handleSubmit = () => {
    // In a real app, would submit the form data
    console.log({ merchant, date, amount, notes, receiptAttached });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>REIMBURSEMENT REQUEST</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Merchant</Text>
          <TextInput 
            style={styles.input}
            value={merchant}
            onChangeText={setMerchant}
            placeholder="Enter merchant name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <TextInput 
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="MM/DD/YYYY"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput 
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="$0.00"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Please scan your receipt</Text>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={() => setReceiptAttached(true)}
          >
            <Ionicons name="camera" size={24} color={AppTheme.colors.primary} />
            <Text style={styles.scanButtonText}>
              {receiptAttached ? 'Receipt attached' : 'Scan receipt'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput 
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add any additional details here..."
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
  scrollContainer: {
    flex: 1,
    padding: AppTheme.spacing.md,
  },
  formGroup: {
    marginBottom: AppTheme.spacing.lg,
  },
  label: {
    fontSize: AppTheme.fontSize.md,
    fontWeight: '600',
    marginBottom: AppTheme.spacing.sm,
    color: AppTheme.colors.text,
  },
  input: {
    backgroundColor: AppTheme.colors.card,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.borderRadius.md,
    paddingHorizontal: AppTheme.spacing.md,
    paddingVertical: AppTheme.spacing.md,
    fontSize: AppTheme.fontSize.md,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.card,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.borderRadius.md,
    paddingVertical: AppTheme.spacing.md,
  },
  scanButtonText: {
    marginLeft: AppTheme.spacing.sm,
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.primary,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingVertical: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.xxl,
  },
  submitButtonText: {
    color: 'white',
    fontSize: AppTheme.fontSize.lg,
    fontWeight: '600',
  },
}); 