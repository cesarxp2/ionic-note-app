(function() {

  var app = angular.module('noteApp', ['ionic']);

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

  function getNote(noteId) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i];
      }
    }
    return undefined;
  }

  function updateNote(note) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        notes[i] = note;
        return;
      }
    }
  }

  // CONTROLLERS
  app.controller('listCtrl', function($scope) {
    $scope.notes = notes;
  });

  app.controller('editCtrl', function($scope, $state) {

    $scope.note = angular.copy(getNote($state.params.noteId));

    $scope.save = function() {
      updateNote($scope.note);
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
