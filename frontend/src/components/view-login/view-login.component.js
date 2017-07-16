'use strict';

import UserService from './../../services/user/user.service';

import template from './view-login.template.html';
import './view-login.style.css';

class ViewLoginComponent {
  constructor() {
    this.controller = ViewLoginComponentController;
    this.template = template;
  }

  static get name() {
    return 'viewLogin';
  }
}

class ViewLoginComponentController {
  constructor($state, $mdToast, UserService) {
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.UserService = UserService;
  }

  $onInit() {
    this.login = {};
  }

  async submit() {
    const {username, password} = this.login;

    try {
      await this.UserService.login(username, password);

      this.$state.go('dashboard.feedback-mine-inbound', {});
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Welcome back, ' + username + '.')
          .position('top center')
          .capsule(true)
          .hideDelay(4000));

    } catch (e) {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(e.data.error)
          .position('top center')
          .hideDelay(4000)
          .capsule(true)
      );
    }
  }

  forgotPass() {
    // Placeholder for forgot password routing..
    //this.$state.go('/',{});
  }

  static get $inject() {
    return ['$state', '$mdToast', UserService.name];
  }
}

export default ViewLoginComponent;
