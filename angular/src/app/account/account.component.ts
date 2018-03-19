import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, UserPassword } from '../shared/backend/interfaces';
import { UserService } from '../shared/backend/user.service';

/**
 * This class represents the lazy loaded AccountComponent.
 */
@Component({
  selector: 'scrits-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  formDetails: FormGroup;
  formPassword: FormGroup;
  showFormDetailsSpinner: boolean = true;
  toolbar = {
    'title': 'Account',
    'subtitle': 'Your account settings'
  };
  userInfoErrorMessage: string;
  userPasswordErrorMessage: string;

  /**
   * Creates an instance of the AccountComponent with the injected
   * UserService.
   *
   * @param {UserService} userService - The injected UserService.
   * @param {FormBuilder} fb - The injected FormBuilder.
   */
  constructor(public userService: UserService, fb: FormBuilder) {
    // Create user details form
    this.formDetails = fb.group({
      'username': ['', Validators.required],
      'first_name': '',
      'last_name': ''
    });

    // Create change passord form
    this.formPassword = fb.group({
      'new_password1': ['', Validators.required],
      'new_password2': ['', Validators.required],
      'old_password': ['', Validators.required],
    });
  }

  /**
   * Get the articles OnInit
   */
  ngOnInit() {
    this.getUserInfo();
  }

  /**
   * Handle the ArticlesService articles lists observable
   */
  getUserInfo() {
    this.userService.detail().subscribe(
      userInfo => {
        this.updateFormDetails(userInfo);

        this.showFormDetailsSpinner = false;
      },
      error => this.userInfoErrorMessage = <any>error
    );
  }

  updateFormDetails(userInfo: User) {
    // Reset form
    this.formDetails.reset();

    // Update form
    this.formDetails.setValue({
      username: userInfo.username,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
    });
  }

  submitUserInfo(value: User, isValid: boolean): void {
    console.log(value, isValid);

    if (isValid) {
      this.userService.update(value).subscribe(
        userInfo => {
          // this.userInfo = userInfo;
          this.updateFormDetails(userInfo);
        },
        error => this.userInfoErrorMessage = <any>error
      );
    }
  }

  submitUserPassword(value: UserPassword, isValid: boolean): void {
    console.log(value, isValid);

    if (isValid) {
      this.userService.updatePassword(value).subscribe(
        userPassword => {
          this.formPassword.reset();
        },
        error => this.userPasswordErrorMessage = <any>error
      );
    }
  }
}
