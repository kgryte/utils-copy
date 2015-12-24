/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' );
var createCopy = require( './../lib' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'utils-copy', function tests() {

	// SETUP  //

	function Set() {
		return this;
	}
	function Map() {
		return this;
	}
	function Foo() {
		this._data = [1,2,3,4];
		this._name = 'bar';
		return this;
	}
	Foo.prototype.beep = 'boop';

	function Bar() {
		Object.defineProperty( this, 'baz', {
			get: function() { return 1; }
		});
		return this;
	}

	var set = new Set();
	var map = new Map();
	var foo = new Foo();
	var bar = new Bar();
	var date = new Date();
	var re = /.*/;
	var bool = new Boolean( true );
	var str = new String( 'beep' );
	var num = new Number( Math.PI );
	var fcn = function(){};
	var buffer = new Buffer([10,20,30,40]);
	var cbuffer = new Buffer( buffer );
	var int8arr = new Int8Array([1,2,3,4]);
	var uint8arr = new Uint8Array([5,6,7,8]);
	var uint8carr = new Uint8ClampedArray([9,10,11,12]);
	var int16arr = new Int16Array([256,257,258]);
	var uint16arr = new Uint16Array([259,260,261]);
	var int32arr = new Int32Array([65537,65538]);
	var uint32arr = new Uint32Array([65539,65540]);
	var float32arr = new Float32Array([Math.PI]);
	var float64arr = new Float64Array([Number.MAX_VALUE]);

	Object.preventExtensions( bar );
	Object.seal( bar );
	Object.freeze( bar );

	var arr = [
		[
			{
				'bool': bool,
				'str': str,
				'num': num,
				'date': date,
				're': re,
				'n': Math.PI,
				'null': null,
				'int8arr': int8arr,
				'obj': {
					'uint16arr': uint16arr
				},
				'fcn': fcn
			},
			bool,
			str,
			num,
			date,
			re,
			Math.PI,
			null,
			float64arr,
			fcn,
			buffer,
			foo,
			bar
		],
		{
			'bool': bool,
			'uint32arr': uint32arr,
			'str': 'beepboop',
			'arr': [
				float32arr,
				date
			]
		},
		bool,
		str,
		num,
		date,
		re,
		fcn,
		null,
		undefined,
		NaN,
		Math.PI,
		'boop',
		int8arr,
		uint8arr,
		uint8carr,
		int16arr,
		uint16arr,
		int32arr,
		uint32arr,
		float32arr,
		float64arr
	];

	var expectedArray = [
		[
			{
				'bool': true,
				'str': 'beep',
				'num': Math.PI,
				'date': new Date( +date ),
				're': /.*/,
				'n': Math.PI,
				'null': null,
				'int8arr': new Int8Array( int8arr ),
				'obj': {
					'uint16arr': new Uint16Array( uint16arr )
				},
				'fcn': fcn
			},
			true,
			'beep',
			Math.PI,
			new Date( +date ),
			/.*/,
			Math.PI,
			null,
			new Float64Array( float64arr ),
			fcn,
			cbuffer,
			new Foo(),
			new Bar()
		],
		{
			'bool': true,
			'uint32arr': new Uint32Array( uint32arr ),
			'str': 'beepboop',
			'arr': [
				new Float32Array( float32arr ),
				new Date( +date )
			]
		},
		true,
		'beep',
		Math.PI,
		new Date( +date ),
		/.*/,
		fcn,
		null,
		undefined,
		NaN,
		Math.PI,
		'boop',
		new Int8Array( int8arr ),
		new Uint8Array( uint8arr ),
		new Uint8ClampedArray( uint8carr ),
		new Int16Array( int16arr ),
		new Uint16Array( uint16arr ),
		new Int32Array( int32arr ),
		new Uint32Array( uint32arr ),
		new Float32Array( float32arr ),
		new Float64Array( float64arr )
	];

	var obj = {
		'bool': bool,
		'uint8carr': uint8carr,
		'arr': [
			'a',
			'b',
			'c'
		],
		'obj': {
			'a': {
				'b': 'c'
			},
			'bool': true
		}
	};

	var expectedObj0 = obj;

	var expectedObj1 = {
		'bool': bool,
		'uint8carr': uint8carr,
		'arr': obj.arr,
		'obj': obj.obj
	};

	var expectedObj2 = {
		'bool': true,
		'uint8carr': new Uint8ClampedArray( uint8carr ),
		'arr': [ 'a', 'b', 'c' ],
		'obj': {
			'a': obj.obj.a,
			'bool': true
		}
	};


	// TESTS //

	it( 'should export a function', function test() {
		expect( createCopy ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a nonnegative integer level', function test() {
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
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				createCopy( [1,2,3], value );
			};
		}
	});

	it( 'should return an empty object if provided Set or Map values (i.e., not supported)', function test() {
		var actual;

		actual = createCopy( set );
		assert.deepEqual( actual, {} );

		actual = createCopy( map );
		assert.deepEqual( actual, {} );

		actual = createCopy( {'set':set} );
		assert.deepEqual( actual, {'set':{}} );

		actual = createCopy( [map] );
		assert.deepEqual( actual, [{}] );
	});

	it( 'should accept primitives', function test() {
		var values;
		var actual;
		var i;

		values = [
			'beep',
			5,
			null,
			undefined,
			true
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = createCopy( values[ i ] );
			assert.strictEqual( actual, values[ i ] );
		}

		actual = createCopy( NaN );
		assert.ok( actual !== actual );
	});

	it( 'should copy typed arrays', function test() {
		var actual = createCopy( int16arr );
		assert.ok( actual !== int16arr );
		assert.deepEqual( actual, int16arr );
	});

	it( 'should copy Boolean objects to primitives', function test() {
		var actual = createCopy( bool );
		assert.ok( typeof actual !== 'object' );
		assert.strictEqual( actual, true );
	});

	it( 'should copy String objects to primitives', function test() {
		var actual = createCopy( str );
		assert.ok( typeof actual !== 'object' );
		assert.strictEqual( actual, 'beep' );
	});

	it( 'should copy Number objects to primitives', function test() {
		var actual = createCopy( num );
		assert.ok( typeof actual !== 'object' );
		assert.strictEqual( actual, Math.PI );
	});

	it( 'should copy Date objects', function test() {
		var actual = createCopy( date );
		assert.ok( actual !== date );
		assert.strictEqual( +actual, +date );
	});

	it( 'should copy RegExp objects', function test() {
		var actual = createCopy( re );
		assert.ok( actual !== re );
		assert.strictEqual( actual.toString(), re.toString() );
	});

	it( 'should copy Node buffers', function test() {
		var actual = createCopy( buffer );
		assert.ok( actual !== buffer );
		assert.strictEqual( JSON.stringify( actual ), JSON.stringify( buffer ) );
	});

	it( 'should clone (simple) class instances', function test() {
		var actual = createCopy( foo );
		assert.ok( actual !== foo );
		assert.deepEqual( actual, foo );
	});

	it( 'should return an empty object for class instances when in environments not supporting at least ES5', function test() {
		var freeze;
		var actual;

		freeze = Object.freeze;
		Object.freeze = undefined;

		actual = createCopy( bar );
		assert.deepEqual( actual, {} );

		Object.freeze = freeze;
	});

	it( 'should deep copy complex arrays', function test() {
		var actual = createCopy( arr );
		assert.deepEqual( actual, expectedArray );
	});

	it( 'should handle circular references', function test() {
		var actual;
		var obj;

		obj = {};
		obj.to = obj;

		actual = createCopy( obj );
		assert.deepEqual( actual, obj );
		assert.strictEqual( actual, actual.to );
	});

	it( 'should copy to an arbitrary depth', function test() {
		var actual;

		actual = createCopy( obj, 1 );

		assert.deepEqual( actual, expectedObj1, 'deep equal' );

		assert.strictEqual( actual.bool, expectedObj1.bool, 'boolean primitive' );

		assert.strictEqual( actual.uint8carr, expectedObj1.uint8carr, 'share typed array ref' );

		assert.strictEqual( actual.arr, expectedObj1.arr, 'share array ref' );

		assert.strictEqual( actual.obj, expectedObj1.obj, 'share object ref' );
	});

	it( 'should copy to an arbitrary depth', function test() {
		var actual;

		actual = createCopy( obj, 2 );

		assert.deepEqual( actual, expectedObj2, 'deep equal' );

		assert.strictEqual( actual.bool, expectedObj2.bool, 'boolean primitive' );

		assert.notOk( actual.uint8carr === expectedObj2.uint8carr, 'distinct typed arrays' );

		assert.notOk( actual.arr === expectedObj2.arr, 'distinct arrays' );

		assert.notOk( actual.obj === expectedObj2.obj, 'distinct objects' );

		assert.strictEqual( actual.obj.a, expectedObj2.obj.a, 'shared nested objects' );
	});

	it( 'should return the same reference when the level is set to 0', function test() {
		var actual = createCopy( obj, 0 );
		assert.strictEqual( actual, expectedObj0 );
	});

	it( 'should preserve property descriptors', function test() {
		var actual;
		var desc;
		var obj;

		obj = {};
		desc = {
			'value': 'b',
			'writable': false,
			'enumerable': true,
			'configurable': false
		};

		Object.defineProperty( obj, 'a', desc );

		actual = createCopy( obj );
		assert.deepEqual( actual, obj );
		assert.deepEqual( Object.getOwnPropertyDescriptor( actual, 'a' ), desc );
	});

});
