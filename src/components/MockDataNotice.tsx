import { useState, useEffect } from 'react';

/**
 * A component that displays a notice when the app is using mock data
 */
const MockDataNotice = () => {
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    // Check if we're using mock data (set by eventService)
    const checkMockData = () => {
      const usingMock = window.localStorage.getItem('using_mock_data') === 'true';
      setUsingMockData(usingMock);
    };

    // Listen for changes to mock data flag
    window.addEventListener('storage', checkMockData);
    
    // Check initially
    checkMockData();

    return () => {
      window.removeEventListener('storage', checkMockData);
    };
  }, []);

  if (!usingMockData) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 text-yellow-800 p-2 text-center text-sm">
      <p>
        <strong>Notice:</strong> Using demo data due to API connectivity issues. 
        Your changes won't be saved to the server.
      </p>
    </div>
  );
};

export default MockDataNotice; 