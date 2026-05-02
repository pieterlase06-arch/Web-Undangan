import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fileUpload from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({ createParentPath: true }));

// STATIC FILES
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOADS_DIR));

// DATABASE SETUP (SQLite for 'Fixed Full Stack')
let db;
const initDB = async () => {
    db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    // Create Tables
    await db.exec(`
        CREATE TABLE IF NOT EXISTS design (
            id INTEGER PRIMARY KEY,
            data TEXT
        );
        CREATE TABLE IF NOT EXISTS rsvps (
            id TEXT PRIMARY KEY,
            name TEXT,
            attendance INTEGER,
            guests INTEGER,
            date TEXT
        );
        CREATE TABLE IF NOT EXISTS messages (
            id TEXT PRIMARY KEY,
            name TEXT,
            message TEXT,
            likes INTEGER,
            date TEXT
        );
        CREATE TABLE IF NOT EXISTS guests (
            id TEXT PRIMARY KEY,
            name TEXT,
            slug TEXT,
            status TEXT
        );
    `);

    // Ensure one design row exists
    const design = await db.get('SELECT * FROM design WHERE id = 1');
    if (!design) {
        await db.run('INSERT INTO design (id, data) VALUES (1, ?)', JSON.stringify({
            partner1: 'Mempelai Pria',
            partner2: 'Mempelai Wanita',
            date: '2024-12-12'
        }));
    }
    console.log('--- DATABASE SYNCED (SQLite) ---');
};

initDB();

// --- ENDPOINTS ---

// 1. IMAGE UPLOAD
app.post('/api/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.image) return res.status(400).send({ error: 'No file' });
        const file = req.files.image;
        const ext = path.extname(file.name);
        const fileName = `${uuidv4()}${ext}`;
        const filePath = path.join(UPLOADS_DIR, fileName);
        
        await file.mv(filePath);
        res.json({ url: `http://localhost:${PORT}/uploads/${fileName}` });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. DESIGN
app.get('/api/design', async (req, res) => {
    const row = await db.get('SELECT data FROM design WHERE id = 1');
    res.json(JSON.parse(row.data));
});

app.post('/api/design', async (req, res) => {
    await db.run('UPDATE design SET data = ? WHERE id = 1', JSON.stringify(req.body));
    res.json({ success: true });
});

// 3. MESSAGES & RSVP
app.get('/api/messages', async (req, res) => {
    const rows = await db.all('SELECT * FROM messages ORDER BY date DESC');
    res.json(rows);
});

app.post('/api/message', async (req, res) => {
    const { name, message } = req.body;
    const id = uuidv4();
    const date = new Date().toISOString();
    await db.run('INSERT INTO messages (id, name, message, likes, date) VALUES (?, ?, ?, 0, ?)', [id, name, message, date]);
    res.json({ id, name, message, date, likes: 0 });
});

app.post('/api/rsvp', async (req, res) => {
    const { name, attendance, guests } = req.body;
    const id = uuidv4();
    const date = new Date().toISOString();
    await db.run('INSERT INTO rsvps (id, name, attendance, guests, date) VALUES (?, ?, ?, ?, ?)', [id, name, attendance ? 1 : 0, guests || 1, date]);
    res.json({ success: true });
});

// 4. GUEST LIST MANAGEMENT (New Feature for 'Perfect' Full Stack)
app.get('/api/guests', async (req, res) => {
    const rows = await db.all('SELECT * FROM guests');
    res.json(rows);
});

app.post('/api/guests', async (req, res) => {
    const { name } = req.body;
    const id = uuidv4();
    const slug = name.toLowerCase().replace(/ /g, '-');
    await db.run('INSERT INTO guests (id, name, slug, status) VALUES (?, ?, ?, ?)', [id, name, slug, 'pending']);
    res.json({ id, name, slug, status: 'pending' });
});

// 5. WIPE SYSTEM
app.delete('/api/all', async (req, res) => {
    await db.run('DELETE FROM rsvps');
    await db.run('DELETE FROM messages');
    await db.run('DELETE FROM guests');
    await db.run('UPDATE design SET data = ? WHERE id = 1', JSON.stringify({}));
    // Clean uploads
    fs.readdirSync(UPLOADS_DIR).forEach(file => fs.unlinkSync(path.join(UPLOADS_DIR, file)));
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`FULL STACK PERFECTED on http://localhost:${PORT}`));
