import { ScanResult, ResultState } from '../types';

const SUSPICIOUS_AI_INDICATORS = [
  'Unusual spectral patterns',
  'Abnormal pitch variation',
  'Synthetic speech characteristics',
  'Unnatural pauses',
  'Formant inconsistency',
  'Reduced natural voice variation'
];

const HUMAN_INDICATORS = [
  'Natural pitch variation',
  'Consistent vocal formants',
  'Natural speech rhythm'
];

export function getResultCategory(aiProb: number): ResultState {
  if (aiProb < 30) return 'human';
  if (aiProb <= 65) return 'suspicious';
  return 'ai';
}

export function formatTimestamp(date: Date = new Date()): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `Today · ${displayHours}:${minutes} ${ampm}`;
}

/**
 * Centralized simulation engine for VoiceGuard AI.
 * Simulates real-time probabilistic convergence over 4-5.5 seconds.
 * Ready to be swapped with a real backend API in the future.
 */
export async function analyzeVoice(
  options?: {
    preferredTarget?: 'random' | 'human' | 'suspicious' | 'ai';
    audioName?: string;
    onProgress?: (humanProb: number, aiProb: number, elapsedSec: number) => void;
    signal?: AbortSignal;
  }
): Promise<ScanResult> {
  const { preferredTarget = 'random', audioName = 'Live Incoming Voice', onProgress, signal } = options || {};

  // Determine target outcome
  let targetAiProb: number;
  if (preferredTarget === 'human') {
    targetAiProb = Math.floor(Math.random() * 20) + 8; // 8% - 28%
  } else if (preferredTarget === 'suspicious') {
    targetAiProb = Math.floor(Math.random() * 26) + 36; // 36% - 61%
  } else if (preferredTarget === 'ai') {
    targetAiProb = Math.floor(Math.random() * 24) + 72; // 72% - 95%
  } else {
    // Weighted random distribution
    const roll = Math.random();
    if (roll < 0.35) {
      targetAiProb = Math.floor(Math.random() * 20) + 8; // Human
    } else if (roll < 0.65) {
      targetAiProb = Math.floor(Math.random() * 24) + 36; // Suspicious
    } else {
      targetAiProb = Math.floor(Math.random() * 24) + 72; // AI
    }
  }

  const durationSec = Number((Math.random() * 1.5 + 4.2).toFixed(1)); // 4.2s to 5.7s
  const totalSteps = 10;
  const stepIntervalMs = Math.floor((durationSec * 1000) / totalSteps);

  // Initial fluctuating values starting near 50/50
  let currentAiProb = 48 + Math.floor(Math.random() * 8) - 4;

  for (let step = 1; step <= totalSteps; step++) {
    if (signal?.aborted) {
      throw new DOMException('Scan cancelled by user', 'AbortError');
    }

    await new Promise((resolve) => setTimeout(resolve, stepIntervalMs));

    if (signal?.aborted) {
      throw new DOMException('Scan cancelled by user', 'AbortError');
    }

    const elapsed = Number(((step / totalSteps) * durationSec).toFixed(1));
    
    // Convergence logic
    if (step === totalSteps) {
      currentAiProb = targetAiProb;
    } else {
      // Noise reduces as step approaches totalSteps
      const noise = (Math.random() * 14 - 7) * (1 - step / totalSteps);
      const interpolated = currentAiProb + (targetAiProb - currentAiProb) * 0.35 + noise;
      currentAiProb = Math.max(5, Math.min(96, Math.round(interpolated)));
    }

    const currentHumanProb = 100 - currentAiProb;
    if (onProgress) {
      onProgress(currentHumanProb, currentAiProb, elapsed);
    }
  }

  const finalAiProb = targetAiProb;
  const finalHumanProb = 100 - finalAiProb;
  const resultState = getResultCategory(finalAiProb);

  // Select indicators
  let selectedIndicators: string[];
  if (resultState === 'human') {
    selectedIndicators = [...HUMAN_INDICATORS];
  } else {
    // Pick 2 or 3 random indicators
    const shuffled = [...SUSPICIOUS_AI_INDICATORS].sort(() => 0.5 - Math.random());
    selectedIndicators = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
  }

  const result: ScanResult = {
    id: `scan-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: formatTimestamp(),
    durationSec,
    humanProbability: finalHumanProb,
    aiProbability: finalAiProb,
    resultState,
    indicators: selectedIndicators,
    reported: false,
    audioName
  };

  return result;
}
