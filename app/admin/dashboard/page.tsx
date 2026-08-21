"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, LayoutDashboard, Briefcase, Mail, FileText, Star, Settings, 
  Menu, X, Trash2, Edit3, Plus, Save, ArrowLeft, CheckCircle, XCircle,
  FileBox, Grid, Link, Image as ImageIcon
} from 'lucide-react';

import PagesCMS from '@/components/admin/PagesCMS';
import ServicesCMS from '@/components/admin/ServicesCMS';
import SolutionsCMS from '@/components/admin/SolutionsCMS';
import NavigationCMS from '@/components/admin/NavigationCMS';
import SettingsCMS from '@/components/admin/SettingsCMS';
import MediaLibrary from '@/components/admin/MediaLibrary';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Data states
  const [stats, setStats] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  // Blog Form State
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    // Fetch all initial data
    Promise.all([
      fetch('/api/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/admin/projects', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/admin/messages', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/admin/reviews', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/admin/blog', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([statsData, projectsData, messagesData, reviewsData, blogData]) => {
      if (statsData.error) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      setStats(statsData);
      setProjects(projectsData);
      setMessages(messagesData);
      setReviews(reviewsData);
      setPosts(blogData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [token, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // ---- MESSAGES CMS ----
  const deleteMessage = async (id: string) => {
    if(!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setMessages(messages.filter(m => m.id !== id));
  };

  // ---- PROJECTS CMS ----
  const updateProjectStatus = async (id: string, newStatus: string) => {
    await fetch(`/api/admin/projects`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id, status: newStatus })
    });
    setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };
  const deleteProject = async (id: string) => {
    if(!confirm("Delete this project order permanently?")) return;
    await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setProjects(projects.filter(p => p.id !== id));
  };

  // ---- REVIEWS CMS ----
  const toggleReviewApproval = async (id: string, approved: boolean) => {
    await fetch(`/api/admin/reviews`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id, approved: !approved })
    });
    setReviews(reviews.map(r => r.id === id ? { ...r, approved: !approved } : r));
  };
  const deleteReview = async (id: string) => {
    if(!confirm("Delete this review permanently?")) return;
    await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setReviews(reviews.filter(r => r.id !== id));
  };

  // ---- BLOG CMS ----
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !currentPost.id;
    const method = isNew ? 'POST' : 'PUT';
    
    const res = await fetch(`/api/admin/blog`, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(currentPost)
    });
    const savedPost = await res.json();
    
    if (isNew) {
      setPosts([savedPost, ...posts]);
    } else {
      setPosts(posts.map(p => p.id === savedPost.id ? savedPost : p));
    }
    setIsEditingPost(false);
  };
  const deletePost = async (id: string) => {
    if(!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setPosts(posts.filter(p => p.id !== id));
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#08172c', color: '#fff' }}>
      <div style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
        Loading Secure Environment...
      </div>
    </div>;
  }

  const TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'pages', label: 'Pages', icon: FileBox },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'solutions', label: 'Solutions', icon: Grid },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'navigation', label: 'Navigation', icon: Link },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#08172c', color: '#FAFAF7', fontFamily: 'Outfit, sans-serif' }}>
      
      {/* Top Navbar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', background: 'rgba(11, 30, 57, 0.7)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--color-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(255,107,53,0.3)' }}>
              <ShieldIcon />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Webify Admin</h2>
          </div>
        </div>

        <button onClick={handleLogout} style={{
          padding: '8px 16px', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.2)',
          color: '#ff4d4d', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          <LogOut size={16} /> <span style={{ display: isMobile ? 'none' : 'inline' }}>Logout</span>
        </button>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Sidebar */}
        <div style={{
          width: '280px', minWidth: '280px', flexShrink: 0,
          background: 'rgba(11, 30, 57, 0.5)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          position: isMobile ? 'absolute' : 'relative',
          top: 0, bottom: 0, left: 0,
          zIndex: 90,
          backdropFilter: 'blur(30px)',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          visibility: (!isSidebarOpen && !isMobile) ? 'hidden' : 'visible',
          marginLeft: (!isSidebarOpen && !isMobile) ? '-280px' : '0'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if(isMobile) setIsSidebarOpen(false); setIsEditingPost(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px',
                  background: activeTab === tab.id && !isEditingPost ? 'var(--color-accent)' : 'transparent',
                  color: activeTab === tab.id && !isEditingPost ? '#fff' : 'rgba(255,255,255,0.6)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  boxShadow: activeTab === tab.id && !isEditingPost ? '0 8px 24px rgba(255,107,53,0.3)' : 'none'
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: isMobile ? '20px' : '40px', overflowY: 'auto' }}>
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Dashboard Overview</h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <StatCard title="Total Projects" value={stats.projects || 0} icon={<Briefcase />} color="#3b82f6" />
                <StatCard title="New Messages" value={stats.messages || 0} icon={<Mail />} color="#f59e0b" />
                <StatCard title="Total Reviews" value={stats.reviews || 0} icon={<Star />} color="#10b981" />
                <StatCard title="Blog Posts" value={stats.posts || 0} icon={<FileText />} color="#8b5cf6" />
              </div>

              <div style={{ 
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
                borderRadius: '24px', padding: '30px', marginTop: '20px',
                backdropFilter: 'blur(20px)'
              }}>
                <h3>System Status</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>All systems operational. Content Management System is online.</p>
              </div>
            </div>
          )}

          {/* CMS Tabs */}
          {activeTab === 'pages' && <PagesCMS token={token} />}
          {activeTab === 'services' && <ServicesCMS token={token} />}
          {activeTab === 'solutions' && <SolutionsCMS token={token} />}
          {activeTab === 'navigation' && <NavigationCMS token={token} />}
          {activeTab === 'media' && <MediaLibrary token={token} />}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>Project Orders CMS</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {projects.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)' }}>No projects found.</p>}
                {projects.map(proj => (
                  <div key={proj.id} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px', padding: '24px', backdropFilter: 'blur(20px)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <select 
                          value={proj.status} 
                          onChange={(e) => updateProjectStatus(proj.id, e.target.value)}
                          style={{
                            padding: '6px 12px', background: 'rgba(255,107,53,0.1)', color: 'var(--color-accent)', 
                            border: '1px solid rgba(255,107,53,0.3)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700',
                            outline: 'none', cursor: 'pointer'
                          }}
                        >
                          <option value="pending" style={{ color: '#000' }}>Pending</option>
                          <option value="in_progress" style={{ color: '#000' }}>In Progress</option>
                          <option value="completed" style={{ color: '#000' }}>Completed</option>
                          <option value="canceled" style={{ color: '#000' }}>Canceled</option>
                        </select>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                          {new Date(proj.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button onClick={() => deleteProject(proj.id)} style={{ background: 'rgba(255,77,77,0.1)', border: 'none', color: '#ff4d4d', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{proj.service}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '16px' }}>Client: {proj.customerName} ({proj.customerEmail}) - {proj.customerPhone}</p>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                      {proj.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>Inbox</h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)' }}>No messages found.</p>}
                {messages.map(msg => (
                  <div key={msg.id} style={{
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '16px', padding: '24px', position: 'relative'
                  }}>
                    <button onClick={() => deleteMessage(msg.id)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{msg.subject}</h3>
                    <div style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      From: {msg.name} ({msg.email}) • {msg.phone}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BLOG CMS */}
          {activeTab === 'blog' && (
            <div>
              {!isEditingPost ? (
                // LIST VIEW
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Blog CMS</h1>
                    <button onClick={() => {
                        setCurrentPost({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', category: 'General', published: false, author: 'Admin' });
                        setIsEditingPost(true);
                      }} 
                      style={{
                        padding: '10px 20px', background: 'var(--color-accent)', color: '#fff', 
                        border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}>
                      <Plus size={18} /> New Post
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {posts.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)' }}>No blog posts yet.</p>}
                    {posts.map(post => (
                      <div key={post.id} style={{
                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}>
                        <div>
                          <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{post.title}</h3>
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ color: post.published ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                              {post.published ? 'Published' : 'Draft'}
                            </span> 
                            • {post.category} • {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button onClick={() => { setCurrentPost(post); setIsEditingPost(true); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => deletePost(post.id)} style={{ background: 'rgba(255,77,77,0.1)', border: 'none', color: '#ff4d4d', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // EDIT VIEW
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <button onClick={() => setIsEditingPost(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
                      <ArrowLeft size={20} />
                    </button>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>{currentPost.id ? 'Edit Post' : 'Create Post'}</h1>
                  </div>

                  <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Title</label>
                        <input required type="text" value={currentPost.title} onChange={e => {
                          const title = e.target.value;
                          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          setCurrentPost({...currentPost, title, slug: currentPost.id ? currentPost.slug : slug});
                        }} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                      </div>
                      <div style={{ flex: '1 1 300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Slug (URL-friendly)</label>
                        <input required type="text" value={currentPost.slug} onChange={e => setCurrentPost({...currentPost, slug: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Category</label>
                        <input type="text" value={currentPost.category} onChange={e => setCurrentPost({...currentPost, category: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                      </div>
                      <div style={{ flex: '1 1 300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Cover Image URL</label>
                        <input type="text" value={currentPost.imageUrl || ''} onChange={e => setCurrentPost({...currentPost, imageUrl: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Excerpt (Short summary)</label>
                      <textarea required value={currentPost.excerpt} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} rows={2} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', resize: 'vertical' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Content (Markdown / Text)</label>
                      <textarea required value={currentPost.content} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} rows={12} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', resize: 'vertical', fontFamily: 'monospace' }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input type="checkbox" id="published" checked={currentPost.published} onChange={e => setCurrentPost({...currentPost, published: e.target.checked})} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                      <label htmlFor="published" style={{ cursor: 'pointer', color: '#fff', fontWeight: 'bold' }}>Publish this post immediately</label>
                    </div>

                    <button type="submit" style={{ padding: '14px 24px', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                      <Save size={20} /> Save Post
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === 'reviews' && (
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>Reviews Moderation</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {reviews.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)' }}>No reviews found.</p>}
                {reviews.map(rev => (
                  <div key={rev.id} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px', padding: '24px', position: 'relative',
                    opacity: rev.approved ? 1 : 0.6
                  }}>
                    <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '8px' }}>
                      <button onClick={() => toggleReviewApproval(rev.id, rev.approved)} style={{ background: 'none', border: 'none', color: rev.approved ? '#10b981' : '#f59e0b', cursor: 'pointer' }} title={rev.approved ? "Approved" : "Hidden"}>
                        {rev.approved ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </button>
                      <button onClick={() => deleteReview(rev.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: rev.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                        {rev.avatar}
                      </div>
                      <div>
                        <h4 style={{ margin: 0 }}>{rev.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{rev.role}</p>
                      </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontStyle: 'italic' }}>"{rev.review}"</p>
                    <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                      Rating: {rev.rating}/5 • {rev.approved ? 'Visible on site' : 'Hidden from site'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && <SettingsCMS token={token} />}

        </div>
      </div>
    </div>
  );
}

// Subcomponents for internal use
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.1, transform: 'scale(2.5)', color: color }}>
        {icon}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}20`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>{title}</span>
      </div>
      <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{value}</div>
    </div>
  );
}
