'use strict';

import template from './feedback-request.template.html';
import './feedback-request.style.css';
import UserService from '../../../services/user/user.service';
import FormService from '../../../services/form/form.service';
import FeedbackService from '../../../services/feedback/feedback.service';

class FeedbackRequestComponent {
  constructor() {
    this.controller = FeedbackRequestComponentController;
    this.template = template;
  }

  static get name() {
    return 'feedbackRequest';
  }
}

class FeedbackRequestComponentController {
  constructor($state, $scope, $mdToast, userService, formService, feedbackService) {
    this.$state = $state;
    this.$scope = $scope;
    this.$mdToast = $mdToast;

    this.userService = userService;
    this.feedbackService = feedbackService;

    this.closestUsers = this.userService.listMyClosestUsers();
    this.outcomingRequests = this.feedbackService.listAllRequests({"author": userService.getCurrentUser().username});
    this.incomingRequests = this.feedbackService.listAllRequests({"username": userService.getCurrentUser().username});
  }

  async fetchClosestUsers() {
    this.$scope.closests = await this.userService.listMyClosestUsers();
  }

  async searchUser(name) {
    return name ? this.userService.searchNotMeUsers(name) : this.userService.listAllUsers();
  }

  async requestFeedback(user) {
    try {
      const persistedFeedbackRequest = await this.feedbackService.requestFeedback({
        "author": this.userService.getCurrentUser().username,
        "username": user.username
      }).$promise;

      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Thank you! Your feedback request has been saved.')
          .position('top')
          .capsule(true)
          .hideDelay(4000));

      persistedFeedbackRequest.user = user;
      this.outcomingRequests.push(persistedFeedbackRequest);

      this.$scope.feedbackRequest.requestee = null;
    } catch (e) {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(e.data.error)
          .position('top')
          .capsule(true)
          .hideDelay(4000)
      );
    }
  }

  async feedbackOnRequest(feedbackRequest) {
    this.$state.go('dashboard.feedback-give', {feedbackRequest: feedbackRequest});
  }

  static get $inject() {
    return ['$state', '$scope', '$mdToast', UserService.name, FormService.name, FeedbackService.name];
  }

}

export default FeedbackRequestComponent;
