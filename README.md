Copy
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Copy and deep clone a value with the ability to specify copy depth.


## Installation

``` bash
$ npm install utils-copy
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var createCopy = require( 'utils-copy' );
```

#### createCopy( value[, level] )

Copies and deep clones a `value`. The `function` accepts both `objects` and `primitives`.

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

The default behavior returns a full deep copy of any `objects`. To limit the copy depth, set the `level` option.

``` javascript
var value, copy;

value = [{'a':1,'b':true,'c':[1,2,3]}];
copy = createCopy( value, 0 );
// returns [{'a':1,'b':true,'c':[1,2,3]}]

console.log( value[0] === copy[0] );
// returns true

copy = createCopy( value, 1 );

console.log( value[0] === copy[0] );
// returns false

console.log( value[0].c === copy[0].c );
// returns true
```


## Notes

*	List of supported values/types:
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
	-	`Buffer` ([Node.js]((http://nodejs.org/api/buffer.html)))

*	The function can handle circular references.
*	If the function encounters a `Number`, `String`, or `Boolean` object, the value is cloned as a primitive. This behavior is intentional. __Avoid__ creating numbers, strings, and booleans via the `new` operator and a constructor.
*	`functions` are __not__ cloned; their reference is only copied.
*	To copy DOM elements, use `.cloneNode()`. If you want a means to copy arrays or objects of DOM elements, feel free to file an issue or submit a pull request.
*	`Set` and `Map` objects are not currently supported. If you need support for these, feel free to file an issue or submit a pull request.
*	`Error` objects are not currently supported. If you need support for these, feel free to file an issue or submit a pull request.


## Examples

``` javascript
var createCopy = require( 'utils-copy' );

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-copy.svg
[npm-url]: https://npmjs.org/package/utils-copy

[travis-image]: http://img.shields.io/travis/kgryte/utils-copy/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-copy

[coveralls-image]: https://img.shields.io/coveralls/kgryte/utils-copy/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/utils-copy?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-copy.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-copy

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-copy.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-copy

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-copy.svg
[github-issues-url]: https://github.com/kgryte/utils-copy/issues
