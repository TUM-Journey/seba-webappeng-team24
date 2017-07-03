'use strict';

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
  constructor($state) {
    this.$state = $state;
  }

  static get $inject() {
    return ['$state'];
  }
}

export default DashboardMenuComponent;
