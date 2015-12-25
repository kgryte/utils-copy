'use strict';

/**
* FUNCTION: indexOf( arr, val )
*	Returns the array index of a value. If the array does not contain the value, the function returns `-1`.
*
* @param {Array} arr - array
* @param {*} val - value for which to search
* @returns {Number} array index
*/
function indexOf( arr, val ) {
	var len = arr.length;
	var i;
	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] === val ) {
			return i;
		}
	}
	return -1;
} // end FUNCTION indexOf()


// EXPORTS //

module.exports = indexOf;
