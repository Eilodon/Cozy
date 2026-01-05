import React from 'react';
import { useStore } from '../core/store';
import { QualityTier } from '../types';

export const HUD = () => {
  const { fps, qualityTier, score, zombieCount, downgradeQuality, setQualityLocked, qualityLocked } = useStore();

  const getTierColor = (tier: QualityTier) => {
    switch(tier) {
        case QualityTier.HIGH: return 'text-green-400';
        case QualityTier.MEDIUM: return 'text-blue-400';
        case QualityTier.LOW: return 'text-yellow-400';
        case QualityTier.POTATO: return 'text-red-400';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 safe-area-inset">
      
      {/* Top Bar: Stats */}
      <div className="flex justify-between items-start">
        <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-white font-mono text-xs md:text-sm pointer-events-auto">
          <div className="flex gap-4">
            <div>
               <span className="text-gray-400">FPS:</span> <span className={fps < 30 ? 'text-red-500' : 'text-white'}>{fps}</span>
            </div>
            <div>
               <span className="text-gray-400">QUAL:</span> <span className={`${getTierColor(qualityTier)} font-bold`}>{qualityTier}</span>
            </div>
            <div>
                <span className="text-gray-400">ZOM:</span> {zombieCount}
            </div>
          </div>
          
          <div className="mt-2 flex gap-2">
            <button 
                onClick={() => setQualityLocked(!qualityLocked)}
                className={`px-2 py-1 rounded border ${qualityLocked ? 'bg-red-900/50 border-red-500' : 'bg-gray-700 border-gray-600'} hover:bg-gray-600 transition`}
            >
                {qualityLocked ? 'UNLOCK' : 'LOCK'}
            </button>
            <button 
                onClick={downgradeQuality}
                className="px-2 py-1 rounded border border-gray-600 hover:bg-gray-700 transition"
            >
                DOWNGRADE
            </button>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg text-white">
            <h1 className="font-bold text-xl tracking-tighter">WANDERING FORTRESS</h1>
            <div className="text-right text-yellow-400 font-mono">SCORE: {score}</div>
        </div>
      </div>

      {/* Bottom Bar: Interactions */}
      <div className="flex justify-center pb-8 pointer-events-auto">
         <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform">
            SCAVENGE
         </button>
      </div>
    </div>
  );
};