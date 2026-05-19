const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const axios = require('axios');



const port = new SerialPort({
    path: 'COM7', // Windows
    baudRate: 9600
});

const parser = port.pipe(
    new ReadlineParser({ delimiter: '\r\n' })
);
port.on('open', () => {
    console.log('Serial listener gestartet');
});

parser.on('data', async (line) => {
    console.log('RAW:', line);

    // Nur JSON Zeilen verarbeiten
    if (!line.startsWith('{')) {
        console.log('⏭ Ignored:', line);
        return;
    }
    try {
        const data = JSON.parse(line);

        console.log('📥 Parsed:', data);

        const response = await axios.post(
            'http://localhost:3000/api/measurements',
            data
        );

        console.log('✅ Gespeichert:', response.data);

    } catch (err) {
        console.error('❌ Fehler:', err.message);
    }
});