"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Save, ArrowUp, ArrowDown } from 'lucide-react';

export default function PagesCMS({ token }: { token: string | null }) {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', metaTitle: '', metaDescription: '', isPublished: false, sections: [] as any[] });
  const [saving, setSaving] = useState(false);
  const [showSectionPicker, setShowSectionPicker] = useState(false);

  // Sections allowed per page slug — mirrors exactly what each page file uses
  const PAGE_SECTIONS: Record<string, { type: string; label: string; desc: string }[]> = {
    home: [
      { type: 'HERO',          label: '🏠 Hero',          desc: 'Main headline, description & buttons' },
      { type: 'STATS',         label: '📊 Stats',         desc: 'Key metrics (clients, projects, etc.)' },
      { type: 'SERVICES_LIST', label: '🛠 Services List',  desc: 'Services section header + auto-list' },
      { type: 'TECH_STACK',    label: '⚙️ Tech Stack',    desc: 'Technology pills with brand icons' },
      { type: 'VALUES',        label: '💡 Values/Why Us',  desc: 'Core values / why choose us cards' },
      { type: 'PROCESS',       label: '🔄 Process',        desc: 'Step-by-step working process' },
      { type: 'FAQ',           label: '❓ FAQ',            desc: 'Frequently asked questions' },
      { type: 'CTA',           label: '📣 CTA Banner',     desc: 'Call-to-action section' },
    ],
    about: [
      { type: 'HERO',   label: '🏠 Hero',        desc: 'Page headline & description' },
      { type: 'STORY',  label: '📖 Our Story',    desc: 'Mission/story with paragraphs' },
      { type: 'STATS',  label: '📊 Stats',        desc: 'Company stats (dark bar)' },
      { type: 'VALUES', label: '💡 Core Values',  desc: 'Values grid with icons' },
      { type: 'CTA',    label: '📣 CTA Banner',   desc: 'Call-to-action at bottom' },
    ],
    services: [
      { type: 'HERO',       label: '🏠 Hero',       desc: 'Page headline & description' },
      { type: 'TECH_STACK', label: '⚙️ Tech Stack', desc: 'Technology pills' },
      { type: 'CTA',        label: '📣 CTA Banner', desc: 'Call-to-action at bottom' },
    ],
    solutions: [
      { type: 'HERO', label: '🏠 Hero',       desc: 'Headline shown above the solutions grid' },
      { type: 'CTA',  label: '📣 CTA Banner', desc: 'Call-to-action at bottom' },
    ],
    blog: [
      { type: 'HERO', label: '🏠 Hero', desc: 'Blog page headline, subtitle & description' },
    ],
    contact: [
      { type: 'HERO',         label: '🏠 Hero',         desc: 'Intro headline above the contact form' },
      { type: 'CONTACT_FORM', label: '📬 Contact Form', desc: 'Shows the contact form component' },
    ],
    'start-project': [
      { type: 'HERO', label: '🏠 Hero', desc: 'Headline above the order/quote form' },
    ],
  };

  useEffect(() => {
    fetchPages();
  }, [token]);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/pages', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({ title: '', slug: '', content: '', metaTitle: '', metaDescription: '', isPublished: false, sections: [] });
    setEditingId(null);
    setShowSectionPicker(false);
    setIsModalOpen(true);
  };

  const openEditModal = (page: any) => {
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      content: page.content || '',
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      isPublished: page.isPublished || false,
      sections: page.sections ? [...page.sections] : []
    });
    setEditingId(page.id);
    setShowSectionPicker(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    try {
      await fetch(`/api/cms/pages?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      setPages(pages.filter(p => p.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // update sections order before save
      const sectionsToSave = formData.sections.map((s, i) => ({ ...s, order: i }));

      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, ...formData, sections: sectionsToSave } : { ...formData, sections: sectionsToSave };

      const res = await fetch('/api/cms/pages', {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchPages();
      } else {
        alert("Failed to save page");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving page");
    } finally {
      setSaving(false);
    }
  };

  const addSectionOfType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { type, content: '{}', order: prev.sections.length }]
    }));
    setShowSectionPicker(false);
  };

  // Sections allowed for the page currently being edited
  const getAllowedSections = () => {
    const slug = formData.slug || '';
    return PAGE_SECTIONS[slug] || [
      { type: 'HERO',   label: '🏠 Hero',   desc: 'Page headline & description' },
      { type: 'CTA',    label: '📣 CTA',    desc: 'Call-to-action' },
    ];
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...formData.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
    }
    setFormData({ ...formData, sections: newSections });
  };

  const removeSection = (index: number) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const updateSectionContent = (index: number, content: string) => {
    const newSections = [...formData.sections];
    newSections[index].content = content;
    setFormData({ ...formData, sections: newSections });
  };


  const SectionEditor = ({ section, index, onChange }: { section: any, index: number, onChange: (val: string) => void }) => {
    let content: any = {};
    try {
      content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
    } catch (e) {
      content = {};
    }

    const update = (newContent: any) => {
      onChange(JSON.stringify(newContent, null, 2));
    };

    const handleChange = (field: string, value: any) => update({ ...content, [field]: value });

    const inputStyle = { width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', marginBottom: '12px' };
    const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' };

    if (section.type === 'HERO') {
      return (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input style={inputStyle} value={content.subtitle || ''} onChange={e => handleChange('subtitle', e.target.value)} placeholder="e.g. About Webify Pro" />

          <label style={labelStyle}>Title (Use {'{text}'} to highlight words)</label>
          <input style={inputStyle} value={content.title || ''} onChange={e => handleChange('title', e.target.value)} placeholder="We are the architects of {digital growth.}" />

          <label style={labelStyle}>Highlight Color</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input type="color" value={content.titleAccentColor || '#ff6b35'} onChange={e => handleChange('titleAccentColor', e.target.value)} style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{content.titleAccentColor || '#ff6b35'}</span>
          </div>

          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '80px' }} value={content.description || ''} onChange={e => handleChange('description', e.target.value)} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Primary Button Text</label>
              <input style={inputStyle} value={content.button1Text || ''} onChange={e => handleChange('button1Text', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Primary Button Link</label>
              <input style={inputStyle} value={content.button1Link || ''} onChange={e => handleChange('button1Link', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Secondary Button Text</label>
              <input style={inputStyle} value={content.button2Text || ''} onChange={e => handleChange('button2Text', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Secondary Button Link</label>
              <input style={inputStyle} value={content.button2Link || ''} onChange={e => handleChange('button2Link', e.target.value)} />
            </div>
          </div>
        </div>
      );
    }

    if (section.type === 'CTA') {
      return (
        <div>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={content.title || ''} onChange={e => handleChange('title', e.target.value)} />
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '60px' }} value={content.description || ''} onChange={e => handleChange('description', e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Button Text</label>
              <input style={inputStyle} value={content.buttonText || ''} onChange={e => handleChange('buttonText', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Button Link</label>
              <input style={inputStyle} value={content.buttonLink || ''} onChange={e => handleChange('buttonLink', e.target.value)} />
            </div>
          </div>
        </div>
      );
    }

    if (section.type === 'STORY') {
      const paragraphs = content.paragraphs || [''];
      return (
        <div>
          <label style={labelStyle}>Title (Use {'{text}'} to highlight words)</label>
          <input style={inputStyle} value={content.title || ''} onChange={e => handleChange('title', e.target.value)} placeholder="The traditional model is {broken.}" />

          <label style={labelStyle}>Highlight Color</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input type="color" value={content.titleAccentColor || '#ff6b35'} onChange={e => handleChange('titleAccentColor', e.target.value)} style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{content.titleAccentColor || '#ff6b35'}</span>
          </div>

          <label style={labelStyle}>Paragraphs</label>
          {paragraphs.map((p: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <textarea style={{ ...inputStyle, marginBottom: 0, minHeight: '60px' }} value={p} onChange={e => {
                const newP = [...paragraphs];
                newP[i] = e.target.value;
                handleChange('paragraphs', newP);
              }} />
              <button type="button" onClick={() => {
                const newP = paragraphs.filter((_: any, idx: number) => idx !== i);
                handleChange('paragraphs', newP);
              }} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '0 12px', cursor: 'pointer' }}><X size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={() => handleChange('paragraphs', [...paragraphs, ''])} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Paragraph</button>
        </div>
      );
    }

    if (section.type === 'STATS') {
      const stats = content.stats || [];
      return (
        <div>
          <label style={labelStyle}>Stats items</label>
          {stats.map((s: any, i: number) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '8px', marginBottom: '8px' }}>
              <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Number (e.g. 50+)" value={s.number || ''} onChange={e => {
                const newS = [...stats]; newS[i] = { ...newS[i], number: e.target.value }; handleChange('stats', newS);
              }} />
              <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Label (e.g. Clients)" value={s.label || ''} onChange={e => {
                const newS = [...stats]; newS[i] = { ...newS[i], label: e.target.value }; handleChange('stats', newS);
              }} />
              <button type="button" onClick={() => {
                const newS = stats.filter((_: any, idx: number) => idx !== i);
                handleChange('stats', newS);
              }} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '0 12px', cursor: 'pointer' }}><X size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={() => handleChange('stats', [...stats, { number: '', label: '' }])} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Stat</button>
        </div>
      );
    }

    if (section.type === 'VALUES') {
      const values = content.values || [];
      return (
        <div>
          <label style={labelStyle}>Section Title</label>
          <input style={inputStyle} value={content.title || ''} onChange={e => handleChange('title', e.target.value)} />
          <label style={labelStyle}>Section Description</label>
          <input style={inputStyle} value={content.description || ''} onChange={e => handleChange('description', e.target.value)} />

          <label style={labelStyle}>Core Values</label>
          {values.map((v: any, i: number) => (
            <div key={i} style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
              <button type="button" onClick={() => {
                const newV = values.filter((_: any, idx: number) => idx !== i);
                handleChange('values', newV);
              }} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>

              <input style={inputStyle} placeholder="Icon name (e.g. Target, Shield)" value={v.icon || ''} onChange={e => {
                const newV = [...values]; newV[i] = { ...newV[i], icon: e.target.value }; handleChange('values', newV);
              }} />
              <input style={inputStyle} placeholder="Title" value={v.title || ''} onChange={e => {
                const newV = [...values]; newV[i] = { ...newV[i], title: e.target.value }; handleChange('values', newV);
              }} />
              <textarea style={{ ...inputStyle, marginBottom: 0, minHeight: '60px' }} placeholder="Description" value={v.description || ''} onChange={e => {
                const newV = [...values]; newV[i] = { ...newV[i], description: e.target.value }; handleChange('values', newV);
              }} />
            </div>
          ))}
          <button type="button" onClick={() => handleChange('values', [...values, { icon: '', title: '', description: '' }])} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Value</button>
        </div>
      );
    }

    if (section.type === 'PROCESS') {
      const steps = content.steps || [];
      return (
        <div>
          <label style={labelStyle}>Section Subtitle</label>
          <input style={inputStyle} value={content.subtitle || ''} onChange={e => handleChange('subtitle', e.target.value)} />
          <label style={labelStyle}>Section Title</label>
          <input style={inputStyle} value={content.title || ''} onChange={e => handleChange('title', e.target.value)} />
          <label style={labelStyle}>Section Description</label>
          <textarea style={{ ...inputStyle, minHeight: '60px' }} value={content.description || ''} onChange={e => handleChange('description', e.target.value)} />

          <label style={labelStyle}>Process Steps</label>
          {steps.map((s: any, i: number) => (
            <div key={i} style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
              <button type="button" onClick={() => {
                const newS = steps.filter((_: any, idx: number) => idx !== i);
                handleChange('steps', newS);
              }} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input style={inputStyle} placeholder="Step Number (e.g. 01)" value={s.number || ''} onChange={e => {
                  const newS = [...steps]; newS[i] = { ...newS[i], number: e.target.value }; handleChange('steps', newS);
                }} />
                <input style={inputStyle} placeholder="Icon name (e.g. MessageSquare)" value={s.icon || ''} onChange={e => {
                  const newS = [...steps]; newS[i] = { ...newS[i], icon: e.target.value }; handleChange('steps', newS);
                }} />
              </div>
              <input style={inputStyle} placeholder="Title" value={s.title || ''} onChange={e => {
                const newS = [...steps]; newS[i] = { ...newS[i], title: e.target.value }; handleChange('steps', newS);
              }} />
              <textarea style={{ ...inputStyle, marginBottom: 0, minHeight: '60px' }} placeholder="Description" value={s.description || ''} onChange={e => {
                const newS = [...steps]; newS[i] = { ...newS[i], description: e.target.value }; handleChange('steps', newS);
              }} />
            </div>
          ))}
          <button type="button" onClick={() => handleChange('steps', [...steps, { number: '', icon: '', title: '', description: '' }])} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Step</button>
        </div>
      );
    }

    if (section.type === 'FAQ') {
      const faqs = content.faqs || [];
      return (
        <div>
          <label style={labelStyle}>Section Subtitle</label>
          <input style={inputStyle} value={content.subtitle || ''} onChange={e => handleChange('subtitle', e.target.value)} />
          <label style={labelStyle}>Section Title</label>
          <input style={inputStyle} value={content.title || ''} onChange={e => handleChange('title', e.target.value)} />

          <label style={labelStyle}>FAQs</label>
          {faqs.map((f: any, i: number) => (
            <div key={i} style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
              <button type="button" onClick={() => {
                const newF = faqs.filter((_: any, idx: number) => idx !== i);
                handleChange('faqs', newF);
              }} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>

              <input style={inputStyle} placeholder="Question" value={f.question || ''} onChange={e => {
                const newF = [...faqs]; newF[i] = { ...newF[i], question: e.target.value }; handleChange('faqs', newF);
              }} />
              <textarea style={{ ...inputStyle, marginBottom: 0, minHeight: '60px' }} placeholder="Answer" value={f.answer || ''} onChange={e => {
                const newF = [...faqs]; newF[i] = { ...newF[i], answer: e.target.value }; handleChange('faqs', newF);
              }} />
            </div>
          ))}
          <button type="button" onClick={() => handleChange('faqs', [...faqs, { question: '', answer: '' }])} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add FAQ</button>
        </div>
      );
    }

    if (section.type === 'CONTACT_FORM') {
      return (
        <div>
          <label style={labelStyle}>Hide Header?</label>
          <input type="checkbox" checked={content.hideHeader === true} onChange={e => handleChange('hideHeader', e.target.checked)} />
        </div>
      );
    }

    if (section.type === 'SERVICES_LIST') {
      return (
        <div>
          <label style={labelStyle}>Services List Header</label>
          <input style={inputStyle} value={content.subtitle || ''} onChange={e => handleChange('subtitle', e.target.value)} placeholder="Subtitle e.g. Services" />
          <input style={inputStyle} value={content.title || ''} onChange={e => handleChange('title', e.target.value)} placeholder="Title e.g. Everything you need to {grow online.}" />

          <label style={labelStyle}>Highlight Color</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input type="color" value={content.titleAccentColor || '#ff6b35'} onChange={e => handleChange('titleAccentColor', e.target.value)} style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{content.titleAccentColor || '#ff6b35'}</span>
          </div>

          <textarea style={{ ...inputStyle, minHeight: '60px' }} value={content.description || ''} onChange={e => handleChange('description', e.target.value)} placeholder="Description" />

          <label style={labelStyle}>Services List (Auto-populated from Services data)</label>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>The list of services is managed from the Services CMS section. This block simply renders them on the page.</p>
          <div style={{ marginTop: '12px' }}>
            <label style={labelStyle}>Hide Header?</label>
            <input type="checkbox" checked={content.hideHeader === true} onChange={e => handleChange('hideHeader', e.target.checked)} />
          </div>
        </div>
      );
    }

    if (section.type === 'TECH_STACK') {
      const technologies = content.technologies || [];
      return (
        <div>
          <label style={labelStyle}>Section Subtitle (Use {'{text}'} to highlight words)</label>
          <input style={inputStyle} value={content.subtitle || ''} onChange={e => handleChange('subtitle', e.target.value)} placeholder="ENGINEERED WITH {MODERN TECHNOLOGIES}" />

          <label style={labelStyle}>Highlight Color</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input type="color" value={content.titleAccentColor || '#ff6b35'} onChange={e => handleChange('titleAccentColor', e.target.value)} style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{content.titleAccentColor || '#ff6b35'}</span>
          </div>

          <label style={labelStyle}>Technologies</label>
          {technologies.map((t: any, i: number) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
              <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Name (e.g. Next.js)" value={t.name || ''} onChange={e => {
                const newT = [...technologies]; newT[i] = { ...newT[i], name: e.target.value }; handleChange('technologies', newT);
              }} />
              <input style={{ ...inputStyle, marginBottom: 0 }} placeholder="Icon (e.g. Code2)" value={t.icon || ''} onChange={e => {
                const newT = [...technologies]; newT[i] = { ...newT[i], icon: e.target.value }; handleChange('technologies', newT);
              }} />
              <button type="button" onClick={() => {
                const newT = technologies.filter((_: any, idx: number) => idx !== i);
                handleChange('technologies', newT);
              }} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '0 12px', cursor: 'pointer' }}><X size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={() => handleChange('technologies', [...technologies, { name: '', icon: '' }])} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Technology</button>
        </div>
      );
    }

    if (section.type === 'SOLUTIONS_LIST') {
      return (
        <div>
          <label style={labelStyle}>Solutions List (Auto-populated from Solutions data)</label>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>The list of solutions is managed from the Solutions CMS section. This block simply renders them on the page.</p>
          <div style={{ marginTop: '12px' }}>
            <label style={labelStyle}>Hide Header?</label>
            <input type="checkbox" checked={content.hideHeader === true} onChange={e => handleChange('hideHeader', e.target.checked)} />
          </div>
        </div>
      );
    }

    if (section.type === 'BLOG_LIST') {
      return (
        <div>
          <label style={labelStyle}>Blog List (Auto-populated from Blog data)</label>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>The list of blog posts is managed from the Blog CMS section. This block simply renders them on the page.</p>
          <div style={{ marginTop: '12px' }}>
            <label style={labelStyle}>Hide Header?</label>
            <input type="checkbox" checked={content.hideHeader === true} onChange={e => handleChange('hideHeader', e.target.checked)} />
          </div>
        </div>
      );
    }



    // Fallback raw JSON
    return (
      <div>
        <label style={labelStyle}>Raw JSON Data</label>
        <textarea
          value={typeof section.content === 'string' ? section.content : JSON.stringify(section.content, null, 2)}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', padding: '12px', background: '#050c17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#a5d6ff', fontFamily: 'monospace', minHeight: '120px' }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Pages CMS</h1>
        <button onClick={openAddModal} style={{
          padding: '10px 20px', background: 'var(--color-accent)', color: '#fff',
          borderRadius: '8px', border: 'none', display: 'flex', gap: '8px', alignItems: 'center',
          cursor: 'pointer', fontWeight: '600'
        }}>
          <Plus size={18} /> Add New Page
        </button>
      </div>

      {loading ? <p>Loading pages...</p> : (
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
              {pages.map(page => (
                <tr key={page.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>{page.title}</td>
                  <td style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>/{page.slug}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
                      background: page.isPublished ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: page.isPublished ? '#10b981' : '#f59e0b'
                    }}>
                      {page.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEditModal(page)} style={{ padding: '6px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(page.id)} style={{ padding: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No pages found.</td></tr>
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
            background: '#0B1E39', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '800px',
            border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ margin: 0 }}>{editingId ? 'Edit Page' : 'Add Page'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Title</label>
                  <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="e.g. Home" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Slug</label>
                  <input required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="e.g. home" />
                </div>
              </div>

              {/* Dynamic Sections Builder */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Dynamic Sections</label>
                  <button type="button" onClick={() => setShowSectionPicker(p => !p)} style={{ padding: '6px 12px', background: showSectionPicker ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <Plus size={14} /> Add Section
                  </button>
                </div>

                {/* Section Picker Panel */}
                {showSectionPicker && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '12px' }}>
                      Select a section to add to this page:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                      {getAllowedSections().map(s => {
                        const alreadyAdded = formData.sections.some(sec => sec.type === s.type);
                        return (
                          <button
                            key={s.type}
                            type="button"
                            disabled={alreadyAdded}
                            onClick={() => addSectionOfType(s.type)}
                            style={{
                              padding: '12px', background: alreadyAdded ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                              border: `1px solid ${alreadyAdded ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)'}`,
                              borderRadius: '8px', color: alreadyAdded ? 'rgba(255,255,255,0.3)' : '#fff',
                              cursor: alreadyAdded ? 'not-allowed' : 'pointer', textAlign: 'left',
                              transition: 'all 0.2s',
                            }}
                          >
                            <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>{s.label} {alreadyAdded ? '✓' : ''}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.3' }}>{s.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {formData.sections.map((section, index) => (
                    <div key={index} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ background: 'var(--color-accent)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem' }}>{section.type}</span>
                          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Section {index + 1}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button type="button" onClick={() => moveSection(index, 'up')} disabled={index === 0} style={{ background: 'none', border: 'none', color: index === 0 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: index === 0 ? 'default' : 'pointer' }}><ArrowUp size={16} /></button>
                          <button type="button" onClick={() => moveSection(index, 'down')} disabled={index === formData.sections.length - 1} style={{ background: 'none', border: 'none', color: index === formData.sections.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: index === formData.sections.length - 1 ? 'default' : 'pointer' }}><ArrowDown size={16} /></button>
                          <button type="button" onClick={() => removeSection(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '8px' }}><Trash2 size={16} /></button>
                        </div>
                      </div>

                      <SectionEditor
                        section={section}
                        index={index}
                        onChange={(newContent) => updateSectionContent(index, newContent)}
                      />

                    </div>
                  ))}
                  {formData.sections.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', color: 'rgba(255,255,255,0.5)' }}>
                      No sections added yet. Click "Add Section" to build your page.
                    </div>
                  )}
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

              {/* General Page Content (Fallback/Simple) */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Simple Page Content (Optional HTML/Markdown)</label>
                <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '100px', fontFamily: 'monospace' }} placeholder="Only use if you don't want to use dynamic sections above..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>SEO Title</label>
                  <input value={formData.metaTitle} onChange={e => setFormData({ ...formData, metaTitle: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="Webify Pro - Home" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>SEO Description</label>
                  <textarea value={formData.metaDescription} onChange={e => setFormData({ ...formData, metaDescription: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '80px' }} placeholder="Brief SEO description" />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                <input type="checkbox" id="page-published" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} style={{ width: '20px', height: '20px' }} />
                <label htmlFor="page-published">Is Published</label>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ padding: '12px 24px', background: 'var(--color-accent)', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', opacity: saving ? 0.7 : 1 }}>
                  <Save size={18} /> {saving ? 'Saving...' : 'Save Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
