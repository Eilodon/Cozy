import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { World } from './World';
import { QualityController } from './QualityController';
import { useStore } from '../core/store';
import { QUALITY_CONFIG } from '../constants';

export const Scene = () => {
  const qualityTier = useStore((state) => state.qualityTier);
  const config = QUALITY_CONFIG[qualityTier];

  return (
    <div className="w-full h-full relative bg-gray-900">
      <Canvas
        shadows={config.shadows}
        dpr={[0.5, config.pixelRatio]} // Allow dynamic scaling down to 0.5
        camera={{ position: [0, 5, 10], fov: 50 }}
        gl={{ 
            antialias: false, // Performance boost
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
        }}
      >
        <Suspense fallback={null}>
          <World />
          <QualityController />
          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
      
      {/* Loading Overlay within strict bounds if needed, but App.tsx handles main loader */}
    </div>
  );
};