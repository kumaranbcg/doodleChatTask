import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  constructor(private myRoute: Router) { }
  /**
   *
   * @param token
   * To save user details
   */
  sendToken(token: string) {
    localStorage.setItem('currentUser', token);
  }

  /**
   * To get token
   */
  getToken() {
    return localStorage.getItem('currentUser');
  }

  /**
   * To check user is loggedin or not
   */
  isLoggedIn() {
    return localStorage.getItem('currentUser');
  }

  /**
   * To logout the user
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.myRoute.navigate(['']);
  }
}
