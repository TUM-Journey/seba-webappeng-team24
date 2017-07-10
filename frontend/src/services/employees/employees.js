'use strict';

import angular from 'angular';
import EmployeesService from './employees.service';

export default angular.module('EmployeesService', [])
  .service(EmployeesService.name, EmployeesService);
