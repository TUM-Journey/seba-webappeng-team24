'use strict';

import UserService from '../user/user.service';

export default class FeedbackService {

  constructor($resource, API_URL, userService) {
    const userToken = userService.getToken();
    if (!userToken)
      throw new Error("Token is required to gen an access to feedbacks (protected resource)");

    return $resource(API_URL + '/feedbacks', null, {
      listAll: {
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      },
      listMineInbound: {
        url: API_URL + '/feedbacks/mine/inbound',
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      },
      listMineOutbound: {
        url: API_URL + '/feedbacks/mine/outbound',
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      },
      userAvgMatrix: {
        url: API_URL + '/feedbacks/competencies/average',
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      },
      persistFeedback: {
        url: API_URL + '/feedbacks/',
        method: 'POST',
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      },
      listAllRequests: {
        url: API_URL + '/feedbacks/requests',
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      },
      requestFeedback: {
        url: API_URL + '/feedbacks/requests',
        method: 'POST',
        headers: {
          'Authorization': 'JWT ' + userToken
        }
      },
      removeFeedbackRequest: {
        url: API_URL + '/feedbacks/requests/:requestId',
        params: {requestId: "@requestId"},
        method: 'DELETE',
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
