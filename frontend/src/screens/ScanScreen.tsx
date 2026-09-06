import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Radio } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeVoice } from '../services/simulationEngine';
import { AudioWaveform } from '../components/common/AudioWaveform';
import { ConfidenceMeter } from '../components/common/ConfidenceMeter';

export const ScanScreen: React.FC = () => {
  const { setActiveTab, setSubScreen, addScanResult, setCurrentResult } = useApp();

  const [humanProb, setHumanProb] = useState<number>(50);
  const [aiProb, setAiProb] = useState<number>(50);
  const [timerSec, setTimerSec] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Listening & Analyzing…');
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Start simulated clock timer
    const startTime = Date.now();
    timerIntervalRef.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimerSec(elapsed);
    }, 500);

    // Run simulated analysis
    analyzeVoice({
      preferredTarget: 'random',
      audioName: 'Live Voice Stream',
      signal: controller.signal,
      onProgress: (hProb, aProb, elapsedSec) => {
        setHumanProb(hProb);
        setAiProb(aProb);
        if (elapsedSec > 3.0) {
          setStatusMessage('Synthesizing feature vectors…');
        } else if (elapsedSec > 1.5) {
          setStatusMessage('Evaluating spectral patterns…');
        }
      }
    })
      .then((finalResult) => {
        // Save scan and navigate to result
        addScanResult(finalResult);
        setCurrentResult(finalResult);
        setSubScreen('result-view');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Scan error:', err);
        }
      });

    return () => {
      controller.abort();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setActiveTab('home');
    setSubScreen(null);
  };

  const formattedTimer = `00:${String(timerSec).padStart(2, '0')}`;

  return (
    <div className="screen-scroll" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Top Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: '#182532',
            border: '1px solid #334455',
            borderRadius: '20px',
            margin: '0 auto 20px auto',
            width: 'fit-content'
          }}
        >
          <Radio size={14} color="#4F8CFF" className="animate-pulse-ring" />
          <span style={{ fontSize: '12px', color: '#4F8CFF', fontWeight: 500 }}>
            Prototype Simulation
          </span>
        </div>

        {/* Animated Microphone Ring */}
        <div
          style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            margin: '10px auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Animated Glow Rings */}
          <div
            className="animate-pulse-ring"
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              border: '2px solid rgba(79, 140, 255, 0.4)',
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '0',
              borderRadius: '50%',
              backgroundColor: '#182532',
              border: '2px solid #4F8CFF'
            }}
          />

          {/* Center Mic Icon */}
          <div
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#202F3D',
              border: '1px solid #334455',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}
          >
            <Mic size={32} color="#4F8CFF" />
          </div>
        </div>

        {/* Status & Timer */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F1F5F9', margin: '0 0 4px 0' }}>
            {statusMessage}
          </h2>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 600,
              color: '#4F8CFF',
              letterSpacing: '1px'
            }}
          >
            {formattedTimer}
          </div>
        </div>

        {/* Animated Waveform */}
        <div
          className="vg-card"
          style={{
            padding: '16px 12px',
            marginBottom: '20px',
            backgroundColor: '#182532'
          }}
        >
          <AudioWaveform isAnalyzing={true} barCount={26} height={60} color="#4F8CFF" />
        </div>

        {/* Live Probability Breakdown Card */}
        <div
          className="vg-card"
          style={{
            padding: '16px',
            backgroundColor: '#202F3D',
            marginBottom: '16px'
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '12px'
            }}
          >
            Live Estimated Probability
          </div>

          <ConfidenceMeter humanProb={humanProb} aiProb={aiProb} />

          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '12px 0 0 0', textAlign: 'center' }}>
            Converging spectral confidence vectors in real-time…
          </p>
        </div>
      </div>

      {/* Cancel Action */}
      <div style={{ marginTop: '12px', paddingBottom: '8px' }}>
        <button
          onClick={handleCancel}
          className="btn-outline"
          style={{
            borderColor: '#334455',
            color: '#94A3B8'
          }}
        >
          <X size={18} />
          <span>Cancel Scan</span>
        </button>
      </div>
    </div>
  );
};
