'use strict';

import UserService from './../../services/user/user.service';

import template from './view-register.template.html';
import './view-register.style.css';

class ViewRegisterComponent {
  constructor() {
    this.controller = ViewRegisterComponentController;
    this.template = template;
  }

  static get name() {
    return 'viewRegister';
  }
}

class ViewRegisterComponentController {
  constructor($state, $mdToast, UserService) {
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.UserService = UserService;
  }

  $onInit() {
    this.register = {};
  }

  async submit() {
    let {type, name, username, email, password, position} = this.register;

    try {
      await this.UserService.register(type, name, username, email, password, position);

      this.$state.go('login', {});
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Thank you for registration! Please user your credentials to log in, ' + name)
          .position('top')
          .capsule(true)
          .hideDelay(6000));
    } catch (e) {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(e.data.error)
          .position('top')
          .capsule(true)
          .hideDelay(4000)
      );
    }
  }

  static get $inject() {
    return ['$state', '$mdToast', UserService.name];
  }
}

export default ViewRegisterComponent;
