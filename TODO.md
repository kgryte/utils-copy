TODO
====

1. Error support
2. consider checking for extensibility, frozen, and sealed when copying an `object`
3. 


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
