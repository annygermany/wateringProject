const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({
    path: 'COM7', // Windows
    baudRate: 9600
});

const parser = port.pipe(
    new ReadlineParser({ delimiter: '\r\n' })
);
port.on('open', () => {
    console.log('Port geöffnet');
});

port.on('error', (err) => {
    console.log('Fehler:', err.message);
});

parser.on('data', (data) => {
    console.log('Arduino:', data);
});