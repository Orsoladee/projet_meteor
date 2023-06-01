import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name : 'home',
  action () {
    BlazeLayout.render('MainLayout', { main : 'Home'});
  },
});

FlowRouter.route('/plantLibrary', {
  name: 'plantLibrary',
  action() {
    BlazeLayout.render('MainLayout', { main : 'Plant Library'});
  },
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    BlazeLayout.render('MainLayout', { main: 'About'});
  },
});



