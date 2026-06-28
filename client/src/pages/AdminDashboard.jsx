import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Plus, CheckCircle, Circle, Trash2, Edit3, Save } from 'lucide-react';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050714', color: '#f0f0ff', fontFamily: 'Outfit, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{
        width: '260px',
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
            <LayoutDashboard size={20} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, background: 'linear-gradient(90deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Webify Admin
          </h2>
        </div>

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
            {projects.filter(p => p.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || p.service?.toLowerCase().includes(searchTerm.toLowerCase())).map(p => {
              // Status Colors
              let statusColor = 'rgba(255,255,255,0.3)';
              if (p.status === 'active') statusColor = '#25d366';
              if (p.status === 'completed') statusColor = '#3b82f6';
              if (p.status === 'pending') statusColor = '#eab308';
              if (p.status === 'cancelled') statusColor = '#ef4444';

              return (
                <button
                  key={p._id}
                  onClick={() => setSelectedProject(p)}
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
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{p.customerName}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{p.service}</span>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor, marginTop: '4px' }} title={`Status: ${p.status || 'pending'}`} />
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '12px',
            background: 'rgba(255,77,77,0.1)',
            border: '1px solid rgba(255,77,77,0.2)',
            color: '#ff4d4d',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            marginTop: 'auto'
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
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
            <h2>Select a project to manage</h2>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectDetail({ project, token, onUpdate, refreshProjects, onDelete }) {
  const [newTask, setNewTask] = useState('');
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetVal, setBudgetVal] = useState(project.assignedBudget || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const stages = ['Pending', 'Planning', 'Design', 'Development', 'Testing', 'Completed'];

  const handleStageChange = (e) => onUpdate({ developmentStage: e.target.value });
  const handleStatusChange = (e) => onUpdate({ status: e.target.value });

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
      onDelete(); // clears selection and refreshes list
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '2rem', margin: 0, color: '#fff' }}>{project.customerName}</h1>
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
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '1rem' }}>
              <span style={{color: '#a5b4fc'}}>{project.service}</span> • {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div style={{ textAlign: 'right' }}>
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

        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Email</div>
            <div style={{ color: '#fff' }}>{project.customerEmail}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Phone</div>
            <div style={{ color: '#fff' }}>{project.customerPhone}</div>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Order Details</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
              {project.details}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }}>
        
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
                  if ((project.developmentStage || 'Pending') !== s) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if ((project.developmentStage || 'Pending') !== s) {
                    e.currentTarget.style.background = 'transparent';
                  }
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
              { id: 'pending', label: 'Pending', color: '234, 179, 8' },     // Yellow
              { id: 'active', label: 'Active', color: '37, 211, 102' },       // Green
              { id: 'completed', label: 'Completed', color: '59, 130, 246' }, // Blue
              { id: 'cancelled', label: 'Cancelled', color: '239, 68, 68' }   // Red
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
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'transparent';
                    }
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Task Checklist</h3>
          
          {/* Progress Bar */}
          {project.tasks && project.tasks.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '200px' }}>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
                  width: `${(project.tasks.filter(t => t.completed).length / project.tasks.length) * 100}%`,
                  transition: 'width 0.4s ease'
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
            <Plus size={18} /> Add
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {project.tasks?.length === 0 ? (
            <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px' }}>No tasks assigned yet.</div>
          ) : (
            project.tasks?.map(task => (
              <div key={task._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => toggleTask(task._id, task.completed)}>
                  {task.completed ? <CheckCircle size={20} color="#25d366" /> : <Circle size={20} color="rgba(255,255,255,0.3)" />}
                  <span style={{ color: task.completed ? 'rgba(255,255,255,0.5)' : '#fff', textDecoration: task.completed ? 'line-through' : 'none', transition: 'all 0.2s' }}>
                    {task.name}
                  </span>
                </div>
                <button onClick={() => deleteTask(task._id)} style={{ background: 'none', border: 'none', color: 'rgba(255,77,77,0.5)', cursor: 'pointer' }}>
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
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#0a0d1c', border: '1px solid rgba(255,50,50,0.3)',
            borderRadius: '24px', padding: '40px', width: '90%', maxWidth: '400px',
            textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,50,50,0.1)'
          }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(255,50,50,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
              <Trash2 size={32} color="#ff4d4d" />
            </div>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 12px 0', color: '#fff' }}>Delete Project?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 32px 0', lineHeight: 1.5 }}>
              Are you sure you want to permanently delete the project for <strong style={{color:'#fff'}}>{project.customerName}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
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
