const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

// Environment variables or fallback secrets
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'webifypro9@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'webifypro';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_webify_pro_99121';

// Admin Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token, message: 'Login successful' });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
});

// Admin Auth Middleware
const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// ----------------------------------------------------
// Project Management Routes (Protected by requireAdmin)
// ----------------------------------------------------

// GET all projects (Orders)
router.get('/projects', requireAdmin, async (req, res) => {
    try {
        const projects = await Order.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// GET single project
router.get('/projects/:id', requireAdmin, async (req, res) => {
    try {
        const project = await Order.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// PUT update project (stage, budget, status)
router.put('/projects/:id', requireAdmin, async (req, res) => {
    try {
        const { developmentStage, assignedBudget, status } = req.body;
        
        const updateFields = {};
        if (developmentStage !== undefined) updateFields.developmentStage = developmentStage;
        if (assignedBudget !== undefined) updateFields.assignedBudget = assignedBudget;
        if (status !== undefined) updateFields.status = status;

        const updatedProject = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
        res.json(updatedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// DELETE a project entirely
router.delete('/projects/:id', requireAdmin, async (req, res) => {
    try {
        const deletedProject = await Order.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// POST add a task to a project
router.post('/projects/:id/tasks', requireAdmin, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Task name is required' });

        const updatedProject = await Order.findByIdAndUpdate(
            req.params.id,
            { $push: { tasks: { name, completed: false } } },
            { new: true }
        );

        res.json(updatedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add task' });
    }
});

// PUT toggle task completion
router.put('/projects/:id/tasks/:taskId', requireAdmin, async (req, res) => {
    try {
        const { completed } = req.body;
        
        const updatedProject = await Order.findOneAndUpdate(
            { _id: req.params.id, "tasks._id": req.params.taskId },
            { $set: { "tasks.$.completed": completed } },
            { new: true }
        );

        res.json(updatedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE a task
router.delete('/projects/:id/tasks/:taskId', requireAdmin, async (req, res) => {
    try {
        const updatedProject = await Order.findByIdAndUpdate(
            req.params.id,
            { $pull: { tasks: { _id: req.params.taskId } } },
            { new: true }
        );

        res.json(updatedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
