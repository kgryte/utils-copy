TODO
====

1. should `preventExtensions`, `seal`, and `freeze` be extended to `objects` beyond `Object`, `Array`, and class instances?
2. 
3. `WeakMap` support (?)
	-	not convinced this is viable due to weakly held references; i.e., getting a list of `keys` requires maintaining a separate list.
4. `WeakSet` support (?)
	-	see `WeakMap` above
5. `Symbol` support
	-	requires the ability to get [primitive value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
6. [structured-clone-algorithm](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#safe-passing-of-structured-data)
7. `ArrayBuffer` support
8. `Blob` support
9. `FileList` support
10. `ImageData` support
11. `ImageBitmap` support
12. `File` support
13. 


## Notes

*	Re: __why__ this implementation and not the many other [copy][victusfate-copyjs]/[deep copy][sasaplus1-deepcopy]/[clone][dankogai-clone]/[deep clone][evlun-copy] modules out there.
	1. 	They are buggy. For example, circular references are not properly tracked.
	2. 	They fail to account for `Number`, `String`, and `Boolean` objects.
	3. 	They fail to properly validate if a value is a Node `Buffer` object. They assume, for instance, a Node environment.
	4. 	They fail to clone class instances.
	5. 	They fail to preserve property descriptors.
	6. 	They do not allow limiting the copy depth.
	7. 	They assume an `array` or `object` input value.
	8. 	They are not sufficiently tested.
