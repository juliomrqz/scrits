import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { Restangular } from 'ngx-restangular';

import { WindowRefService } from '../window/window-ref.service';
import { User, UserPassword } from './interfaces';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class UserService {
  /**
   * Creates a new UserService with the injected Http.
   * @param {Restangular} restangular - The injected Restangular.
   * @constructor
   */
  constructor(private restangular: Restangular) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {User} The Observable for the HTTP request.
   */
  public detail(): Observable<User> {
    return this.restangular.one('user').get();
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {User} The Observable for the HTTP request.
   */
  public update(userInfo: User): Observable<User> {
    return this.restangular.one('user').patch(userInfo);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {UserPassword} The Observable for the HTTP request.
   */
  public updatePassword(userPassword: UserPassword): Observable<User> {
    return this.restangular.one('password').post('change', userPassword);
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    const errorJson = error.json();
    const firstServerMessage = errorJson[Object.keys(errorJson)[0]];
    let errMsg: string;

    if (firstServerMessage) {
      errMsg = firstServerMessage;
    } else {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      errMsg = error.message
        ? error.message
        : error.status
          ? `${error.status} - ${error.statusText}`
          : 'Server error';
      // console.error(errMsg); // log to console instead
    }

    return throwError(errMsg);
  }
}
