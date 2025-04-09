import React from 'react';

interface AttendeeInputProps {
  attendeeName: string;
  attendeeEmail: string;
  setAttendeeName: (name: string) => void;
  setAttendeeEmail: (email: string) => void;
  disabled?: boolean;
}

const AttendeeInput: React.FC<AttendeeInputProps> = ({
  attendeeName,
  attendeeEmail,
  setAttendeeName,
  setAttendeeEmail,
  disabled = false,
}) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Name"
        value={attendeeName}
        onChange={e => setAttendeeName(e.target.value)}
        className="border border-white/20 p-2 rounded w-1/2 bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
        disabled={disabled}
      />
      <input
        type="email"
        placeholder="Email"
        value={attendeeEmail}
        onChange={e => setAttendeeEmail(e.target.value)}
        className="border border-white/20 p-2 rounded w-1/2 bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
        disabled={disabled}
      />
    </div>
  );
};

export default AttendeeInput;
