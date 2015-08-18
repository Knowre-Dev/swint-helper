# swint-helper
Helper functions and classes for Swint

**Warning: This is not final draft yet, so do not use this until its official version is launched**

## Installation
```sh
$ npm install --save swint-helper
```

## API

### `.defaultize(defVal, tgtVal)`
Filling default value to an JavaScript object.

If `tgtVal` doesn't have the key -> It is filled from `defVal`, recursively.

If `tgtVal` doesn't have enough values at the Array -> It is filed from `defVal`, recursively.

#### Examples
```javascript
var swintHelper = require('swint-helper'),
	def,
	tgt;

def = {
	a: 1,
	b: 'aaa',
	c: [1, 2, 3]
};

tgt = {
	b: 'bbb',
	c: [4]
};

swintHelper.defaultize(def, tgt);
// tgt ==>  { a: 1, b: 'bbb', c: [4, 2, 3] }
```

### `.validate(ruleVal, tgtVal)`
Recursively looks through an object to see if its values match the rules

#### Rules
* `undefined` : Can be any type 
* `0` : Has to be a Number
* `''` : Has to be a String
* `'aaa\bbbb\bccc'` : Has to be enum('aaa', 'bbb', 'ccc')
* `new Date(0)` : Has to be a Date
* `{}` : Has to be an object
* `[0]` : Has to be an Array of Numbers
* `['']` : Has to be an Array of Strings
* `[new Date(0)]` : Has to be an Array of Dates
* `[[0]]` : Has to be an Array of Arrays of Numbers
* `{ a: 0 }` : Has to be an Object with key of a: Number

#### Example
```javascript
var swintHelper = require('swint-helper'),
	r = {
		a: 0,
		b: '',
		c: {
			d: [0],
			e: undefined
		}
	},
	t = {
		a: 100,
		b: 'Monday',
		c: {
			d: [1,2,3],
			e: 'Friday'
		}
	};

var o = swintHelper.validate(r, t);
// o ==> [ true, [] ]
```

If the target didn't match the target, it will return false and a path to the failing entry:

```javascript
var swintHelper = require('swint-helper'),
	r = {
		a: 0,
		b: '',
		c: {
			d: [0],
			e: undefined
		}
	},
	t = {
		a: 100,
		b: 'Monday',
		c: {
			d: ['a', 'b', 'c'],
			e: 'Friday'
		}
	};
 
var o = swintHelper.validate(r, t);
// o ==> [ false, [ 'c', 'd', 0 ] ]
```

### `.print(level, msg)`
Prints messages and associated levels

#### Levels
* 0 : RAW
* 1 : DEBUG(default)
* 2 : INFO
* 3 : WARNING
* 4 : ERROR

#### Examples

```javascript
print(0, 'Raw message');
// ==> Raw message
print(1, 'Debug message');
// ==> DEBUG/2015-05-07T13:55:35.612Z)
//		Debug message
print(2, 'Info message');
// ==> INFO /2015-05-07T13:55:35.612Z)
//		Info message
print(3, 'Warning message');
// ==> WARN /2015-05-07T13:55:35.612Z)
//		Warning message
print(4, 'Error message');
// ==> ERROR/2015-05-07T13:55:35.612Z)
//		Error message

// Setting the printLevel sets a minimum requirement for the levels
global.swintVar.printLevel = 3;		
print(0, 'Raw message');		// Would not print
print(1, 'Debug message');		// Would not print
print(2, 'Info message');		// Would not print
print(3, 'Warning message');	// Would print
print(4, 'Error message');		// Would print
```
