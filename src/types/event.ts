export interface Attendee {
  name: string;
  email: string;
}

export interface Event {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  venue: string;
  attendees: Attendee[];
}
