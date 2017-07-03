'use strict';

import template from './dashboard.template.html';
import './dashboard.style.css';

class DashboardComponent {
  constructor() {
    this.controller = DashboardComponentController;
    this.template = template;
  }

  static get name() {
    return 'dashboard';
  }
}

class DashboardComponentController {
  constructor($state) {
    this.$state = $state;
  }

  static get $inject() {
    return ['$state'];
  }
}

export default DashboardComponent;
