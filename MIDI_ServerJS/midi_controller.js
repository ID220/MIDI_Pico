const midi = require('midi');

const output = new midi.Output();

function initMidi(portName = '') {
  // Count the available output ports.
  const nPorts = output.getPortCount();
  if (nPorts == 0) throw new Error('No port available');

  const refName = portName.toLowerCase();
  if (refName == '') {
    output.openPort(0);
    console.log(`Connected to '${output.getPortName(0)}'`);
    return;
  }

  for (let i = 0; i < nPorts; i++) {
    const name = output.getPortName(i);
    if (name.toLowerCase() === refName) {
      output.openPort(i);
      console.log(`Connected to '${output.getPortName(i)}'`);
      return;
    }
  }

  throw new Error('No port found');
}

function noteOn(channel, note, velocity = 127, duration = 0) {
  if (channel < 1 || channel > 16) return;
  output.sendMessage([144 + (channel - 1), note, velocity]);
  console.log(
    `Play: note ${note}, velocity ${velocity}, channel ${channel} duration ${duration}`
  );
  if (duration == 0) return;
  setTimeout(() => {
    output.sendMessage([144 + (channel - 1), note, 0]);
  }, duration);
}

function noteOff(channel, note) {
  if (channel < 1 || channel > 16) return;
  output.sendMessage([144 + (channel - 1), note, 0]);
}

//

// // Send a MIDI message.

// let i = 60;
// setInterval(() => {
//
// }, 100);

// // Close the port when done.
// setTimeout(() => {
//   output.closePort();
// }, 10000);
module.exports = { initMidi, noteOn, noteOff };
