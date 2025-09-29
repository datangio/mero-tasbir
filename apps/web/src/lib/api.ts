// API configuration for the web application
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  BOOKINGS: `${API_BASE_URL}/api/v1/bookings`,
  EVENTS: `${API_BASE_URL}/api/v1/events`,
  HEALTH: `${API_BASE_URL}/api/v1/health`,
} as const;

export default API_BASE_URL;

