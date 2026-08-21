"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        if (data.otpRequired) {
          setOtpToken(data.otpToken);
          setOtpMode(true);
          setMessage(data.message || 'OTP sent to your email.');
        } else {
          // Fallback if no OTP required
          localStorage.setItem('admin_token', data.token);
          router.push('/admin/dashboard');
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, otpToken })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #163057, var(--color-primary))',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 0 40px rgba(255,107,53,0.05)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150px',
          height: '150px',
          background: 'rgba(255,107,53,0.4)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--color-accent)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 12px 32px rgba(255,107,53,0.4)'
          }}>
            {otpMode ? <KeyRound size={32} color="#fff" /> : <Shield size={32} color="#fff" />}
          </div>

          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '8px'
          }}>
            {otpMode ? 'Verify Access' : 'Admin Portal'}
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            marginBottom: '32px'
          }}>
            {otpMode ? 'Enter the 6-digit code sent to your email.' : 'Secure access to Webify Pro systems'}
          </p>

          {!otpMode ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px', color: 'rgba(255,255,255,0.4)' }}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Admin Email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 44px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '14px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontFamily: 'Outfit, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px', color: 'rgba(255,255,255,0.4)' }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 44px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '14px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontFamily: 'Outfit, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {error && (
                <div style={{
                  color: '#ff4d4d',
                  fontSize: '0.85rem',
                  background: 'rgba(255,77,77,0.1)',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,77,77,0.2)'
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  marginTop: '8px',
                  width: '100%',
                  padding: '16px',
                  background: isLoading ? 'rgba(255,107,53,0.5)' : 'var(--color-accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  fontFamily: 'Outfit, sans-serif',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isLoading ? 'none' : '0 8px 24px rgba(255,107,53,0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => !isLoading && ((e.target as HTMLElement).style.transform = 'translateY(-2px)')}
                onMouseLeave={e => !isLoading && ((e.target as HTMLElement).style.transform = 'translateY(0)')}
              >
                {isLoading ? 'Authenticating...' : (
                  <>
                    Continue <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="0 0 0 0 0 0"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '14px',
                    color: '#fff',
                    fontSize: '1.5rem',
                    letterSpacing: '8px',
                    textAlign: 'center',
                    fontFamily: 'Outfit, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {message && (
                <div style={{ color: '#25d366', fontSize: '0.85rem' }}>
                  {message}
                </div>
              )}

              {error && (
                <div style={{
                  color: '#ff4d4d',
                  fontSize: '0.85rem',
                  background: 'rgba(255,77,77,0.1)',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,77,77,0.2)'
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  marginTop: '8px',
                  width: '100%',
                  padding: '16px',
                  background: isLoading ? 'rgba(255,107,53,0.5)' : 'var(--color-accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  fontFamily: 'Outfit, sans-serif',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isLoading ? 'none' : '0 8px 24px rgba(255,107,53,0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => !isLoading && ((e.target as HTMLElement).style.transform = 'translateY(-2px)')}
                onMouseLeave={e => !isLoading && ((e.target as HTMLElement).style.transform = 'translateY(0)')}
              >
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpMode(false);
                  setOtp('');
                  setError('');
                  setMessage('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginTop: '8px'
                }}
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
