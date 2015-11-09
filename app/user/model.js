import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  aboutMe: DS.attr('string'),
  joinedAt: DS.attr('date'),

  followees: DS.hasMany('user', {
    inverse: 'followers'
  }),
  
  followers: DS.hasMany('user', {
    inverse: 'followees'
  }),

  chirps: DS.hasMany('chirp'),

  numberOfFollowing: Ember.computed('followees', function() {
    return this.get('followees.length');
  }),
    
  numberOfFollowers: Ember.computed('followers', function() {
    return this.get('followers.length');
  }),

  numberOfChirps: Ember.computed('chirps', function() {
    return this.get('chirps.length');
  })
});