import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');
const DESIGN_FILE = path.join(__dirname, 'design.json');

// Initialize data files if they don't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ rsvps: [], messages: [] }, null, 2));
}
if (!fs.existsSync(DESIGN_FILE)) {
    fs.writeFileSync(DESIGN_FILE, JSON.stringify({}, null, 2));
}

const getData = () => {
    try {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        return { rsvps: [], messages: [] };
    }
};

const getDesign = () => {
    try {
        const content = fs.readFileSync(DESIGN_FILE, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        return {};
    }
};

const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
const saveDesign = (data) => fs.writeFileSync(DESIGN_FILE, JSON.stringify(data, null, 2));

// DESIGN ENDPOINTS
app.get('/api/design', (req, res) => {
    res.json(getDesign());
});

app.post('/api/design', (req, res) => {
    saveDesign(req.body);
    res.json({ message: 'Design saved successfully' });
});

// DATA ENDPOINTS
app.get('/api/data', (req, res) => {
    res.json(getData());
});

app.get('/api/rsvps', (req, res) => {
    res.json(getData().rsvps);
});

app.get('/api/messages', (req, res) => {
    res.json(getData().messages);
});

app.post('/api/rsvp', (req, res) => {
    const { name, attendance, guests } = req.body;
    if (!name || attendance === undefined) {
        return res.status(400).json({ error: 'Name and attendance are required' });
    }
    const data = getData();
    const newRSVP = { 
        id: uuidv4(), 
        name, 
        attendance, 
        guests: parseInt(guests) || 1, 
        date: new Date().toISOString() 
    };
    data.rsvps.unshift(newRSVP);
    saveData(data);
    res.status(201).json(newRSVP);
});

app.delete('/api/rsvp/:id', (req, res) => {
    const { id } = req.params;
    const data = getData();
    const initialLength = data.rsvps.length;
    data.rsvps = data.rsvps.filter(r => r.id !== id);
    if (data.rsvps.length < initialLength) {
        saveData(data);
        res.json({ message: 'RSVP deleted successfully' });
    } else {
        res.status(404).json({ error: 'RSVP not found' });
    }
});

app.post('/api/message', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }
    const data = getData();
    const newMessage = { 
        id: uuidv4(), 
        name, 
        message, 
        date: new Date().toISOString(),
        likes: 0
    };
    data.messages.unshift(newMessage);
    saveData(data);
    res.status(201).json(newMessage);
});

app.delete('/api/message/:id', (req, res) => {
    const { id } = req.params;
    const data = getData();
    const initialLength = data.messages.length;
    data.messages = data.messages.filter(m => m.id !== id);
    if (data.messages.length < initialLength) {
        saveData(data);
        res.json({ message: 'Message deleted successfully' });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});

app.post('/api/message/:id/like', (req, res) => {
    const { id } = req.params;
    const data = getData();
    const message = data.messages.find(m => m.id === id);
    if (message) {
        message.likes = (message.likes || 0) + 1;
        saveData(data);
        res.json(message);
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});

// DELETE ALL DATA (Wipe for fresh start)
app.delete('/api/all', (req, res) => {
    saveData({ rsvps: [], messages: [] });
    saveDesign({}); // Also wipe the design!
    res.json({ message: 'All data and design wiped successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
