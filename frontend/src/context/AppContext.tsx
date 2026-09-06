import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScanResult, VoiceProfile, AppSettings, MainTab, SubScreen } from '../types';

interface AppContextType {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  subScreen: SubScreen | null;
  setSubScreen: (sub: SubScreen | null) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  scanHistory: ScanResult[];
  addScanResult: (result: ScanResult) => void;
  currentResult: ScanResult | null;
  setCurrentResult: (result: ScanResult | null) => void;
  selectedHistoryScan: ScanResult | null;
  setSelectedHistoryScan: (result: ScanResult | null) => void;
  reportScan: (id: string) => boolean;
  clearHistory: () => void;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  toggleCallProtection: () => void;
  callStats: {
    monitored: number;
    suspicious: number;
    alerts: number;
  };
  voiceProfiles: VoiceProfile[];
  addVoiceProfile: (name: string) => void;
  toast: string | null;
  showToast: (message: string) => void;
  detailModalScan: ScanResult | null;
  setDetailModalScan: (scan: ScanResult | null) => void;
  isSimulatingUpload: boolean;
  setIsSimulatingUpload: (isSim: boolean) => void;
}

const INITIAL_HISTORY: ScanResult[] = [
  {
    id: 'scan-sample-1',
    timestamp: 'Today · 5:32 PM',
    durationSec: 4.7,
    humanProbability: 13,
    aiProbability: 87,
    resultState: 'ai',
    indicators: ['Unusual spectral patterns', 'Formant inconsistency', 'Synthetic speech characteristics'],
    reported: false,
    audioName: 'Incoming Call (+1 800-555-0199)'
  },
  {
    id: 'scan-sample-2',
    timestamp: 'Today · 3:18 PM',
    durationSec: 5.1,
    humanProbability: 86,
    aiProbability: 14,
    resultState: 'human',
    indicators: ['Natural pitch variation', 'Consistent vocal formants', 'Natural speech rhythm'],
    reported: false,
    audioName: 'Team Meeting Voice Note'
  },
  {
    id: 'scan-sample-3',
    timestamp: 'Yesterday · 8:42 PM',
    durationSec: 4.3,
    humanProbability: 52,
    aiProbability: 48,
    resultState: 'suspicious',
    indicators: ['Abnormal pitch variation', 'Unnatural pauses'],
    reported: true,
    audioName: 'Customer Support Callback'
  },
  {
    id: 'scan-sample-4',
    timestamp: 'Yesterday · 5:12 PM',
    durationSec: 4.9,
    humanProbability: 91,
    aiProbability: 9,
    resultState: 'human',
    indicators: ['Natural pitch variation', 'Consistent vocal formants', 'Natural speech rhythm'],
    reported: false,
    audioName: 'Sarah J. (Voice Memo)'
  }
];

const INITIAL_PROFILES: VoiceProfile[] = [
  {
    id: 'prof-1',
    name: 'Mom',
    enrolledDate: '3 days ago',
    sampleDurationSec: 3.2,
    status: 'enrolled'
  },
  {
    id: 'prof-2',
    name: 'Work Line',
    enrolledDate: '1 week ago',
    sampleDurationSec: 3.5,
    status: 'enrolled'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [subScreen, setSubScreen] = useState<SubScreen | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [toast, setToast] = useState<string | null>(null);
  const [detailModalScan, setDetailModalScan] = useState<ScanResult | null>(null);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [selectedHistoryScan, setSelectedHistoryScan] = useState<ScanResult | null>(null);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);

  // Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('voiceguard_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      callProtectionActive: true,
      suspiciousCallAlerts: true,
      weeklySummary: false,
      storeAudioLocally: false,
      audioStorageRetention: 'immediate'
    };
  });

  // History
  const [scanHistory, setScanHistory] = useState<ScanResult[]>(() => {
    const saved = localStorage.getItem('voiceguard_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_HISTORY;
  });

  // Voice Profiles
  const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>(() => {
    const saved = localStorage.getItem('voiceguard_profiles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROFILES;
  });

  // Call stats
  const [callStats, setCallStats] = useState({
    monitored: 246,
    suspicious: 14,
    alerts: 11
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('voiceguard_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('voiceguard_history', JSON.stringify(scanHistory));
  }, [scanHistory]);

  useEffect(() => {
    localStorage.setItem('voiceguard_profiles', JSON.stringify(voiceProfiles));
  }, [voiceProfiles]);

  // Subtle cosmetic incrementer when Call Protection is ON
  useEffect(() => {
    if (!settings.callProtectionActive) return;
    const interval = setInterval(() => {
      setCallStats(prev => ({
        ...prev,
        monitored: prev.monitored + 1
      }));
    }, 12000);
    return () => clearInterval(interval);
  }, [settings.callProtectionActive]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  };

  const toggleCallProtection = () => {
    setSettings(prev => ({
      ...prev,
      callProtectionActive: !prev.callProtectionActive
    }));
  };

  const addScanResult = (result: ScanResult) => {
    setScanHistory(prev => [result, ...prev]);
    setCurrentResult(result);
  };

  const reportScan = (id: string): boolean => {
    let already = false;
    setScanHistory(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.reported) {
            already = true;
          }
          return { ...item, reported: true };
        }
        return item;
      })
    );

    if (currentResult && currentResult.id === id) {
      if (currentResult.reported) already = true;
      setCurrentResult({ ...currentResult, reported: true });
    }

    if (already) {
      showToast('Already reported');
      return false;
    } else {
      showToast('Report submitted. Thank you.');
      return true;
    }
  };

  const clearHistory = () => {
    setScanHistory([]);
    showToast('Scan history cleared');
  };

  const addVoiceProfile = (name: string) => {
    const newProf: VoiceProfile = {
      id: `prof-${Date.now()}`,
      name: name.trim() || 'Custom Contact',
      enrolledDate: 'Just now',
      sampleDurationSec: 3.0,
      status: 'enrolled'
    };
    setVoiceProfiles(prev => [newProf, ...prev]);
    showToast(`Voice profile "${newProf.name}" created`);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        subScreen,
        setSubScreen,
        showSplash,
        setShowSplash,
        scanHistory,
        addScanResult,
        currentResult,
        setCurrentResult,
        selectedHistoryScan,
        setSelectedHistoryScan,
        reportScan,
        clearHistory,
        settings,
        updateSettings,
        toggleCallProtection,
        callStats,
        voiceProfiles,
        addVoiceProfile,
        toast,
        showToast,
        detailModalScan,
        setDetailModalScan,
        isSimulatingUpload,
        setIsSimulatingUpload
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
