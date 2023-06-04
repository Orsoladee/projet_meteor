import {Template} from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { plantCollection } from './plantCollection';

import './plants.html';



Meteor.methods ({
  'plants.insert' (plant) {
    plant.insert(plant);
  },
});

Template.plant.events ({
  'click.toggle-checked'() {
    //set the checked property
    plantCollection.update(this._id, {
      $set: {isChecked: !this.isChecked},
    });
  },
});
