import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// STATIC FILES FOR UPLOADS
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

// DATA FILES
const DATA_FILE = path.join(__dirname, 'data.json');
const DESIGN_FILE = path.join(__dirname, 'design.json');

// INIT FILES
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ rsvps: [], messages: [] }, null, 2));
if (!fs.existsSync(DESIGN_FILE)) fs.writeFileSync(DESIGN_FILE, JSON.stringify({}, null, 2));

const getData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const getDesign = () => JSON.parse(fs.readFileSync(DESIGN_FILE, 'utf-8'));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
const saveDesign = (data) => fs.writeFileSync(DESIGN_FILE, JSON.stringify(data, null, 2));

// MULTER CONFIG FOR UPLOADS
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
});
const upload = multer({ storage });

// --- ENDPOINTS ---

// 1. IMAGE UPLOAD
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ url });
});

// 2. DESIGN ENDPOINTS
app.get('/api/design', (req, res) => res.json(getDesign()));
app.post('/api/design', (req, res) => {
    saveDesign(req.body);
    res.json({ message: 'Design updated' });
});

// 3. RSVP & MESSAGES
app.get('/api/data', (req, res) => res.json(getData()));
app.get('/api/messages', (req, res) => res.json(getData().messages));

app.post('/api/rsvp', (req, res) => {
    const { name, attendance, guests } = req.body;
    const data = getData();
    const newRSVP = { id: uuidv4(), name, attendance, guests: guests || 1, date: new Date().toISOString() };
    data.rsvps.unshift(newRSVP);
    saveData(data);
    res.status(201).json(newRSVP);
});

app.post('/api/message', (req, res) => {
    const { name, message } = req.body;
    const data = getData();
    const newMessage = { id: uuidv4(), name, message, date: new Date().toISOString(), likes: 0 };
    data.messages.unshift(newMessage);
    saveData(data);
    res.status(201).json(newMessage);
});

app.post('/api/message/:id/like', (req, res) => {
    const { id } = req.params;
    const data = getData();
    const m = data.messages.find(m => m.id === id);
    if (m) { m.likes = (m.likes || 0) + 1; saveData(data); res.json(m); }
    else res.status(404).json({ error: 'Not found' });
});

// 4. WIPE ALL (DELETE ALL DATA & UPLOADS)
app.delete('/api/all', (req, res) => {
    saveData({ rsvps: [], messages: [] });
    saveDesign({});
    // Optionally delete upload files
    fs.readdirSync(UPLOADS_DIR).forEach(file => fs.unlinkSync(path.join(UPLOADS_DIR, file)));
    res.json({ message: 'Cleaned everything' });
});

app.listen(PORT, () => console.log(`Backend Perfected on port ${PORT}`));
