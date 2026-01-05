import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../core/store';
import { FPS_THRESHOLD_DOWNGRADE, EVALUATION_INTERVAL_MS, QUALITY_CONFIG } from '../constants';

export const QualityController = () => {
  const setFps = useStore((state) => state.setFps);
  const downgradeQuality = useStore((state) => state.downgradeQuality);
  const qualityTier = useStore((state) => state.qualityTier);
  
  const frameCount = useRef(0);
  const timeAccumulator = useRef(0);
  const lastEvaluation = useRef(Date.now());
  const history = useRef<number[]>([]);

  useFrame((state, delta) => {
    // Basic FPS calculation
    frameCount.current++;
    timeAccumulator.current += delta;

    if (timeAccumulator.current >= 0.5) { // Update store every 0.5s for UI
      const currentFps = Math.round(frameCount.current / timeAccumulator.current);
      setFps(currentFps);
      
      // Store in history for evaluation
      history.current.push(currentFps);
      if (history.current.length > 10) history.current.shift();

      frameCount.current = 0;
      timeAccumulator.current = 0;
    }

    // Adaptive Logic
    const now = Date.now();
    if (now - lastEvaluation.current > EVALUATION_INTERVAL_MS) {
      const avgFps = history.current.reduce((a, b) => a + b, 0) / (history.current.length || 1);
      
      if (avgFps < FPS_THRESHOLD_DOWNGRADE) {
        downgradeQuality();
        // Reset history to give the new tier a chance to stabilize
        history.current = []; 
      }
      
      lastEvaluation.current = now;
    }
  });

  // Apply Pixel Ratio based on current tier
  const config = QUALITY_CONFIG[qualityTier];
  
  useEffect(() => {
    // We can access the canvas context via parent, but this component is inside Canvas
    // Using a side-effect here to log changes or trigger external systems
    console.log(`[Quality] Applied settings for ${qualityTier}:`, config);
  }, [qualityTier, config]);

  return null;
};