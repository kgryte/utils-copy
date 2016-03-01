'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var copy = require( './../lib' );
var fixtures = require( './fixtures' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof copy, 'function', 'export is a function' );
	t.end();
});

tape( 'if provided a nonnegative integer level, the function will throw an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		Math.PI,
		-1,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws when provided a ' + ( typeof values[i] ) );
	}
	t.end();

	function badValue( value ) {
		return function() {
			copy( [1,2,3], value );
		};
	}
});

tape( 'deep copy', function test( t ) {
	var actual;

	// Primitives...
	actual = copy( 'beep' );
	t.equal( actual, 'beep', 'string primitive copy' );

	actual = copy( 5 );
	t.equal( actual, 5, 'number primitive copy' );

	// Arrays...
	actual = copy( fixtures.arr );
	assert.deepEqual( actual, fixtures.expectedArray );
	t.ok( true, 'array copy' );

	// Objects...
	actual = copy( fixtures.obj );
	assert.deepEqual( actual, fixtures.expectedObj2 );
	t.ok( true, 'object copy' );

	t.end();
});

tape( 'deep copy (specified level)', function test( t ) {
	var actual;

	actual = copy( fixtures.obj, 1 );
	assert.deepEqual( actual, fixtures.expectedObj1 );
	t.ok( true, 'copy to depth 1' );

	actual = copy( fixtures.obj, 2 );
	assert.deepEqual( actual, fixtures.expectedObj2 );
	t.ok( true, 'copy to depth 2' );

	t.end();
});

tape( 'when provided a level equal to 0, the function returns the input reference', function test( t ) {
	var actual = copy( fixtures.obj, 0 );
	t.equal( actual, fixtures.obj, 'copy to depth 0' );
	t.end();
});
