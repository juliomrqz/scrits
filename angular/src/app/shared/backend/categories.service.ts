import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging
import { CookieService } from 'ngx-cookie';
const URI = require('urijs');

import { ApiQueryString, Category, ObjectList } from './interfaces';
import { getAutheticationHeaders } from './services.tools';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class CategoriesService {
  private headers: HttpHeaders;

  /**
   * Creates a new CategoriesService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param {WindowRefService} windowRef - The injected WindowRefService.
   * @constructor
   */
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService) {
    this.headers = getAutheticationHeaders(cookieService);
  }

  getApiURL(id: Number = null, pageNumber: number = null) {
    // Create the url object
    const apiUrl = new URI('');
    const urlQueries = {};
    const paths = [process.env.API_URL]

    // Insicate the categories path
    paths.push('categories');

    if (id) {
      // Append the category id to the url path
      paths.push(String(id));
    } else {
      if (pageNumber) {
        // Indicate the page number
        urlQueries['page'] = pageNumber;
      }

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
   * @return {ObjectList<Category>} The Observable for the HTTP request.
   */
  list(pageNumber: number = null): Observable<ObjectList<Category>> {
    return this.http.get(this.getApiURL(undefined, pageNumber), { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP POST request for the JSON resource.
   * @return {Category} The Observable for the HTTP request.
   */
  create(categoryInfo: Category): Observable<Category> {
    return this.http.post(this.getApiURL(), categoryInfo, { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP PATCH request for the JSON resource.
   * @return {Category} The Observable for the HTTP request.
   */
  update(categoryInfo: Category): Observable<Category> {
    const id = categoryInfo.id;

    return this.http.patch(this.getApiURL(id), categoryInfo, { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }


  /**
   * Returns an Observable for the HTTP DELETE request for the JSON resource.
   * @return {any} The Observable for the HTTP request.
   */
  delete(id: Number): Observable<any> {
    return this.http.delete(this.getApiURL(id), { headers: this.headers })
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

