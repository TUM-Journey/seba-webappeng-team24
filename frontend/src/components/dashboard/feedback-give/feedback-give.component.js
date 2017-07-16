'use strict';

import template from './feedback-give.template.html';
import './feedback-give.style.css';
import UserService from '../../../services/user/user.service';
import FormService from '../../../services/form/form.service';
import FeedbackService from '../../../services/feedback/feedback.service';

class FeedbackGiveComponent {
  constructor() {
    this.controller = FeedbackGiveComponentController;
    this.template = template;
  }

  static get name() {
    return 'feedbackGive';
  }
}

class FeedbackGiveComponentController {
  constructor($state, $scope, $mdToast, $timeout, userService, formService, feedbackService) {
    this.$state = $state;
    this.$scope = $scope;
    this.$mdToast = $mdToast;

    this.userService = userService;
    this.formService = formService;
    this.feedbackService = feedbackService;

    if ($state.params.feedbackRequest) {
      $timeout(() => {
        $scope.feedback = {author: $state.params.feedbackRequest.author};
        this.loadEligibleForm($scope.feedback.author);
      });
    }
  }

  async searchUser(name) {
    return name ? this.userService.searchNotMeUsers(name) : this.userService.listAllUsers();
  }

  async loadEligibleForm(user) {
    if (!user) {
      this.$scope.form = null;
      return;
    }

    const userGroups = await this.userService.getUserGroups(user.username);

    if (!userGroups || userGroups.length === 0) {
      this.$scope.form = null;
      return;
    }

    const firstUserGroup = userGroups[0]; // TODO: think about form choice here
    const formsOfTheUserGroup = await this.formService.listAll({userGroupname: firstUserGroup._id}).$promise;
    this.$scope.feedback.form = formsOfTheUserGroup[0];
  }

  async saveFeedback(feedback) {
    const newFeedback = {
      formId: feedback.form._id,
      author: this.userService.getCurrentUser().username,
      username: feedback.author.username,
      summary: feedback.summary,
      competencies: Object.keys(feedback.competencies).map(id => {
        return {
          "characteristicId": id,
          "grade": feedback.competencies[id]
        }
      })
    };

    try {
      await this.feedbackService.persistFeedback(newFeedback).$promise;

      if (this.$state.params.feedbackRequest)
        await this.feedbackService.removeFeedbackRequest({requestId: this.$state.params.feedbackRequest._id}).$promise;

      this.$state.go('dashboard.feedback-mine-outbound', {});
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Thank you! Your feedback has been saved.')
          .position('top')
          .hideDelay(4000));

    } catch (e) {
      console.error(e);
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(e.data && e.data.error ? e.data.error : e)
          .position('top')
          .hideDelay(4000)
      );
    }
  }

  static get $inject() {
    return ['$state', '$scope', '$mdToast', '$timeout', UserService.name, FormService.name, FeedbackService.name];
  }

}

export default FeedbackGiveComponent;
