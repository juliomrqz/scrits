import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesService } from '../shared/backend/articles.service';
import { CategoriesService } from '../shared/backend/categories.service';
import { Article, ArticleExtended, Category } from '../shared/backend/interfaces';

import { WindowRefService } from '../shared/window/window-ref.service';
import { validateSlug } from '../shared/forms/validators';

const slugify: any = require('slugify');


/**
 * This class represents the lazy loaded ArticlesEditComponent.
 */
@Component({
  selector: 'scrits-articles-edit',
  templateUrl: 'articles-edit.component.html'
})
export class ArticlesEditComponent implements AfterViewInit, OnChanges, OnInit {
  articleForm: FormGroup;
  articleId: number;
  articleErrorMessage: string;
  categories: Category[] = [];
  categoriesErrorMessage: string;
  isCreated = false;
  showLoadingIcon = false;
  showSpinner = true;
  toolbar: {} = {};
  toolbarCreate = {
    'title': 'Create Article',
    'subtitle': 'Create your article'
  };
  toolbarEdit = {
    'title': 'Update Article',
    'subtitle': 'Update your article'
  };

  private _isEditMode = false;
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
    public categoriesService: CategoriesService,
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    windowRef: WindowRefService) {

    // Store the browser native window
    this.window = windowRef.nativeWindow;

    // Create user details form
    this.articleForm = fb.group({
      'title': ['', Validators.required],
      'slug': ['', Validators.compose([
        Validators.required,
        validateSlug
      ])],
      'content': ['', Validators.required],
      'category': ['', Validators.required],
      'status': ['0', Validators.required],
      'description': ['', Validators.maxLength(200)],
      'tags': [''],
    });
  }

  ngOnInit() {
    this.getArticleId();

    this.getCategories();

    this.updateToolbarText();
  }

  ngAfterViewInit() {
    this.getArticleInformation();
  }

  ngOnChanges(changes: any): void {
    console.log('Changes, changes');
  }

  titleOnChange(data: any) {
    const slugControl = this.articleForm.controls['slug'];
    if (data !== null && !slugControl.dirty) {
      slugControl.patchValue(slugify(data).toLowerCase());
    }
  }

  get isEditMode(): any {
    return this._isEditMode;
  }

  set isEditMode(v: any) {
    if (v !== this._isEditMode) {
      this._isEditMode = v;
    }

    this.updateToolbarText();
  }

  updateToolbarText() {
    if (this.isEditMode === true) {
      this.toolbar = this.toolbarEdit;
    } else {
      this.toolbar = this.toolbarCreate;

      this.showSpinner = false;
    }
  }

  /**
   * Handle the categoriesService observable
   */
  getArticleInformation() {
    if (this.isEditMode) {
      this.showSpinner = true;

      this.articlesService.detail(this.articleId)
        .subscribe(
        article => {
          // Update the aticle form
          this.updateArticleForm(article);

          this.showSpinner = false;
        },
        error => this.articleErrorMessage = <any>error
        );
    }
  }

  updateArticleForm(article: ArticleExtended) {
    let categoryId: Number;

    if (article.category.id) {
      categoryId = article.category.id;
    } else {
      categoryId = article.category;
    }

    // Reset the state of the form
    this.articleForm.reset();

    // Update the article form values
    this.articleForm.setValue({
      title: article.title,
      slug: article.slug,
      content: article.content,
      category: categoryId,
      status: String(article.status),
      description: article.description,
      tags: article.tags
    });
  }

  /**
   * Get the article ID
   */
  getArticleId() {
    this.route.params.subscribe(params => {
      this.articleId = Number(params['id']);

      if (this.articleId > 0) {
        this.isEditMode = true;
      }
    });
  }

  /**
   * Handle the categoriesService observable
   */
  getCategories() {
    this.categoriesService.list()
      .subscribe(
      response => this.categories = response,
      error => this.categoriesErrorMessage = <any>error
      );
  }

  /**
   * Submit the article form
   */
  submitArticleForm(value: ArticleExtended, isValid: boolean): void {
    if (isValid) {
      this.showLoadingIcon = true;

      if (value.tags.length > 0) {
        if (typeof value.tags === 'string') {
          value.tags = value.tags.split(',');
        }
      }

      if (this.isEditMode) {
        value.id = this.articleId;

        this.articlesService.update(value).subscribe(
          article => {
            this.updateArticleForm(article);

            this.showLoadingIcon = false;
          },
          error => {
            this.articleErrorMessage = <any>error;

            this.showLoadingIcon = false;
          }
        );
      } else {
        this.articlesService.create(value).subscribe(
          article => {
            this.isCreated = true;
            this.router.navigate(['articles']);
          },
          error => {
            this.articleErrorMessage = <any>error;
            this.showLoadingIcon = false;
          }
        );
      }

    } else {
      let control: FormControl;
      // Show fields errors
      for (const controlName of Object.keys(this.articleForm.controls)) {
        control = <FormControl>this.articleForm.controls[controlName];

        // This prevents the slug field stop filling automatically when
        // user has not updated it
        if (!control.valid) {
          control.markAsDirty();
        }
      }
    }
  }

  /**
   * Submit the article form
   */
  removeArticle() {
    if (this.window.confirm('Are you sure you want to remove the article')) {
      this.showLoadingIcon = true;

      this.articlesService.remove(this.articleId).subscribe(
        response => {
          this.router.navigate(['articles']);
        },
        error => {
          this.articleErrorMessage = <any>error;
          this.showLoadingIcon = false;
        }
      );
    }
  }

}
