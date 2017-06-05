"use strict";
{
  // DOSY - A family of 8-bit PRNGs ( CSPRNGs ) that are extraordinarily simple & pass PracRand
  // For ref of PracRand - http://pracrand.sourceforge.net/
  // To access the state ( to say, 'key' the generator ), pass in a 'surface' object
  const dosy = {
    d451: surface => generator( 45, 1, surface ), // passes PracRand
    d453: surface => generator( 45, 3, surface ), // passes PracRand
    raw: generator // other values are untested. Set your own!
  };

  // Node.js or Browser, either is fine
  try { module.exports = dosy; } catch( e ) { Object.assign( self, { dosy } ); }

  // The main DOSY round function very simple and easy to memorize
  function update( s, SZ, shift ) {
    let j = SZ-1;
    let sum = 1;
    for( let i = 0; i < SZ; i++ ) {
      s[j] ^= (s[i] >> shift) ^ (sum << shift);
      s[i] += s[j] + 1;
      j = ( j + 1 ) % SZ;
      sum += s[i];
    }
    return sum & 255;
  }

  // A generator wrapper to create the state and turn the round function
  function *generator( state_sz = 45 /* bytes */, shift = 1 /* bits */, surface = {} /* .s is the state */) {
    const s = new Uint8Array(state_sz);
    expose( surface, 'state', s );
    while( true ) {
      yield update(s, state_sz, shift);
    }
  }

  function expose( obj, key, val ) {
    Object.defineProperty( obj, key, { enumerable: true, get : () => val } );
  }
}
