const { initMidi, noteOn, noteOff } = require('./midi_controller');
const { SerialPort } = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter');
const path = require('path');

const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

const envVariables = process.env;
const { MIDI_INTERFACE, SERIAL_PORT, BAUDRATE } = envVariables;

initMidi(MIDI_INTERFACE);

const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUDRATE | 0 });

const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }));
parser.on('data', (data) => {
  let str = '' + data;
  console.log('Received ' + str);

  const arr = str.toLowerCase().split(',');
  if (arr.length != 5) return;
  const midi = arr[0] == 'midi';
  if (!midi) return;

  const channel = arr[1];
  const note = arr[2];
  const velocity = arr[3];
  const duration = arr[4];
  noteOn(channel, note, velocity, duration);
});
