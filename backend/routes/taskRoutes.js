const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// POST new task
router.post('/', async (req, res) => {
    try {

        if (Array.isArray(req.body)) {

            const tasks = await Task.insertMany(req.body);
            res.status(201).json(tasks);
        } else {

            const newTask = new Task(req.body);
            await newTask.save();
            res.status(201).json(newTask);
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
});


// PUT update task
router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
