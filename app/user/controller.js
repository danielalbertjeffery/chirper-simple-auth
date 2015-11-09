import Ember from 'ember';

export default Ember.Controller.extend({

  session: Ember.inject.service(),

  userIsProfile: Ember.computed('model.user', 'session.currentUser', function() {
    return this.get('model.user.id') === this.get('session.currentUser.id');
  })
  
});