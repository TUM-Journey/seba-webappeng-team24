'use strict';

import UserService from '../user/user.service';

export default class FeedbackService {

  constructor($resource, API_URL, userService) {
    const userToken = userService.getToken();
    if (!userToken)
      throw new Error("Token is required to gen an access to feedbacks (protected resource)");

    return $resource(API_URL + '/feedbacks', null, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      }
    });
  }

  static get $inject() {
    return ['$resource', 'API_URL', UserService.name];
  }

  static get name() {
    return 'feedbackService';
  }
}
