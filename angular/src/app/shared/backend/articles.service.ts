import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular';

import { Article, ArticleExtended } from './interfaces';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class ArticlesService {
  private headers: HttpHeaders;

  /**
   * Creates a new ArticlesService with the injected Http.
   * @param {Restangular} restangular - The injected Restangular.
   * @constructor
   */
  constructor(private restangular: Restangular) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Observable<Article[]>} The Observable for the HTTP request.
   */
  public list(
    searchTerm: string = null,
    pageNumber: number = null,
    isSortByVotes: boolean = false
  ): Observable<Article[]> {
    const sortByVotes = isSortByVotes ? { ordering: '-total_votes' } : {};
    const page = pageNumber ? { page: pageNumber } : {};
    const search = searchTerm ? { search: searchTerm } : {};

    return this.restangular
      .all('articles')
      .getList({ ...search, ...page, ...sortByVotes });
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Article} The Observable for the HTTP request.
   */
  public create(articleInfo: Article): Observable<Article> {
    return this.restangular.all('articles').post(articleInfo);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {ArticleExtended} The Observable for the HTTP request.
   */
  public update(articleInfo: ArticleExtended): Observable<ArticleExtended> {
    return this.restangular.one('articles', articleInfo.id).patch(articleInfo);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {ArticleExtended} The Observable for the HTTP request.
   */
  public detail(id: number): Observable<ArticleExtended> {
    return this.restangular.one('articles', id).get();
  }

  /**
   * Returns an Observable for the HTTP DELETE request for the JSON resource.
   * @return {any} The Observable for the HTTP request.
   */
  public remove(id: number): Observable<any> {
    return this.restangular.one('articles', id).remove();
  }
}
