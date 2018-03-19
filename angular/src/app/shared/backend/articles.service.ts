import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging
import { CookieService } from 'ngx-cookie';
const URI = require('urijs');

import { ApiQueryString, Article, ArticleExtended, ObjectList } from './interfaces';
import { getAutheticationHeaders } from './services.tools';

const API_URL = process.env.API_URL;

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class ArticlesService {
  private headers: HttpHeaders;

  /**
   * Creates a new ArticlesService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param {WindowRefService} windowRef - The injected WindowRefService.
   * @constructor
   */
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService) {
    this.headers = getAutheticationHeaders(cookieService);
  }

  getApiURL(
    id: Number = null,
    searchTerm: string = null,
    pageNumber: number = null,
    sortByVotes: boolean = false
  ): string {
    // Create the url object
    const apiUrl = new URI('');
    const urlQueries = {};
    const paths = [process.env.API_URL]

    // Indicate the articles path
    paths.push('articles');

    if (id) {
      // Append the article id to the url path
      paths.push(String(id));
    } else {
      if (searchTerm) {
        // Indicate the search term
        urlQueries['search'] = searchTerm;
      }

      if (pageNumber) {
        // Indicate the page number
        urlQueries['page'] = pageNumber;
      }

      if (sortByVotes) {
        // Indicate vote ordering
        urlQueries['ordering'] = '-total_votes';
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
   * @return {ObjectList<Article>} The Observable for the HTTP request.
   */
  list(
    searchTerm: string = null,
    pageNumber: number = null,
    sortByVotes: boolean = false
  ): Observable<ObjectList<Article>> {
    return this.http.get(this.getApiURL(undefined,
      searchTerm, pageNumber, sortByVotes), { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Article} The Observable for the HTTP request.
   */
  create(articleInfo: Article): Observable<Article> {
    return this.http.post(this.getApiURL(), articleInfo, { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {ArticleExtended} The Observable for the HTTP request.
   */
  update(articleInfo: ArticleExtended): Observable<ArticleExtended> {
    const id = articleInfo.id;

    return this.http.patch(this.getApiURL(id), articleInfo, { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {ArticleExtended} The Observable for the HTTP request.
   */
  detail(id: number): Observable<ArticleExtended> {
    return this.http.get(this.getApiURL(id), { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }


  /**
   * Returns an Observable for the HTTP DELETE request for the JSON resource.
   * @return {any} The Observable for the HTTP request.
   */
  remove(id: Number): Observable<any> {
    return this.http.delete(this.getApiURL(id), { headers: this.headers })
      .map((res: Response) => res)
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }


  /**
    * Handle HTTP error
    */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

