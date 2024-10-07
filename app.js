const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory storage for courses
let courses = [
    { id: 1, title: "JavaScript Basics", description: "Learn the fundamentals of JS", duration: "3 hours" },
    { id: 2, title: "Node.js for Beginners", description: "Introduction to Node.js", duration: "5 hours" }
];

// GET all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// POST a new course
app.post('/courses', (req, res) => {
    const { title, description, duration } = req.body;
    if (!title || !description || !duration) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newCourse = {
        id: courses.length + 1,
        title,
        description,
        duration
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// PUT to update a course by ID
app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, duration } = req.body;

    const course = courses.find(c => c.id === parseInt(id));
    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (duration) course.duration = duration;

    res.json(course);
});

// DELETE a course by ID
app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const courseIndex = courses.findIndex(c => c.id === parseInt(id));

    if (courseIndex === -1) {
        return res.status(404).json({ error: 'Course not found' });
    }

    courses.splice(courseIndex, 1);
    res.status(204).send(); // No content on success
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});