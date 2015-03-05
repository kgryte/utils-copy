'use strict';

var createCopy = require( './../lib' );

var arr = [
	{
		'x': new Date(),
		'y': [Math.random(),Math.random()],
		'z': new Int32Array([1,2,3,4]),
		'label': 'Beep'
	},
	{
		'x': new Date(),
		'y': [Math.random(),Math.random()],
		'z': new Int32Array([3,1,2,4]),
		'label': 'Boop'
	}
];

var copy = createCopy( arr );

console.log( arr[ 0 ] === copy[ 0 ] );
// returns false

console.log( arr[ 1 ].y === copy[ 1 ].y );
// returns false


copy = createCopy( arr, 1 );

console.log( arr[ 0 ] === copy[ 0 ] );
// returns true

console.log( arr[ 1 ].z === copy[ 1 ].z );
// returns true
