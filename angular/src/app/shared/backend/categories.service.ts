import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular';

import { Category } from './interfaces';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class CategoriesService {
  /**
   * Creates a new CategoriesService with the injected Http.
   * @param {Restangular} restangular - The injected Restangular.
   * @constructor
   */
  constructor(private restangular: Restangular) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Observable<Category[]>} The Observable for the HTTP request.
   */
  public list(pageNumber: number = null): Observable<Category[]> {
    const page = pageNumber ? { page: pageNumber } : {};

    return this.restangular.all('categories').getList({ ...page });
  }

  /**
   * Returns an Observable for the HTTP POST request for the JSON resource.
   * @return {Category} The Observable for the HTTP request.
   */
  public create(categoryInfo: Category): Observable<Category> {
    return this.restangular.all('categories').post(categoryInfo);
  }

  /**
   * Returns an Observable for the HTTP PATCH request for the JSON resource.
   * @return {Category} The Observable for the HTTP request.
   */
  public update(categoryInfo: Category): Observable<Category> {
    return this.restangular
      .one('categories', categoryInfo.id)
      .patch(categoryInfo);
  }

  /**
   * Returns an Observable for the HTTP DELETE request for the JSON resource.
   * @return {any} The Observable for the HTTP request.
   */
  public delete(id: number): Observable<any> {
    return this.restangular.one('categories', id).remove();
  }
}
