import React, { useState } from 'react';
import { Event, Attendee } from '../types/event';
import AttendeeInput from './AttendeeInput';
import { isValidEmail } from '../utils/validation';
import { validateEventForm } from '../utils/validation';

interface EventFormProps {
  addEvent: (newEvent: Omit<Event, 'id'>) => Promise<boolean>;
}

const EventForm: React.FC<EventFormProps> = ({ addEvent }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venue, setVenue] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeePage, setAttendeePage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const itemsPerPage = 3;
  const startIndex = attendeePage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAttendees = attendees.slice(startIndex, endIndex);
  const totalPages = Math.ceil(attendees.length / itemsPerPage);

  const handleAddAttendee = () => {
    if (attendeeName && attendeeEmail) {
      if (!isValidEmail(attendeeEmail)) {
        setValidationError('Please enter a valid email address for the attendee.');
        return;
      }
      const newAttendee: Attendee = { name: attendeeName, email: attendeeEmail };
      setAttendees([...attendees, newAttendee]);
      setAttendeeName('');
      setAttendeeEmail('');
      setValidationError(null);
      // Reset to the first page after adding a new attendee
      setAttendeePage(0);
    } else {
      setValidationError('Please enter both name and email for the attendee.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    const validation = validateEventForm(
      name,
      startTime,
      endTime,
      venue,
      attendees.length
    );
    
    if (!validation.isValid) {
      setValidationError(validation.errorMessage || 'Invalid form data');
      return;
    }
    
    const newEvent: Omit<Event, 'id'> = {
      name,
      startTime,
      endTime,
      venue,
      attendees,
    };

    try {
      setSubmitting(true);
      setValidationError(null);
      const success = await addEvent(newEvent);
      
      if (success) {
        // Clear form fields after successful submission
        setName('');
        setStartTime('');
        setEndTime('');
        setVenue('');
        setAttendees([]);
        setAttendeePage(0);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setValidationError('Failed to create the event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-lg text-white"
    >
      <h2 className="text-2xl font-semibold mb-4">Create a New Event</h2>

      {validationError && (
        <div className="mb-4 p-3 rounded bg-red-500/40 text-white backdrop-blur-sm">
          {validationError}
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium mb-1">Event Name:</label>
        <input
          type="text"
          className="w-full border border-white/20 bg-transparent p-2 rounded text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter event name"
          required
          disabled={submitting}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Start Time:</label>
        <input
          type="datetime-local"
          className="w-full border border-white/20 bg-transparent p-2 rounded text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          disabled={submitting}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">End Time:</label>
        <input
          type="datetime-local"
          className="w-full border border-white/20 bg-transparent p-2 rounded text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          disabled={submitting}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Venue:</label>
        <input
          type="text"
          className="w-full border border-white/20 bg-transparent p-2 rounded text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="Enter venue"
          required
          disabled={submitting}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Attendees</h3>
        {/* Row container for Attendee input and Add button */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <AttendeeInput
              attendeeName={attendeeName}
              attendeeEmail={attendeeEmail}
              setAttendeeName={setAttendeeName}
              setAttendeeEmail={setAttendeeEmail}
              disabled={submitting}
            />
          </div>
          <button
            type="button"
            onClick={handleAddAttendee}
            className="bg-blue-500/60 bg-gradient-to-r from-blue-500/70 to-indigo-500/70 backdrop-blur-sm text-white px-3 py-2 rounded flex items-center cursor-pointer hover:bg-blue-600/70 transition-colors disabled:opacity-50 shadow-sm"
            disabled={submitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>

        {attendees.length > 0 && (
          <>
            {/* Table of Attendees with Rounded Corners */}
            <div className="mt-2 overflow-hidden rounded-lg border border-gray-300">
              <table className="w-full text-white">
                <thead className="bg-white/20">
                  <tr>
                    <th className="px-2 py-1 border-b border-gray-300 text-left">Name</th>
                    <th className="px-2 py-1 border-b border-gray-300 text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAttendees.map((att, index) => (
                    <tr key={startIndex + index}>
                      <td className="px-2 py-1 border-b border-gray-300">{att.name}</td>
                      <td className="px-2 py-1 border-b border-gray-300">{att.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {attendees.length > itemsPerPage && (
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setAttendeePage((prev) => Math.max(prev - 1, 0))}
                  disabled={attendeePage === 0 || submitting}
                  className="bg-black/30 hover:bg-black/40 text-white p-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendeePage((prev) => Math.min(prev + 1, totalPages - 1))}
                  disabled={attendeePage >= totalPages - 1 || submitting}
                  className="bg-black/30 hover:bg-black/40 text-white p-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-green-500/70 to-emerald-600/70 backdrop-blur-sm text-white px-4 py-3 rounded hover:from-green-500/80 hover:to-emerald-600/80 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-wait shadow-sm"
      >
        {submitting ? 'Creating Event...' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
