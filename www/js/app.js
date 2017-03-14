(function() {

  var app = angular.module('noteApp', ['ionic', 'noteApp.notestore']);

  // GLOBAL SCALE
  var notes = [
    {
      id: '1',
      title: 'First Note',
      description: 'This is my first note'
    }, {
      id: '2',
      title: 'Second Note',
      description: 'This is my second note'
    }
  ];

  // CONTROLLERS
  app.controller('listCtrl', function($scope, noteStore) {
    $scope.notes = noteStore.list();

    $scope.remove = function(noteId) {
      noteStore.remove(noteId)
    };

    $scope.move = function(note, fromIndex, toIndex) {
      noteStore.move(note, fromIndex, toIndex);
    };
  });

  app.controller('editCtrl', function($scope, $state, noteStore) {

    $scope.note = angular.copy(noteStore.get($state.params.noteId));

    $scope.save = function() {
      noteStore.update($scope.note);
      $state.go('list');
    };

  });

  app.controller('addCtrl', function($scope, $state, noteStore) {

    $scope.note = {
      id: new Date().getTime().toString(),
      title: '',
      description: ''
    };

    $scope.save = function() {
      noteStore.create($scope.note);
      $state.go('list');
    };

  });

  // CONFIG
  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'views/list.html'
    }).state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'views/edit.html'
    }).state('add', {
      url: '/add',
      templateUrl: 'views/add.html'
    });

    $urlRouterProvider.otherwise('/list');

  });

  // RUN
  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
})();
