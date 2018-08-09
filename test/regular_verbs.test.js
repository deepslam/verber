const verber = require('../src/index');
const chai = require('chai');
const should = chai.should();  // Using Should style
const testData = require('./test_regular_data.json');

describe("Regular verbs test", function() {
    testData.verbs.map(verb => {
        it(verb.present, function() {
            let forms = verber(verb.present);
            forms.firstPresent.should.equal(verb.present);
            forms.firstPast.should.equal(verb.past);
        });
    });
});