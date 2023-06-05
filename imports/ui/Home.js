import Swal from 'sweetalert2';


Template.home.helpers({
  plants(){
    return Plants.find();
  },

  getPlantState(lastIrrigation) {
    const daysSinceLastIrrigation = Math.floor((new Date() - lastIrrigation) / (1000 * 60 * 60 * 24));
    if (daysSinceLastIrrigation <= 3) {
        return 'green';
    } else if (daysSinceLastIrrigation <=7) {
      return 'yellow';
    } else {
      return 'red';
    }
  },
});

Template.home.events({
  'click .deletePlant' (event, template) {
    const plantName = event.target.dataset.id;
    Plants.remove(plantName, (error) => {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Delete error',
          text : 'An error has occured'
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Plant deleted',
          text: 'The plant was successfully deleted',
        });
      };
    })
  },
});