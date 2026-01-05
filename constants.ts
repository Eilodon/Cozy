import { QualityTier } from './types';

export const QUALITY_CONFIG = {
  [QualityTier.HIGH]: {
    pixelRatio: 1.5, // Super-sampling on high end
    shadows: true,
    particles: 1000,
    physicsRate: 60,
    postProcessing: true
  },
  [QualityTier.MEDIUM]: {
    pixelRatio: 1,
    shadows: false,
    particles: 500,
    physicsRate: 60,
    postProcessing: false
  },
  [QualityTier.LOW]: {
    pixelRatio: 0.8, // Slight downscaling
    shadows: false,
    particles: 0,
    physicsRate: 30, // Tick physics slower
    postProcessing: false
  },
  [QualityTier.POTATO]: {
    pixelRatio: 0.6,
    shadows: false,
    particles: 0,
    physicsRate: 15,
    postProcessing: false
  }
};

// Thresholds for downgrading
export const FPS_THRESHOLD_DOWNGRADE = 45; // Below 45 FPS triggers downgrade check
export const EVALUATION_INTERVAL_MS = 3000; // Check every 3 seconds