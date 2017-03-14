(function() {

  var app = angular.module('noteApp', ['ionic']);

  // GLOBAL SCALE
  $scope.notes = [
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

  function getNote(noteId) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i];
      }
    }
    return undefined;
  }

  // CONTROLLERS
  app.controller('listCtrl', function($scope) {
    $scope.notes = notes;
  });

  app.controller('editCtrl', function($scope, $state) {

    $scope.noteId = $state.params.noteId;

  });

  // CONFIG
  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'views/list.html'
    }).state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'views/edit.html'
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
