const verber = require('../src/index');
const chai = require('chai');
const should = chai.should();  // Using Should style

it('Check verb run', function() {
    verber('run').should.equal("run");

});