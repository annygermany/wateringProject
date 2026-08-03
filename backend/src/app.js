// Schritt 6: greift auf die Routes zu
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

const measurementRoutes =
    require('./routes/measurementRoutes');

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
const wateringRoutes =
    require("./routes/wateringRoutes");


app.use(
    "/api",
    wateringRoutes
);