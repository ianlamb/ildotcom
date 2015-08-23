/* global describe, it, beforeEach, inject, expect */
describe('app.blog.BlogController', function() {
	
	var scope;
	var controller;
	var mockUtilities;
	var mockPosts;
	var mockPost;
	
	beforeEach(module('app'));
	beforeEach(module('app.blog'));
	beforeEach(inject(function($rootScope, $controller, Posts, Post, Utilities){
		scope = $rootScope.$new();
		mockUtilities = Utilities;
		mockPosts = Posts;
		mockPost = Post;
		controller = $controller('BlogController', {
			$scope: scope,
			Utilities: mockUtilities,
			Posts: mockPosts,
			Post: mockPost
		});
	}));

	it('should have contact information defined', function(){
		expect(scope.contact).to.be.defined;
	});

	it('should have projects defined', function(){
		expect(scope.projects).to.be.defined;
	});
});