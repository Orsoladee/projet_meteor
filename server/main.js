import { Meteor } from 'meteor/meteor';
import { Accounts} from 'meteor/accounts-base';
import { plantCollection } from '../imports/ui/api/plantCollection';

import './routes.js';
import './mainLayout.html';
import './home.html';
import '/plantLibrary.html';
import '/about.html';

const insertPlant = (plantText, user) =>
  plantCollection.insert({
    text: plantText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'Orsodè';
const SEED_PASSWORD = 'password';

Meteor.startup (() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

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
    ]. forEach(plantText => insertPlant (plantText, user));
  }
});




