const mocha = require('mocha');
const chai = require('chai');
var request = require('request');

const expect = chai.expect;
const axios = require('axios');
//The Chai assertion using ‘expect’ is used to make assertions on the input-output behavior of the function.



describe('Check if the url fetch works well', () => {
	it('URL Fetch Check', function (done) {
		request('https://api.icndb.com/jokes'), function (error, response, body) {
			expect(body.data.value[0].joke).to.contain([A - Za - z]);
			done();
		}
	})
})
