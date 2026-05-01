import React from 'react';

const StrengthMeter = ({ score, label }) => {
  // score is 0-4
  const getLabelColorClass = () => {
    switch (score) {
      case 0: return 'text-weak';
      case 1: return 'text-fair';
      case 2: return 'text-good';
      case 3: return 'text-strong';
      case 4: return 'text-very-strong';
      default: return 'text-weak';
    }
  };

  return (
    <div className={`meter-container score-${score}`}>
      <div className="meter-header">
        <span>Password Strength</span>
        <span className={getLabelColorClass()}>{label}</span>
      </div>
      <div className="meter-bars">
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index} 
            className={`meter-bar ${score > index ? 'filled' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;
