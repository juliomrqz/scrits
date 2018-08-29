import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap';

import { CategoriesService } from '../shared/backend/categories.service';
import { Category } from '../shared/backend/interfaces';

const slugify: any = require('slugify');

/**
 * This class represents the lazy loaded CategoriesComponent.
 */
@Component({
  selector: 'scrits-category-modal',
  templateUrl: 'categories-modal.component.html'
})
export class CategoriesModalComponent {
  @ViewChild('modal') public modal: ModalDirective;

  errorMessage: string;
  @Input() public category: Category;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  isEditMode = false;
  showLoadingIcon = false;

  /**
   * Creates an instance of the AccountComponent with the injected
   * CategoriesService.
   *
   * @param {CategoriesService} categoriesService - The injected CategoriesService.
   */
  constructor(public categoriesService: CategoriesService) { }

  titleOnChange(data: any) {
    if (data !== null) {
      this.category.slug = slugify(data).toLowerCase();
    }
  }


  public show(isEditMode?: boolean): void {
    // Set the status edition of the modal
    this.isEditMode = isEditMode;

    // Reset the error message
    this.errorMessage = null;

    // Show the modal
    this.modal.show();
  }

  public hide(): void {
    // Hide the modal
    this.modal.hide();
  }

  submitCategoryForm(form: NgForm): void {
    if (form.valid) {
      this.showLoadingIcon = true;

      if (this.isEditMode) {
        this.categoriesService.update(this.category).subscribe(
          category => {
            this.update.emit(category);
            this.hide();
          },
          error => {
            this.errorMessage = <any>error;
            this.showLoadingIcon = false;
          }
        );
      } else {
        this.categoriesService.create(this.category).subscribe(
          category => {
            this.create.emit(category);
            this.hide();
          },
          error => {
            this.errorMessage = <any>error;
            this.showLoadingIcon = false;
          }
        );
      }
    }
  }
}
