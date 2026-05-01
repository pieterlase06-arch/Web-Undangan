import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ rsvps: [], messages: [] }, null, 2));
}

const getData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.get('/api/data', (req, res) => {
    res.json(getData());
});

app.post('/api/rsvp', (req, res) => {
    const { name, attendance, guests } = req.body;
    if (!name || attendance === undefined) {
        return res.status(400).json({ error: 'Name and attendance are required' });
    }
    const data = getData();
    data.rsvps.push({ name, attendance, guests, date: new Date().toISOString() });
    saveData(data);
    res.status(201).json({ message: 'RSVP submitted successfully' });
});

app.post('/api/message', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }
    const data = getData();
    data.messages.push({ name, message, date: new Date().toISOString() });
    saveData(data);
    res.status(201).json({ message: 'Message sent successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
