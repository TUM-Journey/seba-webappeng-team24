'use strict';

import FeedbackService from '../../../services/feedback/feedback.service';
import UserService from '../../../services/user/user.service';
import template from './feedback-review.template.html';
import './feedback-review.style.css';
import pdf from 'pdfjs'
import helvetica from '../../../Helvetica.json'

class FeedbackReviewComponent {
  constructor() {
    this.controller = FeedbackReviewComponentController;
    this.template = template;

  }

  static get name() {
    return 'feedbackReview';
  }
}

class FeedbackReviewComponentController {

  constructor($scope, $state, feedbackService, userService, FileSaver, Blob) {
    this.FileSaver = FileSaver;
    this.Blob = Blob;
    this.$state = $state;
    this.feedbackService = feedbackService;
    this.userService = userService;

    this.users = userService.listAllUsers();

    this.selectedUser = null;
    this.feedbacks = null;
    this.avgMatrix = null;
  }

  refreshFeedbacks() {
    if (!this.selectedUser) {
      this.feedbacks = [];
      return;
    }

    this.feedbacks = this.feedbackService.listAll({ username: this.selectedUser.username });
  }

  save(doc) {
    return doc.asBuffer()
      .then(buf => {
        const blob = new this.Blob([buf], { type: 'application/pdf' })
        // return URL.createObjectURL(blob)
        return this.FileSaver.saveAs(blob, 'test.pdf')

      })
  }
  generatePdf() {

    const document = new pdf.Document({
      font: new pdf.Font(helvetica),
      padding: 10
    })
    document.text("hello there world")
    const file = this.save(document)
    console.log(file)

  }


  refreshAvgMatrix() {
    if (!this.selectedUser) {
      this.avgMatrix = null;
      return;
    }

    this.avgMatrix = this.feedbackService.userAvgMatrix({ username: this.selectedUser.username });
  }

  static get $inject() {
    return ['$scope', '$state', FeedbackService.name, UserService.name, 'FileSaver', 'Blob'];
  }
}


export default FeedbackReviewComponent;
