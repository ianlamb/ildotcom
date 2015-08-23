/* global describe, it, beforeEach, inject, expect */
describe('app.home.HomeController', function() {
	
	var scope;
	var controller;
	var mockUtilities;
	var mockPosts;
	
	beforeEach(module('app'));
	beforeEach(module('app.home'));
	beforeEach(inject(function($rootScope, $controller, Utilities, Posts){
		scope = $rootScope.$new();
		mockUtilities = Utilities;
		mockPosts = Posts;
		controller = $controller('HomeController', {
			$scope: scope,
			Utilities: mockUtilities,
			Posts: mockPosts
		});
	}));

	it('should have contact information defined', function(){
		expect(scope.contact).to.be.defined;
	});

	it('should have projects defined', function(){
		expect(scope.projects).to.be.defined;
	});
});