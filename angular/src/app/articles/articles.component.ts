import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ArticlesService } from '../shared/backend/articles.service';

/**
 * This class represents the lazy loaded ArticlesComponent.
 */
@Component({
  selector: 'scrits-articles',
  templateUrl: 'articles.component.html',
  styles: ['.list-group-item-heading > a { color: inherit; }']
})
export class ArticlesComponent implements OnInit {

  articlesPerPage = 10;
  articles: any[] = [];
  currentPage = 1;
  errorMessage: string;
  paginationId = 'articlePagination';
  searchForm: FormGroup;
  showSpinner = true;
  toolbar = {
    'title': 'Articles',
    'subtitle': 'Your articles list'
  };
  totalArticles = 0;

  /**
   * Creates an instance of the ArticlesComponent with the injected
   * ArticlesService.
   *
   * @param {ArticlesService} articlesService - The injected ArticlesService.
   * @param {FormBuilder} fb - The injected FormBuilder.
   */
  constructor(
    public articlesService: ArticlesService,
    fb: FormBuilder) {

    // Create the searchForm
    this.searchForm = fb.group({
      searchTerm: []
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.submitSearchForm(this.searchForm);
      });
  }

  /**
   * Get the articles OnInit
   */
  ngOnInit() {
    this.getArticles(null, this.currentPage);
  }

  /**
   * Handle the ArticlesService articles lists observable
   */
  getArticles(searchTerm: string = null, pageNumber: number = null) {
    this.showSpinner = true;

    this.articlesService.list(searchTerm, pageNumber)
      .subscribe(
      response => {
        this.articles = response;
        this.totalArticles = (<any>response).total();

        if (pageNumber) {
          this.currentPage = pageNumber;
        }

        this.showSpinner = false;
      },
      error => this.errorMessage = <any>error
      );
  }

  /**
   * Handle the submition of the search form
   */
  submitSearchForm(form: any) {
    const searchTerm = form.value.searchTerm;

    if (searchTerm !== null) {
      this.getArticles(searchTerm, 1);
    }
  }

  /**
   * Handle the page change event
   */
  onPageChange(page: number) {
    this.getArticles(this.searchForm.get('searchTerm').value, page);
  }

}
