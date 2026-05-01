import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import PasswordInput from './components/PasswordInput';
import StrengthMeter from './components/StrengthMeter';
import AnalysisFeedback from './components/AnalysisFeedback';
import PasswordSuggestions from './components/PasswordSuggestions';

function App() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Debounce the API call
    const timer = setTimeout(() => {
      if (password) {
        analyzePassword(password);
      } else {
        setAnalysis(null);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [password]);

  const analyzePassword = async (pwd) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pwd }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze password');
      }
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Could not connect to the analysis server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <ShieldCheck style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} size={32} />
          SafePass
        </h1>
        <p>Enterprise-grade password strength analysis</p>
      </header>

      <main>
        <PasswordInput 
          password={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {loading && <div style={{ textAlign: 'center', marginBottom: '1rem' }}><div className="loader"></div></div>}
        {error && <div style={{ color: 'var(--color-weak)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        {analysis && !loading && (
          <>
            <StrengthMeter score={analysis.score} label={analysis.label} />
            <AnalysisFeedback 
              issues={analysis.issues} 
              suggestions={analysis.feedback_suggestions} 
              entropy={analysis.entropy}
            />
            {analysis.generated_alternatives && analysis.generated_alternatives.length > 0 && (
              <PasswordSuggestions suggestions={analysis.generated_alternatives} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
