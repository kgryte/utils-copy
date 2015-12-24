'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isBuffer = require( 'validate.io-buffer' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	typeName = require( 'type-name' );


// FUNCTIONS //

/**
* FUNCTION: indexOf( arr, val )
*	Returns the array index of a value. If the array does not contain the value, the function returns `-1`.
*
* @private
* @param {Array} arr - array
* @param {*} val - value for which to search
* @returns {Number} array index
*/
function indexOf( arr, val ) {
	var len = arr.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] === val ) {
			return i;
		}
	}
	return -1;
} // end FUNCTION indexOf()

/**
* FUNCTION: objectKeys( obj )
*	Returns an object's keys.
*
* @private
* @param {Array|Object} obj - object
* @returns {Array} array of keys
*/
function objectKeys( obj ) {
	var keys = [],
		key;
	for ( key in obj ) {
		if ( obj.hasOwnProperty( key ) ) {
			keys.push( key );
		}
	}
	return keys;
} // end METHOD objectKeys()

/**
* Create functions for copying typed arrays.
*/
var typedArrays = {
	'Int8Array': null,
	'Uint8Array': null,
	'Uint8ClampedArray': null,
	'Int16Array': null,
	'Uint16Array': null,
	'Int32Array': null,
	'Uint32Array': null,
	'Float32Array': null,
	'Float64Array': null
};

(function createTypedArrayFcns() {
	/* jshint evil:true */
	var keys = objectKeys( typedArrays ),
		len = keys.length,
		key,
		i;
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		typedArrays[ key ] = new Function( 'arr', 'return new '+key+'( arr );' );
	}
})();

/**
* FUNCTION: cloneInstance( val )
*	Clones a class instance.
*
*	WARNING: this should only be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered fragile.
*
*	NOTE: the function is greedy, disregarding the notion of a 'level'. Instead, the function deep copies all properties, as we assume the concept of 'level' applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
*
* @private
* @param {Object} val - class instance
* @returns {Object} new instance
*/
function cloneInstance( val ) {
	var cache = [],
		refs = [],
		names,
		name,
		desc,
		tmp,
		ref,
		i;

	ref = Object.create( Object.getPrototypeOf( val ) );
	cache.push( val );
	refs.push( ref );

	names = Object.getOwnPropertyNames( val );
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		desc = Object.getOwnPropertyDescriptor( val, name );
		if ( desc.hasOwnProperty( 'value' ) ) {
			tmp = ( isArray( val[name] ) ) ? [] : {};
			desc.value = deepCopy( val[name], tmp, cache, refs, -1 );
		}
		Object.defineProperty( ref, name, desc );
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( ref );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( ref );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( ref );
	}
	return ref;
} // end FUNCTION cloneInstance()


// DEEP COPY //

/**
* FUNCTION: deepCopy( val, copy, cache, refs, level )
*	Recursively performs a deep copy of an input object.
*
* @private
* @param {Array|Object} val - value to copy
* @param {Array|Object} copy - copy
* @param {Array} cache - an array of visited objects
* @param {Array} refs - an array of object references
* @param {Number} level - copy depth
* @returns {*} deep copy
*/
function deepCopy( val, copy, cache, refs, level ) {
	var keys,
		name,
		key,
		ref,
		x,
		i, j;

	// [-] Decrement the level...
	level = level - 1;

	// [0] Primitives and functions...
	if ( typeof val !== 'object' || val === null ) {
		return val;
	}
	// [1] Node.js Buffer objects...
	if ( isBuffer( val ) ) {
		return new val.constructor( val );
	}
	name = typeName( val );

	// [2] Sets and Maps...
	if ( name === 'Set' || name === 'Map' ) {
		console.warn( 'copy()::not supported. Copying Sets and Maps is not currently supported. File an issue, submit a pull request, or contact the author directly at kgryte@gmail.com.' );
		return {};
	}
	// [3] Number, String, and Boolean objects...
	if ( name === 'String' || name === 'Boolean' || name === 'Number' ) {
		// Return an equivalent primitive!
		return val.valueOf();
	}
	// [4] Date objects...
	if ( name === 'Date' ) {
		return new Date( +val );
	}
	// [5] Regular expressions...
	if ( name === 'RegExp' ) {
		val = val.toString();
		i = val.lastIndexOf( '/' );
		return new RegExp( val.slice( 1, i ), val.slice( i+1 ) );
	}
	// [6] Typed arrays...
	if ( typedArrays.hasOwnProperty( name ) ) {
		return typedArrays[ name ]( val );
	}
	// [7] Class instances...
	if ( name !== 'Array' && name !== 'Object' ) {
		// Require ES5 or higher...
		if ( typeof Object.freeze === 'function' ) {
			return cloneInstance( val );
		}
		return {};
	}
	// [8] Arrays and objects...
	keys = objectKeys( val );
	if ( level > 0 ) {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			x = val[ key ];

			// [8.1] Primitive, Buffer, special class instance...
			name = typeName( x );
			if ( typeof x !== 'object' || x === null || (name !== 'Array' && name !== 'Object') || isBuffer( x ) ) {
				copy[ key ] = deepCopy( x );
				continue;
			}
			// [8.2] Circular reference...
			i = indexOf( cache, x );
			if ( i !== -1 ) {
				copy[ key ] = refs[ i ];
				continue;
			}
			// [8.3] Plain array or object...
			ref = ( isArray(x) ) ? [] : {};
			cache.push( x );
			refs.push( ref );
			copy[ key ] = deepCopy( x, ref, cache, refs, level );
		}
	} else {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			copy[ key ] = val[ key ];
		}
	}
	return copy;
} // end FUNCTION deepCopy()

/**
* FUNCTION: createCopy( value[, level] )
*	Copy or deep clone a value to an arbitrary depth.
*
* @param {*} value - value to be copied
* @param {Number} [level=+infinity] - option to control copy depth. For example, set to `0` for a shallow copy. Default behavior returns a full deep copy.
* @returns {*} copy
*/
function createCopy( val, level ) {
	var copy;
	if ( arguments.length > 1 ) {
		if ( !isNonNegativeInteger( level ) ) {
			throw new TypeError( 'copy()::invalid input argument. Level must be a nonnegative integer. Value: `' + level + '`.' );
		}
		if ( level === 0 ) {
			return val;
		}
	} else {
		level = Number.POSITIVE_INFINITY;
	}
	copy = ( isArray(val) ) ? [] : {};
	return deepCopy( val, copy, [val], [copy], level );
} // end FUNCTION createCopy()


// EXPORTS //

module.exports = createCopy;
