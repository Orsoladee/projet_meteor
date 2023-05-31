import {Template} from 'meteor/templating';

import { plantCollection } from './plantCollection';

import './plants.html';

Template.task.events ({
  'click.toggle-checked'() {
    //set the checked property
    plantCollection.update(this._id, {
      $set: {isChecked: !this.isChecked},
    });
  },
});

Template.task.events({

})