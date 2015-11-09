import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  beforeModel: function(transition) {
    if (this.get('session').get('isAuthenticated')) {
      return this._initSessionUser();
    }     
  },
  
  _initSessionUser: function() {
    
    var access_token = this.get('session.data.authenticated.access_token');
    var self = this;
    if (access_token) {
      return this.store.query('user', {me: true})
        .then(function(currentUser) {
          self.get('session').set('currentUser', currentUser.get('firstObject'))  ;
        });
    }
  },
  
  sessionAuthenticated: function() {
    var self = this;
    this._initSessionUser().then(function() {
      self.transitionTo('home');
    });
  }

});  