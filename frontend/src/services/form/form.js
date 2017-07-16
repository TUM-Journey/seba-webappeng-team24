'use strict';

import angular from 'angular';
import FormService from './form.service';

export default angular.module('FormService', [])
  .service(FormService.name, FormService);
