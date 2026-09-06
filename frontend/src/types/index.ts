export type ResultState = 'human' | 'suspicious' | 'ai';

export interface ScanResult {
  id: string;
  timestamp: string;
  durationSec: number;
  humanProbability: number;
  aiProbability: number;
  resultState: ResultState;
  indicators: string[];
  reported: boolean;
  audioName?: string;
}

export interface VoiceProfile {
  id: string;
  name: string;
  enrolledDate: string;
  sampleDurationSec: number;
  status: 'enrolled';
}

export interface AppSettings {
  callProtectionActive: boolean;
  suspiciousCallAlerts: boolean;
  weeklySummary: boolean;
  storeAudioLocally: boolean;
  audioStorageRetention: 'immediate' | '24h' | '7d' | 'manual';
}

export type MainTab = 'home' | 'scan' | 'history' | 'settings';
export type SubScreen = 'call-protection' | 'voice-verification' | 'result-view';
