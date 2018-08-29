import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CategoriesService } from '../shared/backend/categories.service';
import { Category } from '../shared/backend/interfaces';
import { WindowRefService } from '../shared/window/window-ref.service';
import { CategoriesModalComponent } from './categories-modal.component';

/**
 * This class represents the lazy loaded CategoriesComponent.
 */
@Component({
  selector: 'scrits-categories',
  templateUrl: 'categories.component.html',
})
export class CategoriesComponent implements OnInit {
  @ViewChild(CategoriesModalComponent) public createModal: CategoriesModalComponent;

  categoriesPerPage = 10;
  categories: Category[] = [];
  currentPage = 1;
  modalModel: Category = { title: '', slug: '', description: '' };
  errorMessage: string;
  paginationId = 'categoriesPagination';
  showSpinner = true;
  toolbar = {
    'title': 'Categories',
    'subtitle': 'Your categories list'
  };
  totalCategories = 0;

  private window: Window;

  /**
   * Creates an instance of the CategoriesComponent with the injected
   * CategoriesService, FormBuilder and WindowRefService.
   *
   * @param {CategoriesService} categoriesService - The injected CategoriesService.
   * @param {FormBuilder} fb - The injected FormBuilder.
   * @param {WindowRefService} windowRef - The injected WindowRefService.
   */
  constructor(
    public categoriesService: CategoriesService,
    fb: FormBuilder,
    windowRef: WindowRefService) {

    // Store the browser native window
    this.window = windowRef.nativeWindow;
  }

  /**
   * Get the categories OnInit
   */
  ngOnInit() {
    this.getCategories();
  }

  /**
   * Handle the categoriesService observable
   */
  getCategories(pageNumber: number = null) {
    this.showSpinner = true;

    this.categoriesService.list(pageNumber)
      .subscribe(
        response => {
        this.categories = response;
        this.totalCategories = (<any>response).total();

        if (pageNumber) {
          this.currentPage = pageNumber;
        }

        this.showSpinner = false;
      },
      error => this.errorMessage = <any>error
      );
  }

  /**
   * Handle the categoriesService observable
   */
  updateCategories() {
    this.getCategories();
  }

  /**
   * Handle the category edition
   */
  editCategory(event: any, category: Category) {
    event.preventDefault();

    // Cloenthe category object
    this.modalModel = Object.create(category);

    this.createModal.show(true);
  }

  /**
   * Handle the category remotion
   */
  removeCategory(event: any, category: Category) {
    event.preventDefault();

    const message = 'Are you sure you want to remove this category: '
      + category.title
      + '?\n\nNOTE: All articles related to this category will be removed.';

    if (this.window.confirm(message)) {
      this.categoriesService.delete(category.id).subscribe(
        response => {
          console.log(response);
          this.updateCategories();
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  /**
   * Handle the category remotion
   */
  createCategory(event: any) {
    event.preventDefault();

    // Reset modal model
    this.modalModel = { title: '', slug: '', description: '' };

    this.createModal.show();
  }

  /**
   * Handle the onCreate event
   */
  onCreate(category: Category) {
    this.updateCategories();
  }

  /**
   * Handle the onCreate event
   */
  onUpdate(category: Category) {
    this.updateCategories();
  }


  /**
   * Handle the page change event
   */
  onPageChange(page: number) {
    // console.log(page);

    this.getCategories(page);

    // this.currentPage = page;
  }


}
