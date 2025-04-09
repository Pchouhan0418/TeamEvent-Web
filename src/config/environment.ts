import axios from 'axios';

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

// API Base URL
const API_URL = import.meta.env.DEV 
  ? '/api/Event'  
  : 'http://asifghafoor-001-site12.ntempurl.com/api/Event';  

// API Endpoints
const API_ENDPOINTS = {
  createEvent: '/CreateEvent',
  getAllEvents: '/GetAllEvents'
};


const environmentConfig: EnvironmentConfig = {
  apiUrl: API_URL,
  apiEndpoints: API_ENDPOINTS,
};


export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Tenant-ID': '123e4567-e89b-12d3-a456-426614174001', 
  },
  withCredentials: false,
});

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
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Tenant-ID': '123e4567-e89b-12d3-a456-426614174001', 
    },
  };
};

export const config = environmentConfig; 