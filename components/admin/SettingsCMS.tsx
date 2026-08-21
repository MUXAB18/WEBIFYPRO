"use client";
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function SettingsCMS({ token }: { token: string | null }) {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/cms/settings', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e: any) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch('/api/cms/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(settings)
    });
    alert('Settings saved!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Global Settings</h1>
        <button onClick={handleSave} style={{
          padding: '10px 20px', background: 'var(--color-accent)', color: '#fff',
          borderRadius: '8px', border: 'none', display: 'flex', gap: '8px', alignItems: 'center',
          cursor: 'pointer', fontWeight: '600'
        }}>
          <Save size={18} /> Save Settings
        </button>
      </div>

      {loading ? <p>Loading settings...</p> : (
        <div style={{ 
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' 
        }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Website Name</label>
            <input type="text" name="websiteName" value={settings.websiteName || ''} onChange={handleChange}
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>SEO Description</label>
            <textarea name="seoDescription" value={settings.seoDescription || ''} onChange={handleChange} rows={3}
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Contact Email</label>
              <input type="text" name="contactEmail" value={settings.contactEmail || ''} onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Contact Phone</label>
              <input type="text" name="contactPhone" value={settings.contactPhone || ''} onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Contact Address</label>
            <textarea name="contactAddress" value={settings.contactAddress || ''} onChange={handleChange} rows={2}
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
          </div>

          <h3 style={{ marginTop: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>Social Links</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>LinkedIn URL</label>
              <input type="text" name="linkedinUrl" value={settings.linkedinUrl || ''} onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Facebook URL</label>
              <input type="text" name="facebookUrl" value={settings.facebookUrl || ''} onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>GitHub URL</label>
              <input type="text" name="githubUrl" value={settings.githubUrl || ''} onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
