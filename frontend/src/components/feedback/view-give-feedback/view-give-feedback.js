'use strict';

import angular from 'angular';

import ViewGiveFeedbackComponent from './view-give-feedback.component';


export default angular.module('ViewGiveFeedback', [])
    .component(ViewGiveFeedbackComponent.name, new ViewGiveFeedbackComponent);