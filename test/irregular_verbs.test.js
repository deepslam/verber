const verber = require('../src/index');
const chai = require('chai');
const should = chai.should();  // Using Should style
const testData = require('./test_irregular_data.json');

describe("Irregular verbs tests", function() {
    Object.keys(testData).forEach(key => {
        it(key, function() {
            let forms = verber(key);
            forms.infinitive.should.equal(testData[key][0]);
            forms.firstPast.should.equal(testData[key][1]);
            forms.perfect.should.equal(testData[key][2]);
        });
    });
});