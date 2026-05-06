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

db.query('SELECT NOW()')
    .then(res => console.log('DB connected:', res.rows[0]))
    .catch(err => console.error('DB error:', err));

//Route einbinden (wichtig!)
const plantRoutes = require('./routes/plantRoutes');
app.use('/api/plants', plantRoutes);