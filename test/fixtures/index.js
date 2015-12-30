'use strict';

function Foo() {
	this._data = [1,2,3,4];
	this._name = 'bar';
	return this;
}
Foo.prototype.beep = 'boop';
module.exports.Foo = Foo;

function Bar() {
	Object.defineProperty( this, 'baz', {
		get: function() { return 1; }
	});
	return this;
}
module.exports.Bar = Bar;

if ( typeof Set !== 'undefined' ) {
	var set = new Set( [1,2,3,4] );
	module.exports.set = set;
}
if ( typeof Map !== 'undefined' ) {
	var map = new Map();
	map.set( 'beep', 'boop' );
	module.exports.map = map;
}
var foo = new Foo();
module.exports.foo = foo;

var bar = new Bar();
module.exports.bar = bar;

var date = new Date();
module.exports.date = date;

var re = /.*/;
module.exports.re = re;

var bool = new Boolean( true );
module.exports.bool = bool;

var str = new String( 'beep' );
module.exports.str = str;

var num = new Number( Math.PI );
module.exports.num = num;

var fcn = function noop(){};
module.exports.fcn = fcn;

var buffer = new Buffer([10,20,30,40]);
module.exports.buffer = buffer;

var cbuffer = new Buffer( buffer );
module.exports.cbuffer = cbuffer;

var int8arr = new Int8Array([1,2,3,4]);
module.exports.int8arr = int8arr;

var uint8arr = new Uint8Array([5,6,7,8]);
module.exports.uint8arr = uint8arr;

var uint8carr = new Uint8ClampedArray([9,10,11,12]);
module.exports.uint8carr = uint8carr;

var int16arr = new Int16Array([256,257,258]);
module.exports.int16arr = int16arr;

var uint16arr = new Uint16Array([259,260,261]);
module.exports.uint16arr = uint16arr;

var int32arr = new Int32Array([65537,65538]);
module.exports.int32arr = int32arr;

var uint32arr = new Uint32Array([65539,65540]);
module.exports.uint32arr = uint32arr;

var float32arr = new Float32Array([Math.PI]);
module.exports.float32arr = float32arr;

var float64arr = new Float64Array([Number.MAX_VALUE]);
module.exports.float64arr = float64arr;

Object.preventExtensions( bar );
Object.seal( bar );
Object.freeze( bar );

module.exports.arr = [
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

module.exports.expectedArray = [
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
module.exports.obj = obj;
module.exports.expectedObj0 = obj;


module.exports.expectedObj1 = {
	'bool': bool,
	'uint8carr': uint8carr,
	'arr': obj.arr,
	'obj': obj.obj
};

module.exports.expectedObj2 = {
	'bool': true,
	'uint8carr': new Uint8ClampedArray( uint8carr ),
	'arr': [ 'a', 'b', 'c' ],
	'obj': {
		'a': obj.obj.a,
		'bool': true
	}
};
