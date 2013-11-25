'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', 'TumblrAPI', 
  	function ($scope, $resource, TumblrAPI) {
	    TumblrAPI.blogPosts(function(blogPosts) {
	    	$scope.title = blogPosts.blog.title;
	    	$scope.description = blogPosts.blog.description;
	    	$scope.posts = blogPosts.posts;
	    	$scope.postCount = blogPosts.blog.posts;

	    	// Set initial preview
	    	$scope.showDetails($scope.posts[0]);

	    	updatePaginator();
	    });

	    $scope.showDetails = function(post) {
	    	$scope.selectedPost = post;
	    }

	    $scope.goToPage = function(pageN) {
	    	$scope.currPage = pageN;
	    }

	    function updatePaginator() {
	    	var pageCount = Math.ceil($scope.postCount / 20);
	    	
	    	$scope.pages = [];
	    	$scope.currPage = 0;

	    	for (var i = 0; i < pageCount; i++) {
	    		$scope.pages.push(i);
	    	}
	    }
  }]);
