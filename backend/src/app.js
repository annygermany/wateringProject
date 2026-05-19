require('dotenv').config();
const express = require('express');


const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
const db = require('./config/db');

(async () => {
    try {
        const res = await db.query('SELECT NOW()');
        console.log('DB connected:', res.rows[0]);
    } catch (err) {
        console.error('DB error:', err);
    }
})();

// const plantRoutes = require('./routes/plantRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
// app.use('/api/plants', plantRoutes);
app.use('/api/measurements', measurementRoutes);