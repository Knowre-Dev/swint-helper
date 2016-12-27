var assert = require('assert'),
	path = require('path'),
	fs = require('fs'),
	swintHelper = require('../lib'),
	Logger = require('le_node');

global.swintVar.printLevel = 5;

describe('print', function() {
	it('printHook for cloud logging', function(done) {
		var credPath = path.join(process.env.HOME, '.swint', 'swint-helper-test.json'),
			cred;

		try {
			fs.accessSync(credPath);
			cred = JSON.parse(fs.readFileSync(credPath));
		} catch(e) {
			cred = {
				logentries: process.env.SWINT_HELPER_KEY
			};
		}

		global.swintVar.printHook = function(level, args) {
			var keyList = ['', 'DEBUG: ', 'INFO : ', 'WARN : ', 'ERROR: '],
				logger = new Logger({
					token: cred.logentries
				}),
				key = keyList[level];

			logger.log(key + args.map(function(arg) {
				return JSON.stringify(arg);
			}).join(' '));
		};

		print(0, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(1, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(2, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(3, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(4, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});

		print(print.RAW, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(print.DEBUG, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(print.INFO, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(print.WARN, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});
		print(print.ERROR, 'Generated by Swint automatic build', {json: 'string', foo: [1, 2, 3, '4']});

		setTimeout(function() {
			var myObj = { foo: 'bar' };
			myObj.bar = myObj;
			print(2, myObj);

			done();
		}, 1500);
	});
});
