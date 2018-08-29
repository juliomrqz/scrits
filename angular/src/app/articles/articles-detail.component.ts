import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesService } from '../shared/backend/articles.service';
import { Article, ArticleExtended, Category } from '../shared/backend/interfaces';

import { WindowRefService } from '../shared/window/window-ref.service';

/**
 * This class represents the lazy loaded ArticlesDetailComponent.
 */
@Component({
  selector: 'scrits-articles-detail',
  templateUrl: 'articles-detail.component.html'
})
export class ArticlesDetailComponent implements AfterViewInit, OnInit {

  article: ArticleExtended;
  articleErrorMessage: string;
  articleId: number;
  errorMessage: string;
  showSpinner = true;
  toolbar = {
    'title': 'Article detail',
    'subtitle': 'Details of your article'
  };
  private window: Window;

  /**
   * Creates an instance of the ArticlesEditComponent with the injected
   * ArticlesService and FormBuilder.
   *
   * @param {ArticlesService} articlesService - The injected ArticlesService.
   * @param {FormBuilder} fb - The injected FormBuilder.
   * @param {ActivatedRoute} route - The injected ActivatedRoute.
   * @param {Router} router - The injected Router.
   */
  constructor(
    public articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    windowRef: WindowRefService) {

    // Store the browser native window
    this.window = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.getArticleId();
  }


  ngAfterViewInit() {
    this.getArticleInformation();
  }

  /**
   * Handle the categoriesService observable
   */
  getArticleInformation() {
    this.articlesService.detail(this.articleId)
      .subscribe(
      article => {
        // Update the aticle form
        this.article = article;

        // Update the title bar
        this.toolbar = {
          'title': this.article.title,
          'subtitle': '<i class="fa fa-folder-o"></i> ' + this.article.category.title
        };

        this.showSpinner = false;
      },
      error => this.articleErrorMessage = <any>error
      );
  }

  /**
   * Get the article ID
   */
  getArticleId() {
    this.route.params.subscribe(params => {
      this.articleId = Number(params['id']);
    });
  }

  /**
   * Handle the article remotion
   */
  removeArticle() {
    event.preventDefault();

    if (this.window.confirm('Are you sure you want to remove this article?')) {
      this.articlesService.remove(this.articleId).subscribe(
        response => {
          this.router.navigate(['articles']);
        },
        error => this.errorMessage = <any>error
      );
    }
  }


}
