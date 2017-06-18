'use strict';

import angular from 'angular';

import ViewRegisterComponent from './view-register.component';


export default angular.module('ViewRegister', ['ngMaterial', 'ngMessages'])
	.component(ViewRegisterComponent.name, new ViewRegisterComponent);