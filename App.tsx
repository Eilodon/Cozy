import React, { useState, useEffect } from 'react';
import { Scene } from './rendering/Scene';
import { HUD } from './ux/HUD';
import { initPostHog } from './observability/posthog';
import { preloadAssets } from './rendering/AssetLoader';

// Initialize observability
initPostHog();

// Preload assets early
preloadAssets();

const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Simulate initial critical asset handshake or authentication
    const t = setTimeout(() => setReady(true), 500); 
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white font-mono">
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p>BOOTING FORTRESS OS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Scene />
      <HUD />
    </div>
  );
};

export default App;