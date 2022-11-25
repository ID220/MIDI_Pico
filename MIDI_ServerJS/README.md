# Examples usage

Here an example of how you can call teh function `noteOn` to play a scale of notes.

```js
// Play notes from 0 to 100,e ach for 100ms
let i = 0;
const x = setInterval(() => {
  if (i == 100) {
    clearInterval(x);
  }
  noteOn(3, i++, 127, 100);
}, 100);
```
