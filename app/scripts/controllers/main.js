'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', 'TumblrAPI', 
  	function ($scope, $resource, TumblrAPI) {
	    TumblrAPI.get(function(blogInfo) {
	    	console.log(blogInfo);
	    	//$scope.title = blogInfo.blog.title;
	    	//$scope.description = blogInfo.description;
	    });
  }]);
