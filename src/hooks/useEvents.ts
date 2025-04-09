import { useState, useEffect, useCallback } from 'react';
import { Event } from '../types/event';
import { eventService } from '../services/eventService';

/**
 * Custom hook for managing events
 * @returns Event management functions and state
 */
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load all events from the API
   */
  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedEvents = await eventService.getEvents();
      setEvents(loadedEvents);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Add a new event
   * @param newEvent - Event data to add
   * @returns True if successful
   */
  const addEvent = useCallback(async (newEvent: Omit<Event, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.createEvent(newEvent);
      await loadEvents();
      return true;
    } catch (err) {
      console.error('Failed to create event:', err);
      setError('Failed to create event. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadEvents]);

  // Load events on initial mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    addEvent,
    refreshEvents: loadEvents,
    clearError: () => setError(null),
  };
};

export default useEvents; 