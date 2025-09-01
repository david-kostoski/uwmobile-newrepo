import { getEnvironmentConfig } from '@/constants/Environment';
import type { LoginCredentials, AuthToken, ApiError } from '@/types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthToken> {
    try {
      const { apiUrl } = getEnvironmentConfig();
      const response = await fetch(`${apiUrl}/token/generate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || 'Invalid username or password',
          status: response.status,
        } as ApiError;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          message: 'Unable to connect to server. Please check your connection.',
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }
}