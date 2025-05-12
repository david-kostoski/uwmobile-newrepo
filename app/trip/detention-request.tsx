import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Pressable, TextInput } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppTheme } from '@/constants/AppTheme';
import CustomCheckbox from '@/components/CustomCheckbox';

export default function DetentionRequestScreen() {
  const { tripId } = useLocalSearchParams();
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState('Aug 5, 2023 - 08:26');
  const [checkOutTime, setCheckOutTime] = useState('Aug 5, 2023 - 08:26');
  const [note, setNote] = useState('');

  const stops = [
    { id: '1', name: 'STOP 1 - Willowbrook, IL' },
    { id: '2', name: 'STOP 2 - Willowbrook, IL' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>DETENTION REQUEST</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>FOR WHICH STOP IS THE REQUEST?</Text>
          
          {stops.map((stop) => (
            <View key={stop.id} style={styles.checkboxRow}>
              <CustomCheckbox
                checked={selectedStop === stop.id}
                onPress={() => setSelectedStop(stop.id)}
              />
              <Text style={styles.checkboxLabel}>{stop.name}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>WHAT TIME YOU CHECKED IN?</Text>
          <Text style={styles.timeText}>{checkInTime}</Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>WHAT TIME YOU CHECKED OUT?</Text>
          <Text style={styles.timeText}>{checkOutTime}</Text>
        </View>
        
        <View style={styles.instructionSection}>
          <Text style={styles.instructionText}>
            Time in and time out must be marked on the BOL.{'\n'}
            Please upload a BOL copy with time in and time out on it.
          </Text>
        </View>
        
        <View style={styles.documentsSection}>
          <View style={styles.documentHeaderContainer}>
            <View style={styles.documentHeader}>
              <Text style={styles.documentHeaderText}>Name</Text>
              <Text style={styles.documentHeaderText}>Uploaded on</Text>
            </View>
          </View>
          
          <View style={styles.documentItem}>
            <Text style={styles.documentName}>206354 - 1</Text>
            <Text style={styles.documentDate}>Aug 5 2023</Text>
          </View>
          
          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="cloud-upload-outline" size={20} color="white" style={styles.uploadIcon} />
            <Text style={styles.uploadButtonText}>Upload Document</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.notesInput}
              multiline
              placeholder="Add your notes here..."
              value={note}
              onChangeText={setNote}
              textAlignVertical="top"
            />
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
  formSection: {
    marginBottom: AppTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: AppTheme.fontSize.md,
    fontWeight: '700',
    marginBottom: AppTheme.spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.md,
  },
  checkboxLabel: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    marginLeft: AppTheme.spacing.md,
  },
  timeText: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  instructionSection: {
    backgroundColor: AppTheme.colors.background,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: AppTheme.colors.warning,
  },
  instructionText: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    lineHeight: 24,
  },
  documentsSection: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: AppTheme.spacing.lg,
    position: 'relative',
  },
  documentHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.background,
  },
  documentHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: AppTheme.spacing.md,
    backgroundColor: AppTheme.colors.background,
  },
  documentHeaderText: {
    fontSize: AppTheme.fontSize.sm,
    color: AppTheme.colors.textSecondary,
    fontWeight: '600',
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  documentName: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  documentDate: {
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.primary,
    padding: AppTheme.spacing.md,
    margin: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.md,
  },
  uploadIcon: {
    marginRight: AppTheme.spacing.sm,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: AppTheme.fontSize.md,
  },
  notesContainer: {
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.borderRadius.md,
    padding: AppTheme.spacing.md,
  },
  notesInput: {
    flex: 1,
    fontSize: AppTheme.fontSize.md,
    color: AppTheme.colors.text,
    minHeight: 120,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: AppTheme.spacing.xxl,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.md,
    marginRight: AppTheme.spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: AppTheme.colors.text,
    fontWeight: '600',
    fontSize: AppTheme.fontSize.md,
  },
  submitButton: {
    flex: 1,
    backgroundColor: AppTheme.colors.primary,
    padding: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.md,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: AppTheme.fontSize.md,
  },
}); 