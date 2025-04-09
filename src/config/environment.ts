/**
 * Environment configuration for the application
 */

interface EnvironmentConfig {
  apiUrl: string;
  apiEndpoints: {
    createEvent: string;
    getAllEvents: string;
  };
}

// API Base URLs
const API_URLS = {
  DEVELOPMENT: '/api/Event',  // This will be proxied by Vite in development
  PRODUCTION: '/api/Event'  // Direct API URL in production
};

// API Endpoints
const API_ENDPOINTS = {
  createEvent: '/CreateEvent',
  getAllEvents: '/GetAllEvents'
};

// Determine if we're in development mode
const isDev = import.meta.env.MODE === 'development';

// Select the appropriate API URL based on environment
const selectedApiUrl = isDev ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION;

// Configuration for the current environment
const environmentConfig: EnvironmentConfig = {
  apiUrl: selectedApiUrl,
  apiEndpoints: API_ENDPOINTS,
};

/**
 * Get the full URL for an API endpoint
 * @param endpoint - The endpoint name from apiEndpoints
 * @returns The full URL for the endpoint
 */
export const getApiUrl = (endpoint: keyof EnvironmentConfig['apiEndpoints']): string => {
  return `${environmentConfig.apiUrl}${environmentConfig.apiEndpoints[endpoint]}`;
};

/**
 * Get the fetch options with CORS configuration
 * @returns Fetch options with CORS settings
 */
export const getFetchOptions = (): RequestInit => {
  return {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const config = environmentConfig; 