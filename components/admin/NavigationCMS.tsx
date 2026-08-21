"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Save } from 'lucide-react';

export default function NavigationCMS({ token }: { token: string | null }) {
  const [navItems, setNavItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    order: 1
  });

  const fetchItems = () => {
    fetch('/api/cms/navigation', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setNavItems(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [token]);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        label: item.label || '',
        url: item.url || '',
        order: item.order || 1
      });
    } else {
      setEditingItem(null);
      setFormData({
        label: '',
        url: '',
        order: navItems.length > 0 ? Math.max(...navItems.map(n => n.order)) + 1 : 1
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const body = editingItem ? { id: editingItem.id, ...formData } : formData;

    const res = await fetch('/api/cms/navigation', {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      fetchItems();
      handleCloseModal();
    } else {
      alert('Failed to save navigation item.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    const res = await fetch(`/api/cms/navigation?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.ok) {
      fetchItems();
    } else {
      alert('Failed to delete link.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Navigation Menu</h1>
        <button 
          onClick={() => handleOpenModal()}
          style={{
            padding: '10px 20px', background: 'var(--color-accent)', color: '#fff',
            borderRadius: '8px', border: 'none', display: 'flex', gap: '8px', alignItems: 'center',
            cursor: 'pointer', fontWeight: '600'
          }}>
          <Plus size={18} /> Add Link
        </button>
      </div>

      {loading ? <p>Loading navigation...</p> : (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>Order</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>Label</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>URL</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {navItems.map(item => (
                  <tr key={item.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px', fontWeight: '500' }}>{item.order}</td>
                    <td style={{ padding: '16px', fontWeight: '500' }}>{item.label}</td>
                    <td style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>{item.url}</td>
                    <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenModal(item)} style={{ padding: '6px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Edit3 size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} style={{ padding: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px'
        }}>
          <div onClick={handleCloseModal} style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,57,0.8)', backdropFilter: 'blur(4px)' }} />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '500px',
            background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <button onClick={handleCloseModal} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: '#fff' }}>{editingItem ? 'Edit Link' : 'Add Link'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)' }}>Label</label>
                <input 
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({...formData, label: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)' }}>URL</label>
                <input 
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)' }}>Order</label>
                <input 
                  type="number"
                  required
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', background: 'var(--color-accent)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                  <Save size={18} /> Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
