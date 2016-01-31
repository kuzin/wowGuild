'use strict';

/**
 * @ngdoc overview
 * @name wowApp
 * @description
 * # wowApp
 *
 * Main module of the application.
 */

angular
  .module('wowApp')
  // Get Posts from DB
  .factory('getPosts', ['pouchDB', 'DB', function(pouchDB, DB) {
    return function (view) {
      return pouchDB(DB).query(view, {
        include_docs: true
      });
    };
  }])
  // Delete Post Function
  .factory('deletePost', ['pouchDB', 'DB', function(pouchDB, DB) {
    return function (post) {
      return pouchDB(DB).remove(post);
    };
  }])
  // Replicate
  .factory('port', ['$location', 'pouchDB', 'DB', function ($location, pouchDB, DB) {
    return function (direction) {
      var url = window.prompt("Enter the URL for the external database");
      pouchDB(DB).replicate[direction](url);
      $location.path('/');
    };
  }])
  //
  .factory('listCtrl', ['getPosts', 'deletePost', function (getPosts, deletePost) {
    return function ($scope, view) {
      $scope.delete = function (post) {
        if (window.confirm("Are you sure you want to delete that post?")) {
          deletePost(post).then(function() {
            $scope.posts = $scope.posts.filter(function (doc) {
              return doc._id !== post._id;
            });
          });
        }
      };
      getPosts(view).then(function (res) {
        $scope.posts = res.rows.map(function (row) {
          return row.doc;
        });
      });
    };
  }])
  .controller('PostsCtrl',  [
    '$scope', 'listCtrl',
    function ($scope, listCtrl) {
      listCtrl($scope, function (doc) {
        if (doc.status) {
          emit(doc.date, null);
        }
      });
    }
  ])
  // list all drafts
.controller('DraftsCtrl', [
  '$scope', 'listCtrl',
  function ($scope, listCtrl) {
    listCtrl($scope, function (doc) {
      if (!doc.status) {
        emit(doc.date, null);
      }
    });
  }
])
// form for a new post
.controller('NewCtrl', [
  '$scope', '$location', 'pouchDB', 'DB',
  function ($scope, $location, pouchDB, DB) {
    $scope.submit = function () {
      $scope.post.date = Date.now();
      $scope.post._id = String($scope.post.date);
      pouchDB(DB).put($scope.post)
      .then(function () {
        $location.path('/');
      })
      .catch(function () {
        console.log(arguments);
      });
    };
  }
])
// form to edit existing post
.controller('EditCtrl', [
  '$scope', '$location', '$routeParams', 'pouchDB', 'DB',
  function ($scope, $location, $routeParams, pouchDB, db_name) {
    var db = pouchDB(db_name);

    db.get($routeParams.id)
    .then(function (res) {
      $scope.post = res;
    });

    $scope.submit = function () {
      db.put($scope.post)
      .then(function () {
        $location.path('/');
      })
      .catch(function () {
        // TODO error form
        console.log(arguments);
      });
    };
  }
])
  // list a single post, draft or otherwise
  .controller('PostCtrl', [
    '$scope', '$routeParams', 'pouchDB', 'DB',
    function ($scope, $routeParams, pouchDB, db) {
      pouchDB(db).get($routeParams.id).then(function (res) {
        $scope.posts = [res];
      });
    }
  ])
  // import posts from a URL
  .controller('ImportCtrl', [
    'port',
    function (port) {
      port('from');
    }
  ])
  // export posts to a URL
  .controller('ExportCtrl', [
    'port',
    function (port) {
      port('to');
    }
  ])
  // markdown filter for dynamic content
  .filter('markdown', [
    'marked', '$sce',
    function (marked, $sce) {
      return function (input) {
        if (!input) {
          return;
        }
        var html = marked(input);
        var safe_html = $sce.trustAsHtml(html);
        return safe_html;
      };
    }
  ])
  .directive('autoActive', ['$location', function ($location) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element) {
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        angular.forEach(element.find('li'), function (li) {
                            var anchor = li.querySelector('a');
                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass('active');
                            } else {
                                angular.element(li).removeClass('active');
                            }
                        });
                    }
                }

                setActive();

                scope.$on('$locationChangeSuccess', setActive);
            }
        };
    }]
  );
