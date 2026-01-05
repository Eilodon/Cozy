export enum QualityTier {
  HIGH = 'HIGH',       // 60FPS, Shadows, Particles, Post-processing
  MEDIUM = 'MEDIUM',   // 60FPS, No Shadows, Reduced Particles
  LOW = 'LOW',         // 60FPS, Basic Lighting, No Particles
  POTATO = 'POTATO'    // 30FPS Cap, Low Res, Minimal shaders
}

export interface AppState {
  qualityTier: QualityTier;
  fps: number;
  setFps: (fps: number) => void;
  downgradeQuality: () => void;
  qualityLocked: boolean;
  setQualityLocked: (locked: boolean) => void;
  
  // Game State
  score: number;
  zombieCount: number;
  addZombie: () => void;
}

export interface PerformanceMetrics {
  avgFps: number;
  low1Percent: number;
}