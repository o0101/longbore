# DOSY

Memorizable, simple 8-bit random number generators that pass PractRand.

The round function is only a few lines long.

```js
  function round() {
    let j = 44;
    let sum = 1;
    for( let i = 0; i < 45; i++ ) {
      s[j] ^= (s[i] >> 1) ^ (sum << 1);
      s[i] += s[j] + 1;
      j = ( j + 1 ) % 45;
      sum += s[i];
    }
    return sum & 255;
  }
```

That's it.

DOSY defines a family of truly superb, super-simple, variable-state PRNGs ( pseudorandom number generators ) / CSPRNGs ( cryptogrpahically secure pseudorandom number generators ), that are both extraordinarily simple, and pass PractRand.

# Install & Using

If you're using node you can just `npm install dosy` and 

```js
const dosy = require('dosy');
const rng = dosy.d451();

console.log( rng.next().value );
```

The RNGs are wrapped as [generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators), so you can easily do:

```js
let count = 0;
for( const rvar of rng ) {
  console.log( rvar );
  if ( count++ > 100 ) break;
}
```

To run it in the browser, just download the `index.js` file, save it as `dosy.js`, host it somewhere and load it as a script

```html
  <script src=/dosy.js></script>
  <script>
    const rng = dosy.d451();
  </script>
```

# Use Cases

Dosy is not super fast ( it iterates its entire state once for each output byte ), and it was designed to mostly generate short keystreams to encrypt short messages, under 4K in length. 

# Test Results

Dosy was tested using [PractRand](http://pracrand.sourceforge.net/) which is a [top-notch bias finder for RNGs](https://stackoverflow.com/a/27160492/7652736). Despite being so simple to implement, both D451 and D453 passed PractRand ( at 16 MB, 32 MB and 64 MB, no other sequence lengths were generated ). No other values of the parameters have been tested so far. 

# Naming

The DOSY structure defines a family of generators specified by their state length ( in bytes ) and a bit shift ( in bits ). Each algorithm is named like 

`D451 - 45 bytes of state, 1 bit of shift`

or, more generally like, `DXXY`.

Where `XX` ( or `XXX` or `XXXX` and so on, is the state length ) and `Y` is the bit shift. 

# Key Scheduling

You can access the interal state of the generator ( after the first value has been generated ). You can do whatever you like to this state. The state is a [Typed Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) so standard Typed Array APIs apply. 

You can implement your own key scheduling algorithm to include a key to seed the generator, like I did. I used a "sponge" construction, with the first 5 bytes set to absorb the key, by successive rounds, and the last 40 bytes set to the "spare capacity". This key scheduling algorithm worked well, and it's not the only way you can seed this family of generators.


