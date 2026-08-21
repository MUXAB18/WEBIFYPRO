"use client";
import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Copy, Check } from 'lucide-react';

export default function MediaLibrary({ token }: { token: string | null }) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchMedia();
  }, [token]);

  const fetchMedia = () => {
    fetch('/api/cms/media', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setMedia(data);
        setLoading(false);
      });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('/api/cms/media', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      fetchMedia();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;
    try {
      await fetch(`/api/cms/media?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMedia(media.filter(m => m.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Media Library</h1>
        
        <label style={{
          padding: '10px 20px', background: 'var(--color-accent)', color: '#fff',
          borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center',
          cursor: uploading ? 'wait' : 'pointer', fontWeight: '600'
        }}>
          <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Media'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? <p>Loading media...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {media.map(item => (
            <div key={item.id} style={{ 
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' 
            }}>
              <div style={{ height: '150px', width: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={item.url} alt={item.altText || ''} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                  {item.fileName}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <button onClick={() => handleCopy(item.url, item.id)} style={{ padding: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                    {copiedId === item.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy URL
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {media.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)' }}>No media files uploaded yet.</p>}
        </div>
      )}
    </div>
  );
}
