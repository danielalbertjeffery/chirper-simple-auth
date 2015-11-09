import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({

  session: Ember.inject.service(),

  valuesChanged: Ember.observer('username', 'password', function() {
    this.set('errorMessage', false);
  }),

  actions: {
    signup: function() {
      var userData = {
        identification: this.get('username'),
        password: this.get('password')
      };

      Ember.$.ajax({
        type: 'POST',
        url: config.apiURL + '/signup',
        dataType: 'json',
        data: userData
      })
      .done(() => {
        console.log("Created!");
        this.send('login');
      })
      .fail(() => {
        this.set('errorMessage', "Couldn't sign up!");
      });
    },

    login: function() {

      var identification = this.get('username');
      var password = this.get('password');

      this.get('session').authenticate('authenticator:oauth2-password-grant', identification, password).then(() => {
        this.transitionToRoute('home');
        console.log('success');
      }, () => {
        this.set('errorMessage', 'Wrong username or password!');
        console.log('error')
      });
    }
  }
});