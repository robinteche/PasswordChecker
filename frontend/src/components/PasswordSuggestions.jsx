import React, { useState } from 'react';
import { Copy, CheckCircle, RefreshCw } from 'lucide-react';

const PasswordSuggestions = ({ suggestions }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="suggestions-container">
      <h3>
        <RefreshCw size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', color: 'var(--accent-primary)' }} />
        Strong Alternatives
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Consider using one of these auto-generated secure passwords:
      </p>
      
      <div>
        {suggestions.map((pwd, idx) => (
          <div key={idx} className="suggestion-card">
            <span className="suggestion-text">{pwd}</span>
            <button 
              className="copy-btn" 
              style={{ position: 'relative', right: 'auto', transform: 'none' }}
              onClick={() => handleCopy(pwd, idx)}
              title="Copy to clipboard"
            >
              {copiedIndex === idx ? (
                <CheckCircle size={18} color="var(--color-strong)" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordSuggestions;
