import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Plus, CheckCircle, Circle, Trash2, Edit3, Save, Menu, X } from 'lucide-react';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Responsive sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [token, navigate]);

  const fetchProjects = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/admin/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, updates) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const updated = await res.json();
      setProjects(projects.map(p => p._id === id ? updated : p));
      if (selectedProject?._id === id) setSelectedProject(updated);
    } catch (err) {
      alert('Failed to update project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050714', color: '#fff' }}>Loading Data...</div>;
  }

  return (
    <div className="admin-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#050714', color: '#f0f0ff', fontFamily: 'Outfit, sans-serif' }}>
      
      {/* Top Navbar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', background: 'rgba(5, 7, 20, 0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
              <LayoutDashboard size={18} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, background: 'linear-gradient(90deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Webify Admin
            </h2>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'rgba(255,77,77,0.1)',
            border: '1px solid rgba(255,77,77,0.2)',
            color: '#ff4d4d',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,77,77,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,77,77,0.1)'}
        >
          <LogOut size={16} /> <span className="hide-mobile">Logout</span>
        </button>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {/* Sidebar Drawer */}
        <div className={`sidebar-drawer ${isSidebarOpen ? 'open' : 'closed'}`} style={{
          width: '280px',
          background: '#0a0d1c',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 0, bottom: 0, left: 0,
          zIndex: 90,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isSidebarOpen && isMobile ? '4px 0 24px rgba(0,0,0,0.5)' : 'none'
        }}>
          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Active</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#25d366' }}>{projects.filter(p => p.status === 'active').length}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Revenue</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>${projects.reduce((acc, p) => acc + (p.assignedBudget || 0), 0)}</div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Projects ({projects.length})</p>
            </div>
            
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', padding: '10px 12px', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', 
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none',
                fontSize: '0.9rem', flexShrink: 0
              }}
            />

            <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
              {projects.filter(p => p.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || p.service?.toLowerCase().includes(searchTerm.toLowerCase())).map(p => {
                let statusColor = 'rgba(255,255,255,0.3)';
                if (p.status === 'active') statusColor = '#25d366';
                if (p.status === 'completed') statusColor = '#3b82f6';
                if (p.status === 'pending') statusColor = '#eab308';
                if (p.status === 'cancelled') statusColor = '#ef4444';

                return (
                  <button
                    key={p._id}
                    onClick={() => {
                      setSelectedProject(p);
                      if (isMobile) setIsSidebarOpen(false); // Auto close on mobile
                    }}
                    style={{
                      padding: '12px',
                      background: selectedProject?._id === p._id ? 'rgba(99,102,241,0.15)' : 'transparent',
                      border: `1px solid ${selectedProject?._id === p._id ? 'rgba(99,102,241,0.4)' : 'transparent'}`,
                      borderRadius: '10px',
                      color: selectedProject?._id === p._id ? '#fff' : 'rgba(255,255,255,0.6)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '4px',
                      flexShrink: 0
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.customerName}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{p.service}</span>
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor, marginTop: '4px', flexShrink: 0 }} title={`Status: ${p.status || 'pending'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && isMobile && (
          <div 
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 80, backdropFilter: 'blur(4px)' }}
          />
        )}

        {/* Main Content Area */}
        <div className={`main-content ${isSidebarOpen && !isMobile ? 'expanded' : ''}`} style={{ flex: 1, padding: '30px', overflowY: 'auto', background: '#050714' }}>
          {selectedProject ? (
            <ProjectDetail 
              project={selectedProject} 
              token={token} 
              onUpdate={(updates) => updateProject(selectedProject._id, updates)} 
              refreshProjects={fetchProjects}
              onDelete={() => {
                setSelectedProject(null);
                fetchProjects();
              }}
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', flexDirection: 'column', gap: '16px' }}>
              <LayoutDashboard size={48} opacity={0.5} />
              <h2 style={{ textAlign: 'center' }}>Select a project to manage</h2>
              <button 
                className="mobile-show-menu-btn"
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  padding: '12px 24px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                  color: '#a5b4fc', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'none'
                }}
              >
                Open Project List
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Custom Scrollbar for Project List */
        .project-list::-webkit-scrollbar { width: 4px; }
        .project-list::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 4px; }
        
        .main-content {
          transform: translateX(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .sidebar-drawer.closed { transform: translateX(-100%); }
        .sidebar-drawer.open { transform: translateX(0); }

        @media (min-width: 769px) {
          .main-content.expanded { transform: translateX(280px); }
        }

        @media (max-width: 768px) {
          .hide-mobile { display: none; }
          .main-content { padding: 20px 16px !important; }
          .mobile-show-menu-btn { display: block !important; }
          .project-header-row { flex-direction: column; gap: 16px; align-items: stretch !important; }
          .project-header-actions { text-align: left !important; }
          .project-detail-grid { grid-template-columns: 1fr !important; }
          .project-detail-span { grid-column: span 1 !important; }
        }
      `}</style>
    </div>
  );
}

function ProjectDetail({ project, token, onUpdate, refreshProjects, onDelete }) {
  const [newTask, setNewTask] = useState('');
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetVal, setBudgetVal] = useState(project.assignedBudget || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const stages = ['Pending', 'Planning', 'Design', 'Development', 'Testing', 'Completed'];

  const saveBudget = () => {
    onUpdate({ assignedBudget: Number(budgetVal) });
    setIsEditingBudget(false);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await fetch(`${apiUrl}/api/admin/projects/${project._id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: newTask })
      });
      setNewTask('');
      refreshProjects();
    } catch (err) { alert('Failed to add task'); }
  };

  const toggleTask = async (taskId, currentStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await fetch(`${apiUrl}/api/admin/projects/${project._id}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ completed: !currentStatus })
      });
      refreshProjects();
    } catch (err) { alert('Failed to update task'); }
  };

  const deleteTask = async (taskId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await fetch(`${apiUrl}/api/admin/projects/${project._id}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      refreshProjects();
    } catch (err) { alert('Failed to delete task'); }
  };

  const deleteEntireProject = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await fetch(`${apiUrl}/api/admin/projects/${project._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setShowDeleteModal(false);
      onDelete(); 
    } catch (err) { alert('Failed to delete project'); }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header Card */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', padding: '30px', marginBottom: '24px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
      }}>
        <div className="project-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0, color: '#fff', wordBreak: 'break-word' }}>{project.customerName}</h1>
              <button 
                onClick={() => setShowDeleteModal(true)}
                title="Delete Project"
                style={{ 
                  background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)', color: '#ff4d4d', 
                  borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(255,50,50,0.1)' 
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,50,50,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,50,50,0.1)'}
              >
                <Trash2 size={20} />
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>
              <span style={{color: '#a5b4fc'}}>{project.service}</span> • {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="project-header-actions" style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Assigned Budget</div>
            {isEditingBudget ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="number" value={budgetVal} onChange={e => setBudgetVal(e.target.value)}
                  style={{ width: '100px', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.5)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
                />
                <button onClick={saveBudget} style={{ background: '#25d366', border: 'none', borderRadius: '6px', padding: '0 12px', color: '#fff', cursor: 'pointer' }}><Save size={16} /></button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: '700', color: '#25d366' }}>
                ${project.assignedBudget || 0}
                <button onClick={() => setIsEditingBudget(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}><Edit3 size={16} /></button>
              </div>
            )}
          </div>
        </div>

        <div className="project-detail-grid" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Email</div>
            <div style={{ color: '#fff', wordBreak: 'break-all' }}>{project.customerEmail}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Phone</div>
            <div style={{ color: '#fff' }}>{project.customerPhone}</div>
          </div>
          <div className="project-detail-span" style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Order Details</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
              {project.details}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }}>
        
        {/* Stage Control */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>Development Stage</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {stages.map(s => (
              <button
                key={s}
                onClick={() => onUpdate({ developmentStage: s })}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: `1px solid ${(project.developmentStage || 'Pending') === s ? 'rgba(99,102,241,1)' : 'rgba(255,255,255,0.1)'}`,
                  background: (project.developmentStage || 'Pending') === s ? 'rgba(99,102,241,0.2)' : 'transparent',
                  color: (project.developmentStage || 'Pending') === s ? '#a5b4fc' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontWeight: (project.developmentStage || 'Pending') === s ? '600' : '400',
                  transition: 'all 0.2s ease',
                  boxShadow: (project.developmentStage || 'Pending') === s ? '0 0 12px rgba(99,102,241,0.3)' : 'none'
                }}
                onMouseOver={(e) => {
                  if ((project.developmentStage || 'Pending') !== s) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseOut={(e) => {
                  if ((project.developmentStage || 'Pending') !== s) e.currentTarget.style.background = 'transparent';
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Global Status */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>Global Status</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              { id: 'pending', label: 'Pending', color: '234, 179, 8' },
              { id: 'active', label: 'Active', color: '37, 211, 102' },
              { id: 'completed', label: 'Completed', color: '59, 130, 246' },
              { id: 'cancelled', label: 'Cancelled', color: '239, 68, 68' }
            ].map(statusObj => {
              const isSelected = (project.status || 'pending') === statusObj.id;
              return (
                <button
                  key={statusObj.id}
                  onClick={() => onUpdate({ status: statusObj.id })}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    border: `1px solid ${isSelected ? `rgba(${statusObj.color}, 0.6)` : 'rgba(255,255,255,0.1)'}`,
                    background: isSelected ? `rgba(${statusObj.color}, 0.15)` : 'transparent',
                    color: isSelected ? `rgb(${statusObj.color})` : 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    fontWeight: isSelected ? '600' : '400',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 0 12px rgba(${statusObj.color}, 0.2)` : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {statusObj.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Manager */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '30px' }}>
        <div className="project-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Task Checklist</h3>
          
          {/* Progress Bar */}
          {project.tasks && project.tasks.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '200px', maxWidth: '100%' }}>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
                  width: '100%',
                  transformOrigin: 'left center',
                  transform: `scaleX(${(project.tasks.filter(t => t.completed).length / project.tasks.length)})`,
                  transition: 'transform 0.4s ease',
                  willChange: 'transform'
                }} />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                {Math.round((project.tasks.filter(t => t.completed).length / project.tasks.length) * 100)}%
              </span>
            </div>
          )}
        </div>
        
        <form onSubmit={addTask} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input 
            type="text" 
            placeholder="Add new task..." 
            value={newTask} 
            onChange={e => setNewTask(e.target.value)}
            style={{ flex: 1, padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '0 20px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <Plus size={18} /> <span className="hide-mobile">Add</span>
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {project.tasks?.length === 0 ? (
            <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px' }}>No tasks assigned yet.</div>
          ) : (
            project.tasks?.map(task => (
              <div key={task._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', flex: 1 }} onClick={() => toggleTask(task._id, task.completed)}>
                  <div style={{ marginTop: '2px' }}>
                    {task.completed ? <CheckCircle size={20} color="#25d366" /> : <Circle size={20} color="rgba(255,255,255,0.3)" />}
                  </div>
                  <span style={{ color: task.completed ? 'rgba(255,255,255,0.5)' : '#fff', textDecoration: task.completed ? 'line-through' : 'none', transition: 'all 0.2s', wordBreak: 'break-word' }}>
                    {task.name}
                  </span>
                </div>
                <button onClick={() => deleteTask(task._id)} style={{ background: 'none', border: 'none', color: 'rgba(255,77,77,0.5)', cursor: 'pointer', padding: '4px' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Beautiful Delete Modal Overlay */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '20px', boxSizing: 'border-box'
        }}>
          <div style={{
            background: '#0a0d1c', border: '1px solid rgba(255,50,50,0.3)',
            borderRadius: '24px', padding: '30px', width: '100%', maxWidth: '400px',
            textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,50,50,0.1)'
          }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(255,50,50,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
              <Trash2 size={32} color="#ff4d4d" />
            </div>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 12px 0', color: '#fff' }}>Delete Project?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 32px 0', lineHeight: 1.5 }}>
              Are you sure you want to permanently delete the project for <strong style={{color:'#fff'}}>{project.customerName}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexDirection: window.innerWidth <= 520 ? 'column' : 'row' }}>
              <button 
                onClick={() => setShowDeleteModal(false)}
                style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Cancel
              </button>
              <button 
                onClick={deleteEntireProject}
                style={{ flex: 1, padding: '14px', background: '#ff4d4d', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(255,77,77,0.3)' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'none'}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
