'use strict';

import UserService from './../../../services/user/user.service';
import template from './dashboard-menu.template.html';
import './dashboard-menu.style.css';

class DashboardMenuComponent {
  constructor() {
    this.controller = DashboardMenuComponentController;
    this.template = template;
  }

  static get name() {
    return 'dashboardMenu';
  }
}

class DashboardMenuComponentController {
  constructor($state, userService) {
    this.$state = $state;

    this.user = userService.getCurrentUser();
    this.user.isManager = this.user.type === 'MANAGER';
    this.user.isEmployee = this.user.type === 'EMPLOYEE';
  }

  static get $inject() {
    return ['$state', UserService.name];
  }
}

export default DashboardMenuComponent;
