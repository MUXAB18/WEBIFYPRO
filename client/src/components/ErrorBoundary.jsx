import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          background: 'rgba(5,5,20,0.85)',
          border: '1px solid rgba(255,0,110,0.3)',
          borderRadius: '16px',
          margin: '20px auto',
          maxWidth: '500px',
          color: '#fff',
          fontFamily: 'Outfit, sans-serif'
        }}>
          <AlertCircle size={48} color="#ff006e" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>
            Oops! Something went wrong.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '24px' }}>
            We've encountered an unexpected error in this component.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #ff006e, #6366f1)',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={16} /> Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
