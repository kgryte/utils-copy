'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var PINF = require( 'const-pinf-float64' );
var copy = require( './../lib/deepcopy.js' );
var fixtures = require( './fixtures' );


// VARIABLES //

var LEVEL = PINF;


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof copy, 'function', 'export is a function' );
	t.end();
});

tape( 'copy primitives', function test( t ) {
	var values;
	var actual;
	var val;
	var cp;
	var i;

	values = [
		'beep',
		5,
		null,
		undefined,
		true
	];

	for ( i = 0; i < values.length; i++ ) {
		val = values[ i ];
		cp = {};
		actual = copy( val, cp, [val], [cp], LEVEL );
		t.equal( actual, val, 'copies a ' + (typeof val) + ' primitive' );
	}
	t.end();
});

tape( 'copy NaN', function test( t ) {
	var actual;
	var val;
	var cp;

	val = NaN;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, actual, 'copies a NaN primitive' );
	t.end();
});

tape( 'copy typed arrays', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.int16arr;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'copy Boolean objects to boolean primitives', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.bool;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( typeof actual, 'object', 'not an object' );
	t.equal( actual, true, 'equal values' );

	t.end();
});

tape( 'copy String objects to string primitives', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.str;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( typeof actual, 'object', 'not an object' );
	t.equal( actual, 'beep', 'equal values' );

	t.end();
});

tape( 'copy Number objects to number primitives', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.num;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( typeof actual, 'object', 'not an object' );
	t.equal( actual, Math.PI, 'equal values' );

	t.end();
});

tape( 'copy Date objects', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.date;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	t.equal( +actual, +val, 'equal values' );

	t.end();
});

tape( 'copy RegExp objects', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.re;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	t.equal( actual.toString(), val.toString(), 'equal values' );

	t.end();
});

tape( 'copy Error objects', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.err;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'copy special Error objects (e.g., TypeError, etc)', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.terr;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'copy Node buffers', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.buffer;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'clone (simple) class instances', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.foo;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'if an environment does not support at least ES5, the function will return an empty object for class instances', function test( t ) {
	var actual;
	var freeze;
	var val;
	var cp;

	val = fixtures.bar;
	cp = {};

	freeze = Object.freeze;
	Object.freeze = undefined;

	actual = copy( val, cp, [val], [cp], LEVEL );
	assert.deepEqual( actual, {} );
	t.ok( true, 'deep equal' );

	Object.freeze = freeze;
	t.end();
});

tape( 'copy complex arrays', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.arr;
	cp = [];
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, fixtures.expectedArray );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'copy Sets', function test( t ) {
	var actual;
	var val;
	var cp;
	if ( typeof Set === 'undefined' ) {
		t.ok( true, 'sets are not supported' );
		t.end();
		return;
	}
	val = fixtures.set;
	cp = {};

	actual = copy( val, cp, [val], [cp], LEVEL );
	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	val = { 'set': val };
	cp = {};

	actual = copy( val, cp, [val], [cp], LEVEL );
	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'copy Maps', function test( t ) {
	var actual;
	var val;
	var cp;
	if ( typeof Map === 'undefined' ) {
		t.ok( true, 'maps are not supported' );
		t.end();
		return;
	}
	val = fixtures.map;
	cp = {};

	actual = copy( val, cp, [val], [cp], LEVEL );
	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	val = [ val ];
	cp = [];

	actual = copy( val, cp, [val], [cp], LEVEL );
	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.end();
});

tape( 'object which cannot be extended', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.cantExtend;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.ok( !Object.isExtensible( actual ), 'cannot be extended' );

	t.end();
});

tape( 'object which is sealed', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.sealed;
	cp = [];
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.ok( Object.isSealed( actual ), 'is sealed' );

	t.end();
});

tape( 'object which is frozen', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.frozen;
	cp = {};
	actual = copy( val, cp, [val], [cp], LEVEL );

	t.notEqual( actual, val, 'distinct references' );
	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );

	t.ok( Object.isFrozen( actual ), 'is frozen' );

	t.end();
});

tape( 'circular references', function test( t ) {
	var actual;
	var val;
	var cp;

	val = {};
	cp = {};

	val.to = val;
	actual = copy( val, cp, [val], [cp], LEVEL );

	assert.deepEqual( actual, val );
	t.ok( true, 'deep equal' );
	t.equal( actual, actual.to, 'circular reference' );

	t.end();
});

tape( 'arbitrary depth', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.obj;
	cp = {};

	actual = copy( val, cp, [val], [cp], 1 );
	assert.deepEqual( actual, fixtures.expectedObj1 );
	t.ok( true, 'level 1' );

	t.equal( actual.bool, fixtures.expectedObj1.bool, 'boolean primitive' );

	t.equal( actual.uint8carr, fixtures.expectedObj1.uint8carr, 'share typed array ref' );

	t.equal( actual.arr, fixtures.expectedObj1.arr, 'share array ref' );

	t.equal( actual.obj, fixtures.expectedObj1.obj, 'share object ref' );

	t.end();
});

tape( 'arbitrary depth', function test( t ) {
	var actual;
	var val;
	var cp;

	val = fixtures.obj;
	cp = {};

	actual = copy( val, cp, [val], [cp], 2 );

	assert.deepEqual( actual, fixtures.expectedObj2 );
	t.ok( true, 'deep equal' );

	t.equal( actual.bool, fixtures.expectedObj2.bool, 'boolean primitive' );

	t.notEqual( actual.uint8carr, fixtures.expectedObj2.uint8carr, 'distinct typed arrays' );

	t.notEqual( actual.arr, fixtures.expectedObj2.arr, 'distinct arrays' );

	t.notEqual( actual.obj, fixtures.expectedObj2.obj, 'distinct objects' );

	t.equal( actual.obj.a, fixtures.expectedObj2.obj.a, 'shared nested objects' );

	t.end();
});

tape( 'property descriptors (primitives)', function test( t ) {
	var actual;
	var desc;
	var obj;
	var cp;

	obj = {};
	desc = {
		'value': 'b',
		'writable': false,
		'enumerable': true,
		'configurable': false
	};

	Object.defineProperty( obj, 'a', desc );

	cp = {};
	actual = copy( obj, cp, [obj], [cp], LEVEL );

	assert.deepEqual( actual, obj );
	t.ok( true, 'deep equal' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( actual, 'a' ), desc );
	t.ok( true, 'property descriptor' );

	t.end();
});

tape( 'data property descriptors', function test( t ) {
	var actual;
	var desc;
	var obj;
	var cp;

	obj = {};
	desc = {
		'value': 'b',
		'writable': false,
		'enumerable': true,
		'configurable': false
	};

	Object.defineProperty( obj, 'a', desc );

	cp = {};
	actual = copy( obj, cp, [obj], [cp], LEVEL );

	assert.deepEqual( actual, obj );
	t.ok( true, 'deep equal' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( actual, 'a' ), desc );
	t.ok( true, 'property descriptor' );

	t.end();
});

tape( 'accessor property descriptors', function test( t ) {
	var actual;
	var desc;
	var obj;
	var cp;

	obj = {};
	desc = {
		'enumerable': true,
		'configurable': false,
		'get': function get() { return 5; },
		'set': function set() {}
	};

	Object.defineProperty( obj, 'a', desc );

	cp = {};
	actual = copy( obj, cp, [obj], [cp], LEVEL );

	assert.deepEqual( actual, obj );
	t.ok( true, 'deep equal' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( actual, 'a' ), desc );
	t.ok( true, 'property descriptor' );

	t.end();
});

tape( 'data property descriptors (nested)', function test( t ) {
	var actual;
	var desc1;
	var desc2;
	var obj1;
	var obj2;
	var cp;

	obj2 = {};
	desc2 = {
		'configurable': true,
		'enumerable': true,
		'get': function get() { return 5; },
		'set': function set() {}
	};

	Object.defineProperty( obj2, 'b', desc2 );

	obj1 = {};
	desc1 = {
		'value': obj2,
		'writable': false,
		'enumerable': true,
		'configurable': false
	};

	Object.defineProperty( obj1, 'a', desc1 );

	cp = {};
	actual = copy( obj1, cp, [obj1], [cp], LEVEL );

	assert.deepEqual( actual, obj1 );
	t.ok( true, 'deep equal' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( actual, 'a' ), desc1 );
	t.ok( true, 'property descriptor `a`' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( actual.a, 'b' ), desc2 );
	t.ok( true, 'property descriptor `b`' );

	t.end();
});

tape( 'accessor property descriptors (deep)', function test( t ) {
	var actual;
	var desc1;
	var desc2;
	var obj1;
	var obj2;
	var cp;

	obj2 = {};
	desc2 = {
		'value': obj2,
		'writable': false,
		'enumerable': true,
		'configurable': false
	};
	Object.defineProperty( obj2, 'b', desc2 );

	obj1 = {};
	desc1 = {
		'configurable': true,
		'enumerable': true,
		'get': function get() { return obj2; },
		'set': function set() {}
	};
	Object.defineProperty( obj1, 'a', desc1 );

	cp = {};
	actual = copy( obj1, cp, [obj1], [cp], LEVEL );

	assert.deepEqual( actual, obj1 );
	t.ok( true, 'deep equal' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( actual, 'a' ), desc1 );
	t.ok( true, 'property descriptor `a`' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( actual.a, 'b' ), desc2 );
	t.ok( true, 'property descriptor `b`' );

	t.end();
});
