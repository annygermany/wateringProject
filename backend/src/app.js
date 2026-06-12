// Schritt 6: greift auf die Routes zu

require('dotenv').config();

const express = require('express');

const measurementRoutes =
    require('./routes/measurementRoutes');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

app.use(
    '/api/measurements',
    measurementRoutes
);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `Server läuft auf Port ${PORT}`
    );
});