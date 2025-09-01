import { StyleSheet } from 'react-native';
import { AppTheme } from './AppTheme';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: AppTheme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: AppTheme.spacing.xxl * 1.5,
  },
  title: {
    color: AppTheme.colors.primary,
    marginTop: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.xs,
  },
  subtitle: {
    color: AppTheme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: AppTheme.spacing.xxl,
  },
  loginButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: AppTheme.borderRadius.lg,
    paddingVertical: AppTheme.spacing.md + 2,
    alignItems: 'center',
    marginTop: AppTheme.spacing.md,
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: AppTheme.colors.inactive,
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    color: 'white',
    fontSize: AppTheme.fontSize.lg,
    fontWeight: '600',
  },
  generalError: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: AppTheme.colors.error,
    borderRadius: AppTheme.borderRadius.md,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.md,
  },
  generalErrorText: {
    color: AppTheme.colors.error,
    fontSize: AppTheme.fontSize.sm,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: AppTheme.spacing.xl,
  },
  footerText: {
    fontSize: AppTheme.fontSize.sm,
    color: AppTheme.colors.textSecondary,
    textAlign: 'center',
  },
});