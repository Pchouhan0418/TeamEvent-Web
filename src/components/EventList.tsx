import React, { useState, useEffect } from 'react';
import { Event } from '../types/event';
import AttendeeModal from './AttendeeModal';
import { formatDateTime } from '../utils/dateUtils';

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination settings
  const eventsPerPage = 3;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  
  const openAttendeeModal = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeAttendeeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Reset to first page when events list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [events.length]);

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-lg text-white h-[600px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      {events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <>
          <div className="space-y-4 min-h-[450px]">
            {currentEvents.map(event => (
              <div key={event.id} className="p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-lg">{event.name}</h3>
                <p className="mt-2">
                  <strong>Time: </strong>
                  {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
                </p>
                <p>
                  <strong>Venue: </strong>
                  {event.venue}
                </p>
                <div className="mt-3 flex items-center">
                  <span className="mr-2">
                    <strong>Attendees: </strong> 
                    {event.attendees ? event.attendees.length : 0}
                  </span>
                  <button 
                    onClick={() => openAttendeeModal(event)}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-all backdrop-blur-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Attendees
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all ${
                  currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30'
                }`}
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all ${
                  currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30'
                }`}
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Attendee Modal */}
      {selectedEvent && (
        <AttendeeModal 
          isOpen={modalOpen} 
          onClose={closeAttendeeModal} 
          attendees={selectedEvent.attendees || []} 
          eventName={selectedEvent.name}
        />
      )}
    </div>
  );
};

export default EventList;