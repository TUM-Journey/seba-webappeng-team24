'use strict';

import UserService from '../user/user.service';

export default class FormService {

  constructor($resource, API_URL, userService) {
    const userToken = userService.getToken();
    if (!userToken)
      throw new Error("Token is required to gen an access to forms (protected resource)");

    return $resource(API_URL + '/forms', null, {
      listAll: {
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
    return 'formService';
  }
}
