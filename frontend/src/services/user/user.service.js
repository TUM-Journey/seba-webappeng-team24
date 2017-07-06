'use strict';

const STORAGE_TOKEN_KEY = 'jwtToken';

export default class UserService {

  constructor($http, $window, API_URL) {
    this.$http = $http;
    this.$window = $window;
    this.API_URL = API_URL;
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

  isAuthenticated() {
    return !!this.$window.localStorage[STORAGE_TOKEN_KEY];
  }

  static get $inject() {
    return ['$http', '$window', 'API_URL'];
  }

  static get name() {
    return 'userService';
  }
}
