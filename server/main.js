import { Meteor } from 'meteor/meteor';
import { plantCollection } from '../imports/ui/api/plantCollection';

const insertTask = plantName => plantCollection.insert ({ text: plantText});

Meteor.startup(() => {
  // code to run on server at startup
  if (plantCollection.find().count()=== 0){
    [
      'First plant',
      'Second plant',
      'Third plant',
      'Fourth plant',
      'Fifth plant',
      'Sixth plant',
      'Seventh plant',
  ]. forEach(insertTask)
}
});
