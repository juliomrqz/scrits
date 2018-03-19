import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging
import { CookieService } from 'ngx-cookie';
const URI = require('urijs');

import { ApiQueryString, User, UserPassword } from './interfaces';
import { WindowRefService } from '../window/window-ref.service';
import { getAutheticationHeaders } from './services.tools';

enum ApiEndpoint {
  User,
  Password,
}

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class UserService {
  private headers: HttpHeaders;

  /**
   * Creates a new UserService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param {WindowRefService} windowRef - The injected WindowRefService.
   * @constructor
   */
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService) {
    this.headers = getAutheticationHeaders(cookieService);
  }

  getApiURL(endpoint: ApiEndpoint) {
    // Create the url object
    const apiUrl = new URI('');
    const urlQueries = {};
    const paths = [process.env.API_URL]

    if (endpoint === ApiEndpoint.User) {
      // Append the user to the url path
      paths.push('user');

    } else if (endpoint = ApiEndpoint.Password) {
      // Append the password & change to the url paths
      paths.push('password');
      paths.push('change');
    }

    // Ask for a json format
    urlQueries['format'] = 'json';

    // Build the Queries
    apiUrl.query(urlQueries);

    // Build Paths
    apiUrl.directory([...paths, ''].join('/'));

    // Return the string representation of the url
    return apiUrl.toString();
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {User} The Observable for the HTTP request.
   */
  detail(): Observable<User> {
    return this.http.get(this.getApiURL(ApiEndpoint.User), { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {User} The Observable for the HTTP request.
   */
  update(userInfo: User): Observable<User> {
    return this.http.patch(this.getApiURL(ApiEndpoint.User), userInfo, { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {UserPassword} The Observable for the HTTP request.
   */
  updatePassword(userPassword: UserPassword): Observable<User> {
    return this.http.post(this.getApiURL(ApiEndpoint.Password), userPassword, { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
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
      errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }

    return Observable.throw(errMsg);
  }
}

