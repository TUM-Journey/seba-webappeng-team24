'use strict';

import angular from 'angular';
import MatricesService from './matrices.service';

export default angular.module('MatricesService', [])
  .service(MatricesService.name, MatricesService);
