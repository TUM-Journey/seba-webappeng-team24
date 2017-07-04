'use strict';

export default class FeedbackService {

  constructor($resource, API_URL) {
    return $resource(API_URL + '/feedbacks/:id');
  }

  static get $inject() {
    return ['$resource', 'API_URL'];
  }

  static get name() {
    return 'feedbackService';
  }
}
