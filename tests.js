"use strict";
{
  const fs = require('fs');
  const dosy = require('./index.js');
  
  cli();

  function cli() {
    const a = process.argv;
    if ( a.length < 6 ) {
      console.log( 
        `Usage: ${
          tail(a[0])
         } ${
          tail(a[1])
         } <state_sz> <shift> <megs> <out_file>`
      );
      process.exit();
    } else {
      const state_sz = process.argv[2];
      const shift = process.argv[3]; 
      const megs = process.argv[4];
      const out_file = process.argv[5];
      
      const rng = dosy.raw( state_sz, shift );

      console.log( `Generating ${megs} Mb of output with parameters ${state_sz}${shift} to file ${out_file}...` );
      test( rng, megs, out_file );
      console.log( "Done." );
    }
  }

  function tail( path ) {
    return path.slice( path.lastIndexOf('/') + 1 );
  }

  function test( rng, megs, fileName ) {
    const fs = require('fs');
    const MEG = 1024*1024;
    const batch = MEG;
    let bytes = megs*MEG;
    let str = ''; 
    for( const rbyte of rng ) {
      str += String.fromCharCode(rbyte);
      if ( str.length >= batch ) {
        fs.appendFileSync( fileName + ".rng.bin", str, 'binary' );
        str = '';
      }
      if ( bytes-- == 0 ) break;
    }
  }
}
