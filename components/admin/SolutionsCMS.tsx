"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Save } from 'lucide-react';

export default function SolutionsCMS({ token }: { token: string | null }) {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', shortDescription: '', content: '', icon: '', isPublished: false, order: 0, seoTitle: '', seoDescription: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSolutions();
  }, [token]);

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/solutions', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      setSolutions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', slug: '', shortDescription: '', content: '', icon: '', isPublished: false, order: 0, seoTitle: '', seoDescription: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (solution: any) => {
    setFormData({
      name: solution.name || '',
      slug: solution.slug || '',
      shortDescription: solution.shortDescription || '',
      content: solution.content || '',
      icon: solution.icon || '',
      isPublished: solution.isPublished || false,
      order: solution.order || 0,
      seoTitle: solution.seoTitle || '',
      seoDescription: solution.seoDescription || ''
    });
    setEditingId(solution.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this solution?")) return;
    try {
      await fetch(`/api/cms/solutions?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      setSolutions(solutions.filter(s => s.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, ...formData } : formData;
      const res = await fetch('/api/cms/solutions', {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchSolutions();
      } else {
        alert("Failed to save solution");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving solution");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Solutions CMS</h1>
        <button onClick={openAddModal} style={{
          padding: '10px 20px', background: 'var(--color-accent)', color: '#fff',
          borderRadius: '8px', border: 'none', display: 'flex', gap: '8px', alignItems: 'center',
          cursor: 'pointer', fontWeight: '600'
        }}>
          <Plus size={18} /> Add Solution
        </button>
      </div>

      {loading ? <p>Loading solutions...</p> : (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>Title</th>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>Slug</th>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>Status</th>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map(s => (
                <tr key={s.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>{s.name}</td>
                  <td style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>/{s.slug}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
                      background: s.isPublished ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: s.isPublished ? '#10b981' : '#f59e0b'
                    }}>
                      {s.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEditModal(s)} style={{ padding: '6px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(s.id)} style={{ padding: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {solutions.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No solutions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            background: '#0B1E39', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '600px',
            border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ margin: 0 }}>{editingId ? 'Edit Solution' : 'Add Solution'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            </div>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="e.g. E-Commerce Platform" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Slug</label>
                <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="e.g. e-commerce-platform" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Icon Name (Lucide)</label>
                <input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="e.g. ShoppingCart" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Short Description</label>
                <textarea required value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '80px' }} placeholder="Brief summary" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Content (Full Description for Modal)</label>
                <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '150px' }} placeholder="Full details" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Card Bullet Points (One per line)</label>
                <textarea value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '80px' }} placeholder="Point 1&#10;Point 2&#10;Point 3" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Modal Detailed Points (One per line)</label>
                <textarea value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '120px' }} placeholder="Detail 1&#10;Detail 2&#10;Detail 3" />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                <input type="checkbox" id="solution-published" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                <label htmlFor="solution-published">Is Published</label>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ padding: '12px 24px', background: 'var(--color-accent)', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', opacity: saving ? 0.7 : 1 }}>
                  <Save size={18} /> {saving ? 'Saving...' : 'Save Solution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
