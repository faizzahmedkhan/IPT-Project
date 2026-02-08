import { useState, useEffect } from 'react';
import { healthApi } from '@/lib/api';

interface BackendStatus {
  isConnected: boolean;
  message: string;
  timestamp: string | null;
  checking: boolean;
}

export function useBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>({
    isConnected: false,
    message: 'Checking backend connection...',
    timestamp: null,
    checking: true,
  });

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, checking: true }));
    try {
      const response = await healthApi.check();
      setStatus({
        isConnected: true,
        message: response.message,
        timestamp: response.timestamp,
        checking: false,
      });
    } catch (error) {
      setStatus({
        isConnected: false,
        message: 'Backend not connected',
        timestamp: null,
        checking: false,
      });
    }
  };

  useEffect(() => {
    checkConnection();
    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  return { ...status, refetch: checkConnection };
}
