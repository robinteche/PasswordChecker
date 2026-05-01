import React from 'react';
import { AlertTriangle, Info, Zap } from 'lucide-react';

const AnalysisFeedback = ({ issues, suggestions, entropy }) => {
  if ((!issues || issues.length === 0) && (!suggestions || suggestions.length === 0)) {
    return (
      <div className="feedback-container">
        <h3 className="text-strong">
          <Zap size={18} /> 
          Excellent Password!
          {entropy !== undefined && (
            <span className="entropy-badge">Entropy: {entropy} bits</span>
          )}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Your password is secure and resistant to dictionary and brute-force attacks.
        </p>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h3>
        <AlertTriangle size={18} color="var(--color-fair)" />
        Analysis Feedback
        {entropy !== undefined && (
          <span className="entropy-badge">Entropy: {entropy} bits</span>
        )}
      </h3>
      <ul className="feedback-list">
        {issues.map((issue, idx) => (
          <li key={`issue-${idx}`} className="issue-item">
            {issue}
          </li>
        ))}
        {suggestions.map((suggestion, idx) => (
          <li key={`suggestion-${idx}`} className="suggestion-item">
            <Info size={14} style={{ display: 'inline', marginRight: '4px', color: 'var(--color-fair)' }} />
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisFeedback;
