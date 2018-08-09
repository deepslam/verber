const verber = require('../src/index');
const chai = require('chai');
const should = chai.should();  // Using Should style
const testData = require('./test_regular_data.json');

describe("Regular verbs test", function() {
    Object.keys(testData).forEach(key => {
        it(key, function() {
            let forms = verber(key);
            forms.firstPresent.should.equal(testData[key][0]);
            forms.firstPast.should.equal(testData[key][1]);
            forms.perfect.should.equal(testData[key][2]);
        });
    });
});