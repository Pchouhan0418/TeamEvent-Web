# Team Event Planner

A modern web application for planning and managing team events. Built with React, TypeScript, and Tailwind CSS.

## Features

- Create events with name, start/end time, venue, and attendees
- View a list of all created events
- View attendees for each event
- Responsive design that works on mobile and desktop
- Beautiful glassmorphic UI with backdrop blur effects

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **API Integration**: Fetch API with proxy configuration for development
- **State Management**: React Hooks
- **Error Handling**: Custom error boundary and validation
- **Development**: Vite for fast development and building

## Project Structure

```
src/
├── components/        # UI components
├── config/            # Environment configuration
├── hooks/             # Custom React hooks
├── services/          # API services
├── types/             # TypeScript interfaces
├── utils/             # Utility functions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/team-event-planner.git
   ```

2. Navigate to the project directory
   ```
   cd team-event-planner
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the application for production:

```
npm run build
```

The built files will be in the `dist` directory.

## Project Design Decisions

### Folder Structure

The project uses a feature-based structure, organizing code by feature rather than by type. This makes it easier to add, modify, or remove features as the application grows.

### API Integration

The application uses a proxy configuration in Vite to avoid CORS issues during development. In production, you would need to configure your server to handle CORS or use an API gateway.

### Error Handling

The application includes:
- Component-level error boundaries to prevent entire app crashes
- Form validation with detailed error messages
- API error handling with user-friendly messages

### State Management

For this application size, React's built-in Context API and hooks provide sufficient state management. As the application grows, you might consider more robust state management solutions like Redux or Zustand.

## Further Improvements

- Add unit and integration tests
- Implement real authentication and authorization
- Add more advanced form validation
- Implement real-time updates with WebSockets
- Add offline support with service workers
- Improve accessibility

## License

This project is licensed under the MIT License - see the LICENSE file for details.
