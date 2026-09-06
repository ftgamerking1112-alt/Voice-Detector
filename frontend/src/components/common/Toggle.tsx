import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, ariaLabel }) => {
  return (
    <div
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={`toggle-track ${checked ? 'active' : ''}`}
    >
      <div className="toggle-thumb" />
    </div>
  );
};
