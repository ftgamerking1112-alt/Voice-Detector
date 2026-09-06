import React from 'react';
import { Home, Mic, Clock, Settings, LucideIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MainTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setSubScreen } = useApp();

  const handleTabClick = (tab: MainTab) => {
    setSubScreen(null); // Return from any subscreen when tapping bottom nav
    setActiveTab(tab);
  };

  const tabs: { id: MainTab; label: string; icon: LucideIcon }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'scan', label: 'Scan', icon: Mic },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '68px',
        backgroundColor: '#182532',
        borderTop: '1px solid #334455',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 30,
        paddingBottom: '4px'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        const color = isActive ? '#4F8CFF' : '#94A3B8';

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '8px 12px',
              cursor: 'pointer',
              color: color,
              transition: 'color 180ms ease, transform 150ms ease',
              minWidth: '64px'
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon size={22} color={color} />
              {tab.id === 'scan' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#4F8CFF'
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                color: color
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
