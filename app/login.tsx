import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemedInput from '@/components/ThemedInput';
import { AppTheme } from '@/constants/AppTheme';
import { loginStyles } from '@/constants/LoginStyles';
import { AuthService } from '@/services/authService';
import type { LoginCredentials, ApiError } from '@/types/auth';
import type { ValidationState } from '@/types/components';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username: ValidationState;
    password: ValidationState;
    general: string | null;
  }>({
    username: { isValid: true, error: null },
    password: { isValid: true, error: null },
    general: null,
  });
  const { login } = useAuth();

  const validateField = (field: 'username' | 'password', value: string): ValidationState => {
    if (field === 'username') {
      if (!value.trim()) {
        return { isValid: false, error: 'Username is required' };
      }
      if (value.trim().length < 3) {
        return { isValid: false, error: 'Username must be at least 3 characters' };
      }
    }
    
    if (field === 'password') {
      if (!value.trim()) {
        return { isValid: false, error: 'Password is required' };
      }
      if (value.length < 6) {
        return { isValid: false, error: 'Password must be at least 6 characters' };
      }
    }
    
    return { isValid: true, error: null };
  };

  const validateForm = (): boolean => {
    const usernameValidation = validateField('username', credentials.username);
    const passwordValidation = validateField('password', credentials.password);
    
    setErrors({
      username: usernameValidation,
      password: passwordValidation,
      general: null,
    });
    
    return usernameValidation.isValid && passwordValidation.isValid;
  };

  const handleInputChange = (field: 'username' | 'password', value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));

    if (errors[field].error) {
      const fieldValidation = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: fieldValidation,
        general: null,
      }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors(prev => ({ ...prev, general: null }));

    try {
      const authToken = await AuthService.login(credentials);
      await login(authToken.token);
    } catch (error) {
      const apiError = error as ApiError;
      setErrors(prev => ({
        ...prev,
        general: apiError.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <ThemedView style={loginStyles.content}>
        {/* Header */}
        <View style={loginStyles.header}>
          <SvgXml 
            xml={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="446.58667" height="139.85333" viewBox="0 0 446.58667 139.85333"><g transform="matrix(1.3333333,0,0,-1.3333333,0,139.85333)"><g transform="scale(0.1)"><path d="m 1021.91,410.91 c -1.7,-43.406 -22.597,-81.805 -54.601,-106.699 -21.903,17.102 -38.602,40.598 -47.403,67.598 -4.101,12.402 -6.601,25.5 -7.097,39.101 -0.098,1.192 -0.196,2.5 -0.098,3.692 -0.098,0.703 -0.098,1.406 -0.098,2.109 v 207.598 l -20.109,0.097 -42.899,0.098 h -0.402 l 27.207,21.601 90.899,72.2 0.695,0.605 90.206,-72.805 26.79,-21.601 1.11,-0.899 h -0.8 l -63.21,0.305 h -0.19 V 416.711 c 0,-0.703 0,-1.406 0.1,-2.109 0.09,-1.192 0,-2.5 -0.1,-3.692" fill="#3f9ad0"/><path d="m 1085.41,624.504 h -1.21 l -62.1,-0.195 V 416.711 c 0,-0.703 0,-1.406 -0.09,-2.109 0.09,-1.192 0,-2.5 -0.1,-3.692 -1.7,-43.406 -22.597,-81.805 -54.601,-106.699 -10.098,-8.008 -21.297,-14.609 -33.301,-19.609 -16.903,-6.993 -35.399,-10.789 -54.903,-10.789 -30.195,0 -58.203,9.296 -81.199,25.195 -37.297,25.703 -61.699,68.797 -61.699,117.703 V 561.508 H 845.504 V 416.711 c 0,-2 0.203,-3.906 0.605,-5.801 2.098,-12.801 11.504,-23.105 23.797,-26.504 2.903,-0.898 5.996,-1.297 9.199,-1.297 18,0 32.5,13.895 33.606,31.493 0.098,0.703 0.098,1.406 0.098,2.109 V 623.91 h -0.196 l -20.8,-0.097 -43.301,-0.208 1.093,0.899 26.805,21.601 90.195,72.805 0.704,-0.605 90.901,-72.2 27.2,-21.601" fill="#25285d"/><path d="M 1198.51,561.508 V 416.711 c 0,-79.102 -63.7,-142.898 -142.9,-142.898 -19.5,0 -38,3.796 -54.9,10.789 -3.206,1.308 -6.397,2.804 -9.405,4.308 28.505,23.496 47.605,57.801 51.005,96.797 4.1,-1.699 8.59,-2.598 13.3,-2.598 16.6,0 30.4,12 33,27.801 0.4,1.895 0.59,3.801 0.59,5.801 v 144.797 h 109.31" fill="#3f9ad0"/><path d="m 1400.82,561.781 v -95.754 c 0,-9.695 2.63,-17.234 7.91,-22.597 5.27,-5.36 12.42,-8.035 21.44,-8.035 9.02,0 16.17,2.675 21.45,8.035 5.27,5.363 7.91,12.902 7.91,22.597 v 95.754 h 37.03 v -95.754 c 0,-9.871 -1.62,-18.894 -4.85,-27.058 -3.24,-8.172 -7.75,-15.156 -13.53,-20.938 -5.8,-5.793 -12.77,-10.304 -20.94,-13.535 -8.18,-3.234 -17.21,-4.855 -27.07,-4.855 -9.88,0 -18.89,1.621 -27.07,4.855 -8.16,3.231 -15.16,7.742 -20.94,13.535 -5.78,5.782 -10.29,12.766 -13.53,20.938 -3.22,8.164 -4.85,17.187 -4.85,27.058 v 95.754 h 37.04" fill="#25285d"/><path d="m 1612.73,487.738 c 5.78,0 10.64,1.914 14.55,5.742 3.93,3.829 5.88,8.301 5.88,13.407 0,5.097 -1.95,9.574 -5.88,13.398 -3.91,3.828 -8.77,5.754 -14.55,5.754 h -25.53 v -38.301 z m 0,74.043 c 8.34,0 16,-1.406 22.99,-4.211 6.97,-2.812 13.01,-6.726 18.12,-11.746 5.1,-5.019 9.1,-10.851 11.99,-17.488 2.9,-6.645 4.36,-13.789 4.36,-21.449 0,-7.664 -1.46,-14.813 -4.36,-21.453 -2.89,-6.641 -6.89,-12.473 -11.99,-17.493 -5.11,-5.019 -11.15,-8.933 -18.12,-11.746 -6.99,-2.804 -14.65,-4.211 -22.99,-4.211 h -25.53 v -51.062 h -37.03 v 160.859 h 62.56" fill="#25285d"/><path d="m 1781.26,487.738 c 5.79,0 10.63,1.914 14.56,5.742 3.9,3.829 5.85,8.301 5.85,13.407 0,5.097 -1.95,9.574 -5.85,13.398 -3.93,3.828 -8.77,5.754 -14.56,5.754 h -25.54 v -38.301 z m 0,74.043 c 8.34,0 16,-1.406 22.97,-4.211 6.98,-2.812 13.03,-6.726 18.13,-11.746 5.12,-5.019 9.12,-10.851 12.01,-17.488 2.89,-6.645 4.34,-13.789 4.34,-21.449 0,-7.664 -1.45,-14.813 -4.34,-21.453 -2.89,-6.641 -6.89,-12.473 -12.01,-17.493 -5.1,-5.019 -11.15,-8.933 -18.13,-11.746 -6.97,-2.804 -14.63,-4.211 -22.97,-4.211 h -25.54 v -51.062 h -37.01 v 160.859 h 62.55" fill="#25285d"/><path d="m 1887.22,561.781 h 114.9 v -35.742 h -77.87 v -25.535 h 71.49 V 464.75 h -71.49 v -28.086 h 80.43 v -35.742 h -117.46 v 160.859" fill="#25285d"/><path d="m 2120.85,490.285 c 6.47,0 11.49,1.699 15.06,5.11 3.58,3.398 5.37,7.656 5.37,12.761 0,5.11 -1.79,9.367 -5.37,12.774 -3.57,3.398 -8.59,5.109 -15.06,5.109 h -28.08 v -35.754 z m 0,71.496 c 8.34,0 15.96,-1.367 22.86,-4.082 6.89,-2.726 12.81,-6.386 17.73,-10.988 4.94,-4.586 8.77,-10 11.5,-16.207 2.72,-6.211 4.09,-12.816 4.09,-19.789 0,-9.024 -1.59,-16.602 -4.73,-22.723 -3.14,-6.133 -6.64,-11.113 -10.47,-14.941 -3.83,-3.828 -8.98,-7.453 -15.45,-10.852 l 35.74,-61.277 h -40.84 l -29.37,53.625 h -19.14 v -53.625 h -37.03 v 160.859 h 65.11" fill="#25285d"/><path d="m 2311.11,517.113 -33.28,-116.191 h -13.97 l -49.88,160.832 h 21.84 l 35.64,-116.203 33.3,116.203 h 12.72 l 33.16,-116.203 35.78,116.203 h 21.68 l -49.75,-160.832 h -14.08 l -33.16,116.191" fill="#3f9ad0"/><path d="m 2469.29,458.391 h 53.62 l -26.8,70.195 z m 59.98,-17.95 h -66.33 l -15.35,-39.519 h -21.68 l 61.33,160.832 h 17.83 l 61.21,-160.832 h -21.68 l -15.33,39.519" fill="#3f9ad0"/><path d="m 2581.6,561.754 h 21.83 l 39.51,-76.555 39.54,76.555 h 21.81 l -51.11,-98.246 v -62.586 h -20.45 v 62.586 l -51.13,98.246" fill="#3f9ad0"/></g></g></svg>`}
            width={400} 
            height={124} 
          />
        </View>

        {/* Form */}
        <View style={loginStyles.form}>
          <ThemedInput
            leftIcon="person-outline"
            placeholder="Username"
            value={credentials.username}
            onChangeText={(value) => handleInputChange('username', value)}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
            error={errors.username.error}
            showError={!errors.username.isValid}
          />

          <ThemedInput
            leftIcon="lock-closed-outline"
            placeholder="Password"
            value={credentials.password}
            onChangeText={(value) => handleInputChange('password', value)}
            isPassword={true}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
            error={errors.password.error}
            showError={!errors.password.isValid}
          />

          {/* General error message for API/server errors */}
          {errors.general && (
            <View style={loginStyles.generalError}>
              <ThemedText style={loginStyles.generalErrorText}>
                {errors.general}
              </ThemedText>
            </View>
          )}

          <TouchableOpacity
            style={[loginStyles.loginButton, isLoading && loginStyles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <ThemedText style={loginStyles.loginButtonText}>Sign In</ThemedText>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={loginStyles.footer}>
          <ThemedText style={loginStyles.footerText}>

          </ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}