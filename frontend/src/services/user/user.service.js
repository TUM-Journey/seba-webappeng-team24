'use strict';

const STORAGE_TOKEN_KEY = 'jwtToken';

export default class UserService {

  constructor($http, $window, $resource, API_URL) {
    this.$http = $http;
    this.$window = $window;
    this.API_URL = API_URL;

    this.$resource = $resource(API_URL + '/users', null, {
      listAll: {
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + this.getToken()
        }
      },
      listUserGroups: {
        url: API_URL + '/users/:username/usergroups',
        params: {username: "@username"},
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + this.getToken()
        }
      },
      listClosestUsers: {
        url: API_URL + '/users/:username/closest',
        params: {username: "@username"},
        method: 'GET',
        isArray: true,
        headers: {
          'Authorization': 'JWT ' + this.getToken()
        }
      }
    });
  }

  async register(type, name, username, email, password, position) {
    return this.$http.post(`${ this.API_URL }/register`, {
      type: type,
      name: name,
      username: username,
      email: email,
      password: password,
      position: position
    });
  }

  async login(username, password) {
    const token = await this.$http.get(`${ this.API_URL }/login?username=${username}&password=${password}`);
    this.$window.localStorage.setItem(STORAGE_TOKEN_KEY, token.data);
  }

  logout() {
    this.$window.localStorage.removeItem(STORAGE_TOKEN_KEY);
  }

  getCurrentUser() {
    let token = this.$window.localStorage[STORAGE_TOKEN_KEY];
    if (!token) return {};

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(this.$window.atob(base64));
  }

  getToken() {
    if (!this.isAuthenticated())
      return null;

    return this.$window.localStorage[STORAGE_TOKEN_KEY];
  }

  async listAllUsers() {
    return await this.$resource.listAll().$promise;
  }

  fetchAllUsers() {
    return this.$resource.listAll();
  }

  async searchNotMeUsers(name) {
    return await this.$resource.listAll({"notme": "true", "search": name}).$promise;
  }

  async getUserGroups(username) {
    return await this.$resource.listUserGroups({username: username}).$promise;
  }

  listMyClosestUsers() {
    return this.$resource.listClosestUsers({username: this.getCurrentUser().username});
  }

  isAuthenticated() {
    return !!this.$window.localStorage[STORAGE_TOKEN_KEY];
  }

  static get $inject() {
    return ['$http', '$window', '$resource', 'API_URL'];
  }

  static get name() {
    return 'userService';
  }
}
