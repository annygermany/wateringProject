const {SerialPort} = require('serialport');
const {ReadlineParser} =
    require('@serialport/parser-readline');

const axios = require('axios');

const port = new SerialPort({
    path: 'COM7', // anpassen
    baudRate: 9600
});

const parser = port.pipe(
    new ReadlineParser({
        delimiter: '\r\n'
    })
);

console.log('Serial Listener gestartet');

parser.on('data', async (line) => {

    console.log('RAW:', line);

    try {

        const data = JSON.parse(line);
        console.log('parsed data', data);

        console.log('➡ BEFORE AXIOS');

        await axios.post(
            'http://localhost:3000/api/measurements',
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 2000
            }
        );
        console.log('➡ After AXIOS');
        console.log(
            'Messwert gespeichert:',
            data
        );

    } catch (err) {
        console.log(err);
        console.error(
            'Fehler:',
            err.message
        );

    }
});