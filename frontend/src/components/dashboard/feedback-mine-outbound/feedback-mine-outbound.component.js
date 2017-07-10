'use strict';

import FeedbackService from '../../../services/feedback/feedback.service'
import template from './feedback-mine-outbound.template.html';
import './feedback-mine-outbound.style.css';

class FeedbackMineOutboundComponent {
  constructor() {
    this.controller = FeedbackMineOutboundComponentController;
    this.template = template;

  }

  static get name() {
    return 'feedbackMineOutbound';
  }
}

class FeedbackMineOutboundComponentController {

  constructor($scope, $state, feedbackService) {
    this.$state = $state;
    this.feedbackService = feedbackService;

    this.feedbacks = this.feedbackService.listMineOutbound();
  }

  static get $inject() {
    return ['$scope', '$state', FeedbackService.name];
  }
}


export default FeedbackMineOutboundComponent;
