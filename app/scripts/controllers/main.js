'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', 'TumblrAPI', 
  	function ($scope, $resource, TumblrAPI) {
	    TumblrAPI.blogPosts(function(blogPosts) {
	    	$scope.title = blogPosts.blog.title;
	    	$scope.description = blogPosts.blog.description;
	    	$scope.posts = blogPosts.posts;
	    });
  }]);
