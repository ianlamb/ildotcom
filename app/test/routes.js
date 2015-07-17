/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var routes = require('../routes');

describe('routes', function() {
    'use strict';

    describe('/api', function() {
        it('returns hi', function (done) {
            routes['/'].get({}, {
                json: function(data) {
                    expect(data).to.be({ message: 'hi :)' });
                }
            });
        });
    });
});