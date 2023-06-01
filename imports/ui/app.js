import {Template} from 'meteor/templating';
import { plantCollection } from './api/plantCollection';
import { ReactiveDict} from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import "./app.html";
import "./plants.js";
import "./login.js";
import { template } from 'underscore';

const HIDE_COMPLETED_STRING = "hideCompleted";

// helper isUserLogged - login template
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

// Filter the plants - Owner
const getPlantsFilter = () => {
  const user = getUser();
  const hideCompletedFilter = { isChecked:  {$ne: true }};
  const userFilter = user ? { userId : user._id} : {};
  const pendingOnlyFilter = { hideCompletedFilter, userFilter};
  return {userFilter, pendingOnlyFilter};
};

// Callback to conserve our data
Template.mainContainer.onCreated(function mainContainerOnCreated(){
  this.state = new ReactiveDict();
});


Template.mainContainer.helpers({
  plants : [
    { text: 'This is the plant Aloevera'},
    { text: 'This is the plant Cactus'},
    { text: 'This is the plant Crassula'},
  ],
}),

Template.mainContainer.helpers({
  plants() {
    return plantCollection.find({}, { sort: { createdAt: -1} });
  },
});

Template.form.events({
  "submit .plant-form" (event){
    // prevent default browser form submit
    event.preventDefault();

    // get value from form element
    const target = event.target;
    const text = event.text.value;

    // insert a plant into the collection
    plantCollection.insert ({
      text,
      userId: getUser()._id,
      createdAt: new Date(), // current time
    });

    //clear form
    target.text.value = '';
    }
  });

Template.mainContainer.events({
  'click. user'() {
    Meteor.logout();
  }
});
 

Template.plants.event ({
'click. delete' () {
  plantCollection.remove(this._id)
}
});


Template.mainContainer.events({
  "click #hide-completed-button" (event, instance){
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  }
});


Template.mainContainer.helpers ({
  plants () {
    const instance = template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const {pendingOnlyFilter, userFilter} = getPlantsFilter();

    if (!isUserLogged()){
      return [];
    }

    return plantCollection.find(hideCompleted ?pendingOnlyFilter : userFilter, {
      sort : {createdAt : -1},
  }).fetch();
  },
  hideCompleted(){
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },
  incompleteIrrigation() {
    const incompletePlantIrrigation = TaskCollection.find(pendingOnlyFilter).Irrigation();
    return incompletePlantIrrigation ? `(${incompletePlantIrrigation})` : '';
  },

  isUserLogged() {
    return isUserLogged();
  }
});







