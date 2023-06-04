import'projet_meteor/imports/ui/app.js';
import { Template } from 'meteor/templating';
import { Plants } from '/import/api/plants.js';

import './main.html';

Template.plants.helpers ({
  plants () {
    return Plants.find();
  },
});

Template.plants.events({
  'click .insert-plant'(event, template){
    event.preventDefault();

    const name = template.find('.plant-name').value;
    const emplacement = template.find('.plant-emplacement').value;
    const plantIrrigationPeriod = template.find('.plant-irrigation-period').value;
    const plantIrrigationQuantity = template.find('.plant-irrigation-quantity').value;
    const file = template.find('.plant-picture').files[0];

    if (file) {
      const upload =images.insert({
        file : file,
        streams: 'dynamic',
        chunkSize: 'dynamic',
      });
      upload.on ('end', function (error, fileObj){
        if (error) {
          console.log('Erreur de téléchargement du fichier :', error);
        } else {
          const photoUrl = 'cdn/storage/Images/${fileObj._id}/${fileObj. name()}';
          Plants.insert({ name, emplacement, plantIrrigationPeriod, plantIrrigationQuantity, photoUrl});
          template.find('.plant-name').value = '';
          template.find('.plant-emplacement').value = '';
          template.find('.plant-irrigation-period').value = '';
          template.find('.plant-irrigation-quantity').value = '';
          template.find('.plant-picture').value ='';
        }
      });
 // Récuperer chaque valeur   

      upload.start();
    } else {
      Plants.insert({name, emplacement, plantIrrigationPeriod, plantIrrigationQuantity, photoUrl});
      template.find('.plant-name').value = '';
      template.find('.plant-emplacement').value = '';
      template.find('.plant-irrigation-period').value = '';
      template.find('.plant-irrigation-quantity').value = '';
  // réinitialiser le champ
    }
    


    Meteor.call('plants.insert', { name, emplacement, plantIrrigationPeriod, plantIrrigationQuantity });
// Inclure lors de l'insertion   
  },
});