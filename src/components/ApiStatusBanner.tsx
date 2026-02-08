import { useState, useEffect } from 'react';
import { useBackendStatus } from '@/hooks/useBackendStatus';
import { Server, ServerOff, RefreshCw, X } from 'lucide-react';

const ApiStatusBanner = () => {
  const { isConnected, message, timestamp, checking, refetch } = useBackendStatus();
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-hide after 5 seconds when connected
  useEffect(() => {
    if (isConnected && !hasInteracted) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, hasInteracted]);

  // Show again when status changes
  useEffect(() => {
    setIsVisible(true);
  }, [isConnected]);

  const handleClick = () => {
    setHasInteracted(true);
    refetch();
  };

  if (!isVisible && isConnected) {
    return (
      <button
        onClick={() => { setIsVisible(true); setHasInteracted(true); }}
        className="fixed bottom-4 right-4 z-50 w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg hover:scale-150 transition-transform"
        title="Backend connected - Click to show status"
      />
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${
      isConnected 
        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
        : 'bg-red-500/10 border-red-500/30 text-red-400'
    }`}>
      <div className="flex items-center gap-2">
        {checking ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : isConnected ? (
          <Server className="w-4 h-4" />
        ) : (
          <ServerOff className="w-4 h-4" />
        )}
        <div className="flex flex-col">
          <span className="text-xs font-semibold">
            {isConnected ? 'Backend Connected' : 'Backend Offline'}
          </span>
          <span className="text-[10px] opacity-70">
            {checking ? 'Checking...' : isConnected ? `Port 5001 • ${new Date(timestamp!).toLocaleTimeString()}` : 'Start: cd backend && npm run dev'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button 
          onClick={handleClick}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="Refresh connection"
        >
          <RefreshCw className={`w-3 h-3 ${checking ? 'animate-spin' : ''}`} />
        </button>
        {isConnected && (
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Hide"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ApiStatusBanner;
