import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ScanScreen } from './screens/ScanScreen';
import { ResultScreen } from './screens/ResultScreen';
import { CallProtectionScreen } from './screens/CallProtectionScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { VoiceVerificationScreen } from './screens/VoiceVerificationScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const MainAppContent: React.FC = () => {
  const { showSplash, activeTab, subScreen, setSubScreen, setActiveTab } = useApp();

  if (showSplash) {
    return <SplashScreen />;
  }

  const renderContent = () => {
    // Check for active subscreen
    if (subScreen === 'call-protection') {
      return (
        <>
          <Header title="Real-Time Call Protection" subtitle="Telephony Voice Shield" showBack={true} />
          <CallProtectionScreen />
        </>
      );
    }

    if (subScreen === 'voice-verification') {
      return (
        <>
          <Header title="Verify a Known Voice" subtitle="Speaker Biometric Match" showBack={true} />
          <VoiceVerificationScreen />
        </>
      );
    }

    if (subScreen === 'result-view') {
      return (
        <>
          <Header
            title="Analysis Result"
            subtitle="Probabilistic Classification"
            showBack={true}
            onBack={() => {
              setSubScreen(null);
              setActiveTab('home');
            }}
          />
          <ResultScreen />
        </>
      );
    }

    // Default Tab Screens
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Header title="Voice Protection" subtitle="Detect suspicious AI-generated voices." />
            <HomeScreen />
          </>
        );
      case 'scan':
        return (
          <>
            <Header title="Voice Analysis" subtitle="Prototype Simulation" />
            <ScanScreen />
          </>
        );
      case 'history':
        return (
          <>
            <Header title="Scan History" subtitle="Your recent voice analyses" />
            <HistoryScreen />
          </>
        );
      case 'settings':
        return (
          <>
            <Header title="Settings" subtitle="Preferences & Policies" />
            <SettingsScreen />
          </>
        );
      default:
        return (
          <>
            <Header title="Voice Protection" />
            <HomeScreen />
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <Toast />
      {renderContent()}
      <BottomNav />
    </div>
  );
};

export const App: React.FC = () => {
  return <MainAppContent />;
};

export default App;
