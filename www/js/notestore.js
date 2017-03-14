angular.module('noteApp.notestore', []).factory('noteStore', function() {
  var notes = []
  return {
    list: function() {
      return notes;
    },
    get: function(noteId) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === noteId) {
          return notes[i];
        }
      }
      return undefined;
    },
    update: function(note) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === note.id) {
          notes[i] = note;
          return;
        }
      }
    },
    create: function(note) {
      notes.push(note);
    }
  };
});
