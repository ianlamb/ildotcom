/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var BlogProvider = require('../../modules/blog/blog-provider');

describe('blog provider', function() {
    'use strict';
    
    var blogProvider = new BlogProvider();

    describe('call getPost', function() {
        it('returns ', function (done) {
            blogProvider.getPosts().then(function(res) {
                expect(res.length).to.be(2);
            });
        });
    });
});