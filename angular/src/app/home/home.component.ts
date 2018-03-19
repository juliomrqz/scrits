import { Component, OnInit } from '@angular/core';

import { ArticlesService } from '../shared/backend/articles.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'scrits-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  articlesByVotes: any[] = [];
  articlesByVotesErrorMessage: string;
  articlesByCreated: any[] = [];
  articlesByCreatedErrorMessage: string;
  showMostVotedSpinner: boolean = true;
  showLatestSpinner: boolean = true;
  toolbar = {
    'title': 'Overview',
    'subtitle': 'Your categories and articles summary'
  };

  /**
   * Creates an instance of the HomeComponent with the injected
   * ArticlesService.
   *
   * @param {ArticlesService} articlesService - The injected ArticlesService.
   */
  constructor(public articlesService: ArticlesService) { }


  /**
   * Get the articles OnInit
   */
  ngOnInit() {
    this.getArticles();
  }


  /**
   * Handle the ArticlesService articles lists observable
   */
  getArticles() {
    this.articlesService.list(undefined, undefined, true)
      .subscribe(
      response => {
        this.articlesByVotes = response.results;
        this.showMostVotedSpinner = false;
      },
      error => this.articlesByVotesErrorMessage = <any>error
      );

    this.articlesService.list()
      .subscribe(
      response => {
        this.articlesByCreated = response.results;
        this.showLatestSpinner = false;
      },
      error => this.articlesByCreatedErrorMessage = <any>error
      );
  }
}
