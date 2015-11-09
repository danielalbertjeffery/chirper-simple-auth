import Ember from 'ember';

export default Ember.Component.extend({
  
  focusOnTextarea: Ember.on('didInsertElement', function() {
    var self = this;
    Ember.run.scheduleOnce('afterRender', function() {
      self.$().find('textarea').focus();
    });
  }),

  chirpText: '',

  remainingChars: Ember.computed('chirpText', function() {
    return 140 - this.get('chirpText').length;
  }),

  noCharsLeft: Ember.computed('remainingChars', function() {
    return (this.get('remainingChars') < 0);
  }),

  store: Ember.inject.service(),

  actions: {
    postChirp: function() {

      if (this.get('noCharsLeft')) {
        swal("Woops!", "You have too many characters in your chirp!", "error");
        return false;
      }

      var text = this.get('chirpText');

      var chirpData = {
        text: text,
        createdAt: new Date()
      };

      var newChirp = this.get('store').createRecord('chirp', chirpData);

      newChirp.save().then(() => {
        this.attrs.dismiss();
      });
    }
  }
  
});