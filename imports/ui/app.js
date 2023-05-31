import {Template} from 'meteor/templating';
import { plantCollection } from './api/plantCollection';
import './app.html';
import { template } from 'underscore';

Template.mainContainer.helpers({
  tasks : [
    { text: 'This is the plant Aloevera'},
    { text: 'This is the plant Cactus'},
    { text: 'This is the plant Crassula'},
  ],
});

template.mainContainer.helpers({
  tasks() {
    return plantCollection.find({}, { sort: { createdAt: -1} });
  },
});

template.form.events({
  "submit .plant-form" (event){
    // prevent default browser form submit
    event.preventDefault();

    // get value from form element
    const target = event.target;
    const text = event.text.value;

    // insert a task into the collection
    plantCollection.insert ({
      text,
      createdAt: new Date(), // current time
    });

    //clear form
    target.text.value = '';
  }
});

template.mainContainer.helpers({
  tasks() {
    return plantCollection.find({}, { sort: { createdAt: -1} });
  },
});

template.form.events ({}); 

import {Template} from 'meteor/templating';
import { plantCollection } from './api/plantCollection';
import './app.html';
import 'plants.js';

template.plants.event ({
'click. delete' () {
  plantCollection.remove(this._id)
}
});


template.mainContainer.helpers({});

import {Template} from 'meteor/templating';
import { plantCollection } from './api/plantCollection';
import { ReactiveDict} from 'meteor/reactive-dict';

import './app.html';
import 'plants.js';

// Callback to conserve our data
template.mainContainer.onCreated(function mainContainerOnCreated(){
  this.state = new ReactiveDict();
});

const HIDE_COMPLETED_STRING = "hideCompleted";

Template.mainContainer.events({
  "click #hide-completed-button" (event, instance){
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  }
});

Template.mainContainer.helpers ({
  tasks () {
    const instance = template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const hideCompletedFilter = { isChecked: {$ne: true}};
  
    return TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort : {createdAt : -1},
  }).fetch();
  },
  hideCompleted(){
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },
  incompleteIrrigation() {
    const incompletePlantIrrigation = TaskCollection.find({ isChecked: { $ne: true}}).Irrigation();
    return incompletePlantIrrigation ? `(${incompletePlantIrrigation})` : '';
  },
});





