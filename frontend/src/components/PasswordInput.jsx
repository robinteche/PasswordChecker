import { useState } from 'react';
import { Eye, EyeOff, Copy, CheckCircle } from 'lucide-react';

const PasswordInput = ({ password, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="input-group">
      <input
        type={showPassword ? 'text' : 'password'}
        className="password-input"
        placeholder="Enter a password to analyze..."
        value={password}
        onChange={onChange}
        autoComplete="off"
      />
      
      <div style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
        <button 
          className="toggle-visibility-btn" 
          style={{ position: 'relative', right: 'auto', transform: 'none' }}
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        <button 
          className="copy-btn"
          style={{ position: 'relative', right: 'auto', transform: 'none' }}
          onClick={handleCopy}
          title="Copy password"
        >
          {copied ? <CheckCircle size={20} color="var(--color-strong)" /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
