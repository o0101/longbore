"use strict";
{
	const fs = require('fs');
	const rng = require('dosy').custom( 18, 1 );
	let output = 1<<30;
	const total = output;
	const batch = 1<<23;
	let j = 0;
	const str = new Buffer( batch );
	console.log(`Outputting ${output} bytes...`);
	while(output--) {
		str[j] = rng.round();
		if ( j++ >= batch ) {
			console.log(`Writing ${batch} bytes...` );
			fs.appendFileSync( process.argv[2], str, 'binary' );
			j = 0;
			console.log( `Done. ${Math.ceil(1000*output/total)/10}% remains...`);
		}
	}
        if ( j > 0 ) {
		console.log(`Writing ${batch} bytes...` );
		fs.appendFileSync( process.argv[2], str, 'binary' );
		j = 0;
		console.log( `Done. ${Math.ceil(1000*output/total)/10}% remains...`);
		console.log('Done!');

	}
}
