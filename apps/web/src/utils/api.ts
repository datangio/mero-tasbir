const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id: string;
      email: string;
      username: string;
      fullName: string;
      address: string;
      userType: 'user' | 'freelancer';
      isEmailVerified: boolean;
      createdAt: string;
      updatedAt: string;
    };
    token?: string;
    expiresIn?: number;
  };
  error?: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    expiresIn: number;
  };
  error?: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    isVerified: boolean;
  };
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async sendVerificationEmail(email: string): Promise<OtpResponse> {
    return this.request<OtpResponse>('/auth/send-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTP(email: string, otp: string): Promise<VerificationResponse> {
    return this.request<VerificationResponse>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async createUserAccount(userData: {
    email: string;
    username: string;
    fullName: string;
    address: string;
    password: string;
    confirmPassword: string;
    userType: 'user' | 'freelancer';
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async loginUser(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async resendOTP(email: string): Promise<OtpResponse> {
    return this.request<OtpResponse>('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
