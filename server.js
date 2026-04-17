import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { INVENTORY, SMART_LOGIC } from './src/lib/engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Serve static frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

// API Endpoints
app.get('/api/inventory', (req, res) => {
    res.json(INVENTORY);
});

app.post('/api/recommendations', (req, res) => {
    const { cart } = req.body;
    const recommendations = SMART_LOGIC.getRecommendations(cart || []);
    const bundle = SMART_LOGIC.getBundles(cart || []);
    const nudge = SMART_LOGIC.getNudges(cart ? cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0);

    res.json({ recommendations, bundle, nudge });
});

// Use middleware for SPA fallback (Express 5 safe)
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 LuminaCart Online at http://0.0.0.0:${PORT}`);
});
