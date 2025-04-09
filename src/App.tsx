import React from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import ErrorBoundary from './components/ErrorBoundary';
import useEvents from './hooks/useEvents';

/**
 * Main application component
 */
const App: React.FC = () => {
  // Use our custom hook for events management
  const { events, loading, error, addEvent, refreshEvents } = useEvents();

  return (
    <div className="min-h-screen container mx-auto p-4">
      <ErrorBoundary>
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Team Event Planner</h1>
        
        {error && (
          <div className="bg-red-500/80 text-white p-3 rounded-lg mb-4 text-center backdrop-blur-sm">
            <p className="mb-2">{error}</p>
            <button 
              onClick={refreshEvents} 
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-all backdrop-blur-sm"
            >
              Try Again
            </button>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 mt-12">
          {/* Create New Event Form */}
          <div className="flex-1">
            <ErrorBoundary>
              <EventForm addEvent={addEvent} />
            </ErrorBoundary>
          </div>
          {/* Events List */}
          <div className="flex-1">
            <ErrorBoundary>
              {loading && events.length === 0 ? (
                <div className="p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-lg text-white h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Loading events...</p>
                  </div>
                </div>
              ) : (
                <EventList events={events} />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
