'use strict';

angular.module('photoshoplrNgApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$resource', '$window', 'TumblrAPI', 'Settings',
    function ($scope, $resource, $window, TumblrAPI, Settings) {
      $scope.posts = [];
      $scope.tags = [];
      $scope.orderByProp = 'timestamp';
      $scope.defaultTitle = Settings.defaultTitle

      TumblrAPI.blogInfo({offset: 0}, function(blogInfo) {
        var pageCount = Math.ceil(blogInfo.blog.posts / Settings.postLimit);

        $scope.title = blogInfo.blog.title;
        $scope.description = blogInfo.blog.description;

        populatePosts(pageCount);
      });

      $scope.showDetails = function(post) {
        $scope.selectedPost = post;
      };

      $scope.toggleTag = function(tag) {
        _.contains($scope.tags, tag) ? $scope.tags.splice($scope.tags.indexOf(tag), 1) : $scope.tags.push(tag);
        
        updateAfterFilters();
      };

      $scope.tagActive = function(tag) {
        return _.contains($scope.tags, tag);
      };

      $scope.$watch('searchQuery', function() {
        updateAfterFilters();
      });

      $scope.$watch('orderByProp', function() {
        updateAfterFilters();
      });
      
      function populatePosts(pageCount) {
        var currPage = 0,
            getContent = function() {
              TumblrAPI.blogPosts({ offset: currPage * Settings.postLimit }, function(blogPosts) {
                $scope.posts = $scope.posts.concat(blogPosts.posts);
                
                if (currPage == 0) {
                  $scope.showDetails($scope.posts[0]);
                }

                currPage++;

                if (currPage < pageCount) {
                  getContent();
                }
              });
            };

        getContent();
      }

      function updateAfterFilters() {
        var filtersDone = $scope.$on('postsFilterDone', function(event, firstFilteredPost) { 
          window.scrollTo(0, 0);
          $scope.showDetails(firstFilteredPost);
          filtersDone();
        });
      }

    }
  ]);
