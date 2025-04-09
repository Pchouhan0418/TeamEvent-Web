import React from 'react';
import { Attendee } from '../types/event';

interface AttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendees: Attendee[];
  eventName: string;
}

const AttendeeModal: React.FC<AttendeeModalProps> = ({ isOpen, onClose, attendees, eventName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[80vh] text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{eventName} - Attendees</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] pr-2">
          {attendees.length === 0 ? (
            <p>No attendees for this event.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-white/20">
                <tr>
                  <th className="text-left py-2 px-3 rounded-tl-lg">Name</th>
                  <th className="text-left py-2 px-3 rounded-tr-lg">Email</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                    <td className="py-2 px-3">{attendee.name}</td>
                    <td className="py-2 px-3">{attendee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeeModal; 