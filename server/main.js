import { Meteor } from 'meteor/meteor';
import { Accounts} from 'meteor/accounts-base';
import { plantCollection } from '../imports/ui/api/plantCollection';

const insertTask = plantName => plantCollection.insert ({ text: plantText});
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup (() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

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


