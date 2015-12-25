'use strict';

/**
* FUNCTION: objectKeys( obj )
*	Returns an object's keys.
*
* @param {Array|Object} obj - object
* @returns {Array} array of keys
*/
function objectKeys( obj ) {
	var keys = [];
	var key;
	for ( key in obj ) {
		if ( obj.hasOwnProperty( key ) ) {
			keys.push( key );
		}
	}
	return keys;
} // end METHOD objectKeys()


// EXPORTS //

module.exports = objectKeys;
