'use strict';

import UserService from '../user/user.service';

export default class MatricesService {

  constructor($resource, API_URL, userService) {
    const userToken = userService.getToken();
    if (!userToken)
      throw new Error("Token is required to gen an access to Employees");

    return $resource(API_URL + '/matrices', null, {
      getAll: {
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
    return 'matricesService';
  }
}
