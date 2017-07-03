'use strict';

import angular from 'angular';
import DashboardMenuComponent from './dashboard-menu.component';

export default angular.module('DashboardMenu', [])
  .component(DashboardMenuComponent.name, new DashboardMenuComponent);
