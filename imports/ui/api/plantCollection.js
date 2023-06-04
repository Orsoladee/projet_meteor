import { Mongo } from 'meteor/mango';

export const plantCollection = new Mongo.Collection('plants');

Plants.schema = new SimpleSchema({
  name : {
    type : String,
    label: 'Name of the plant',
  },
  emplacement : {
    type : String,
    label : 'Emplacement of the plant',
  },
  plantIrrigationPeriod : {
    type : String,
    label : 'Irrigation period of the plant'
  },
  plantIrrigationQuantity : {
    type : String,
    label : 'Irrigation quantity of the plant'
  },
  photoUrl : {
    type: String,
    label : 'Url of the picture of the plant',
    optional : true // si ajout ultérieur
  }
});

Plants.attachSchema (Plants.schema);

