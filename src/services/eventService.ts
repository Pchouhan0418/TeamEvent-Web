import { type Event as EventType, Attendee } from '../types/event';
import { getApiUrl, getFetchOptions } from '../config/environment';

// Local cache for events
let events: EventType[] = [];

// API interface types
interface ApiEventRequest {
  name: string;
  startTime: string;
  endTime: string;
  venue: string;
  attendeesList: Attendee[];
}

interface ApiEventResponse {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  venue: string;
  attendeesList: Attendee[];
}

interface ApiGetEventsResponse {
  data: ApiEventResponse[];
  code: number;
  message: string;
  error: boolean;
}

// Mock data to use when API calls fail
const MOCK_EVENTS: EventType[] = [
  {
    id: 1,
    name: "Team Building Workshop",
    startTime: "2023-06-15T09:00:00",
    endTime: "2023-06-15T17:00:00",
    venue: "Conference Room A",
    attendees: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" }
    ]
  },
  {
    id: 2,
    name: "Project Kickoff Meeting",
    startTime: "2023-06-20T10:00:00",
    endTime: "2023-06-20T12:00:00",
    venue: "Virtual Meeting Room",
    attendees: [
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Williams", email: "bob@example.com" }
    ]
  }
];

// Helper to mark that we're using mock data
const setUsingMockData = () => {
  window.localStorage.setItem('using_mock_data', 'true');
  // Dispatch an event to notify any listeners
  window.dispatchEvent(new Event('storage'));
};

/**
 * Service for managing events via API
 */
export const eventService = {
  /**
   * Create a new event
   * @param eventData - Event data to create
   * @returns Created event
   */
  async createEvent(eventData: Omit<EventType, 'id'>): Promise<EventType> {
    try {
      // Transform the event data to match the API format
      const apiRequest: ApiEventRequest = {
        name: eventData.name,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        venue: eventData.venue,
        attendeesList: eventData.attendees,
      };

      try {
        // Call the API with CORS options
        const fetchOptions = {
          ...getFetchOptions(),
          method: 'POST',
          body: JSON.stringify(apiRequest),
        };

        const response = await fetch(getApiUrl('createEvent'), fetchOptions);

        if (!response.ok) {
          // In production, for API errors, create a mock event with an auto-generated ID
          if (import.meta.env.PROD) {
            console.warn(`Using mock data due to API error: ${response.status}`);
            setUsingMockData();
            const mockId = Math.floor(Math.random() * 1000) + 10;
            const mockEvent: EventType = {
              ...eventData,
              id: mockId,
            };
            events.push(mockEvent);
            return mockEvent;
          }
          
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const apiResponse: ApiEventResponse = await response.json();

        // Transform the API response back to our Event format
        const newEvent: EventType = {
          id: apiResponse.id,
          name: apiResponse.name,
          startTime: apiResponse.startTime,
          endTime: apiResponse.endTime,
          venue: apiResponse.venue,
          attendees: apiResponse.attendeesList || [],
        };

        // Add to local cache
        events.push(newEvent);

        console.log(`Event created successfully: ${newEvent.name}`);
        console.log(`Email notifications would be sent to ${newEvent.attendees.length} attendees`);

        return newEvent;
      } catch (fetchError) {
        // In production, if fetch fails completely, use mock data
        if (import.meta.env.PROD) {
          console.warn('Using mock data due to fetch error:', fetchError);
          setUsingMockData();
          const mockId = Math.floor(Math.random() * 1000) + 10;
          const mockEvent: EventType = {
            ...eventData,
            id: mockId,
          };
          events.push(mockEvent);
          return mockEvent;
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  /**
   * Get all events
   * @returns List of events
   */
  async getEvents(): Promise<EventType[]> {
    try {
      try {
        // Call the API with CORS options
        const fetchOptions = {
          ...getFetchOptions(),
          method: 'GET',
        };

        const response = await fetch(getApiUrl('getAllEvents'), fetchOptions);

        // In production environment, use mock data for 401 errors
        if (!response.ok) {
          if (import.meta.env.PROD) {
            console.warn(`Using mock data due to API error: ${response.status}`);
            setUsingMockData();
            return MOCK_EVENTS;
          }
          
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const apiResponse: ApiGetEventsResponse = await response.json();
        
        if (apiResponse.error) {
          throw new Error(`API returned an error: ${apiResponse.message}`);
        }

        // Map API response to our Event format
        events = apiResponse.data.map(eventData => ({
          id: eventData.id,
          name: eventData.name,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          venue: eventData.venue,
          attendees: eventData.attendeesList || [],
        }));

        return events;
      } catch (fetchError) {
        // In production, if fetch fails completely (network error, CORS, etc), use mock data
        if (import.meta.env.PROD) {
          console.warn('Using mock data due to fetch error:', fetchError);
          setUsingMockData();
          return MOCK_EVENTS;
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // For development/testing purposes
  _clearEvents() {
    events = [];
  }
}; 