import { create } from 'zustand';
import { QualityTier, AppState } from '../types';
import { trackEvent } from '../observability/posthog';

export const useStore = create<AppState>((set, get) => ({
  qualityTier: QualityTier.HIGH, // Default start high, adapt down
  fps: 60,
  qualityLocked: false,
  score: 0,
  zombieCount: 10,

  setFps: (fps: number) => set({ fps }),
  
  setQualityLocked: (locked: boolean) => set({ qualityLocked: locked }),

  downgradeQuality: () => {
    const { qualityTier, qualityLocked } = get();
    if (qualityLocked) return;

    let nextTier = qualityTier;
    switch (qualityTier) {
      case QualityTier.HIGH: nextTier = QualityTier.MEDIUM; break;
      case QualityTier.MEDIUM: nextTier = QualityTier.LOW; break;
      case QualityTier.LOW: nextTier = QualityTier.POTATO; break;
      case QualityTier.POTATO: return; // Can't go lower
    }

    if (nextTier !== qualityTier) {
      console.warn(`[Performance] Downgrading quality to ${nextTier}`);
      trackEvent('quality_downgrade', { from: qualityTier, to: nextTier });
      set({ qualityTier: nextTier });
    }
  },

  addZombie: () => set((state) => ({ zombieCount: state.zombieCount + 1 })),
}));