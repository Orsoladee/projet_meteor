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
  },
  lastIrrigation : {
    type: String,
    label : 'Last irrigation of the plant'
  },
});

Plants.attachSchema (Plants.schema);


if (Meteor.isServer) {
  Meteor.startup(() => {
    Plants.remove({});
 
    Plants.insert ({
      name : 'Rose',
      emplacement : 'Garden',
      plantIrrigationPeriod : 'Twice a week',
      plantIrrigationQuantity : '2 L',
      lastIrrigation : new Date('2023-06-05'),
      photoUrl : 'https://fr.freepik.com/photos-gratuite/fleur-rose-blanc-isole_7122337.htm#query=rose%20fleur&position=0&from_view=keyword&track=ais',
    });

    Plants.insert({
      name : 'Tulipe',
      emplacement : 'Balcony',
      plantIrrigationPeriod : 'Once a week',
      plantIrrigationQuantity : '1,5 L',
      lastIrrigation : new Date('2023-06-03'),
      photoUrl : 'https://fr.freepik.com/photos-gratuite/bouquet-tulipes-fond-rose-fond_3948708.htm#query=Tulipe&position=1&from_view=search&track=locales',
    });

    Plants.insert({
      name : 'Basilic',
      emplacement : 'Garden',
      plantIrrigationPeriod : '3 times a week',
      plantIrrigationQuantity : '3 L',
      lastIrrigation : new Date('2023-06-02'),
      photoUrl : 'https://fr.freepik.com/psd-premium/feuille-basilic-couche-alpha_26803035.htm#query=basilic&position=8&from_view=search&track=locales',
    });

    Plants.insert ({
      name : 'Jacinthe',
      emplacement : 'Balcony',
      plantIrrigationPeriod : 'Twice a week',
      plantIrrigationQuantity : '2 L',
      lastIrrigation : new Date('2023-06-01'),
      photoUrl : 'https://fr.freepik.com/photos-gratuite/jacinthe-bleue-isolee_7121125.htm#query=jacinthe&position=3&from_view=search&track=locales',
    });

    Plants.insert ({
      name : 'Sureau',
      emplacement : 'Outside',
      plantIrrigationPeriod : 'Once a week',
      plantIrrigationQuantity : '4 L',
      lastIrrigation : new Date('2023-05-27'),
      photoUrl : 'https://fr.freepik.com/vecteurs-libre/arbre-fleur-sureau_4062044.htm#query=sureau&position=0&from_view=search&track=locales',
    });

  });
}