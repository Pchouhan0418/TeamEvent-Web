import { type Event as EventType, Attendee } from '../types/event';
import { apiClient } from '../config/environment';

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

      const response = await apiClient.post<ApiEventResponse>('/CreateEvent', apiRequest);

      // Transform the API response back to our Event format
      const newEvent: EventType = {
        id: response.data.id,
        name: response.data.name,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        venue: response.data.venue,
        attendees: response.data.attendeesList || [],
      };

      // Add to local cache
      events.push(newEvent);

      console.log(`Event created successfully: ${newEvent.name}`);
      console.log(`Email notifications would be sent to ${newEvent.attendees.length} attendees`);

      return newEvent;
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
      const response = await apiClient.get<ApiGetEventsResponse>('/GetAllEvents');

      if (response.data.error) {
        throw new Error(`API returned an error: ${response.data.message}`);
      }

      // Map API response to our Event format
      events = response.data.data.map((eventData: ApiEventResponse) => ({
        id: eventData.id,
        name: eventData.name,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        venue: eventData.venue,
        attendees: eventData.attendeesList || [],
      }));

      return events;
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