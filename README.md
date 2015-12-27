Copy
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Copy or deep clone a value to an arbitrary depth.


## Installation

``` bash
$ npm install utils-copy
```

For use in the browser, use [browserify][browserify].


## Usage

``` javascript
var createCopy = require( 'utils-copy' );
```

#### createCopy( value[, level] )

Copy or deep clone a `value` to an arbitrary depth. The `function` accepts both `objects` and `primitives`.

``` javascript
var value, copy;

// Primitives...
value = 'beep';
copy = createCopy( value );
// returns 'beep'

// Objects...
value = [{'a':1,'b':true,'c':[1,2,3]}];
copy = createCopy( value );
// returns [{'a':1,'b':true,'c':[1,2,3]}]

console.log( value[0].c === copy[0].c );
// returns false
```

The default behavior returns a __full__ deep copy of any `objects`. To limit the copy depth, set the `level` option.

``` javascript
var value, copy;

value = [{'a':1,'b':true,'c':[1,2,3]}];

// Trivial case => return the same reference
copy = createCopy( value, 0 );
// returns [{'a':1,'b':true,'c':[1,2,3]}]

console.log( value[0] === copy[0] );
// returns true

// Shallow copy:
copy = createCopy( value, 1 );

console.log( value[0] === copy[0] );
// returns false

console.log( value[0].c === copy[0].c );
// returns true

// Deep copy:
copy = createCopy( value, 2 );

console.log( value[0].c === copy[0].c );
// returns false
```


## Notes

*	List of __supported__ values/types:
	-	`undefined`
	-	`null`
	-	`boolean`/`Boolean`
	-	`string`/`String`
	-	`number`/`Number`
	-	`function`
	-	`Object`
	-	`Date`
	-	`RegExp`
	-	`Array`
	-	`Int8Array`
	-	`Uint8Array`
	-	`Uint8ClampedArray`
	-	`Init16Array`
	-	`Uint16Array`
	-	`Int32Array`
	-	`Uint32Array`
	-	`Float32Array`
	-	`Float64Array`
	-	`Buffer` ([Node.js][node-buffer])

*	List of __unsupported__ values/types:
	-	`DOMElement`: to copy DOM elements, use `.cloneNode()`.
	-	`Set`
	-	`Map`
	-	`Error`
	- 	`URIError`
	-	`ReferenceError`
	-	`SyntaxError`
	-	`RangeError`

*	If you need support for any of the above types, feel free to file an issue or submit a pull request.
*	The implementation can handle circular references.
*	If a `Number`, `String`, or `Boolean` object is encountered, the value is cloned as a primitive. This behavior is intentional. The implementation is opinionated in wanting to __avoid__ creating `numbers`, `strings`, and `booleans` via the `new` operator and a constructor.
* 	For `objects`, the implementation __only__ copies the `enumerable` keys.
*	`functions` are __not__ cloned; their reference is copied.
*	Support for copying class instances is inherently __fragile__. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This stated, basic copying of class instances is supported. Provided an environment which supports ES5, the implementation is greedy and performs a deep clone of any arbitrary class instance and its properties. The implementation assumes that the concept of `level` applies only to the class instance reference, but not to its internal state.

	``` javascript
	function Foo() {
		this._data = [ 1, 2, 3, 4 ];
		this._name = 'bar';
		return this;
	}

	var foo = new Foo();
	var fooey = createCopy( foo );

	console.log( foo._name === fooey._name );
	// returns true

	console.log( foo._data === fooey._data );
	// returns false

	console.log( foo._data[0] === fooey._data[0] );
	// returns true
	```



## Examples

``` javascript
var createCopy = require( 'utils-copy' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha][mocha] test framework with [Chai][chai] assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

[![browser support][testling-image]][testling-url]


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-copy.svg
[npm-url]: https://npmjs.org/package/utils-copy

[travis-image]: http://img.shields.io/travis/kgryte/utils-copy/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-copy

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-copy/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-copy?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-copy.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-copy

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-copy.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-copy

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-copy.svg
[github-issues-url]: https://github.com/kgryte/utils-copy/issues

[testling-image]: https://ci.testling.com/kgryte/utils-copy.png
[testling-url]: https://ci.testling.com/kgryte/utils-copy

[browserify]: https://github.com/substack/node-browserify
[mocha]: http://mochajs.org/
[chai]: http://chaijs.com
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[node-buffer]: http://nodejs.org/api/buffer.html

[victusfate-copyjs]: https://github.com/victusfate/copyjs/blob/master/lib/copy.js
[sasaplus1-deepcopy]: https://github.com/sasaplus1/deepcopy.js
[dankogai-clone]: https://github.com/dankogai/js-object-clone
[evlun-copy]: https://github.com/evlun/copy/blob/master/copy.js
