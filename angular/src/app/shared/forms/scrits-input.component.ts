import { Component, Input, OnChanges } from '@angular/core';

// Based on: http://almerosteyn.com/2016/03/angular2-form-validation-component

@Component({
  selector: 'scrits-input',
  template: `<div class="form-group" [ngClass]="{'has-error':errorMessage && isDirty}">
                <label *ngIf="labelText" [for]="idText" class="control-label">{{ labelText }}</label>

                <ng-content></ng-content>

                <span *ngIf="errorMessage && isDirty" class="help-block">
                  {{errorMessage}}
                </span>
             </div>
            `,
})
export class ScritsInputComponent implements OnChanges {
  @Input() labelText = '';
  @Input() idText = '';
  @Input() inputErrors: any;
  @Input() errorDefs: any;
  @Input() isDirty = false;

  errorMessage = '';

  ngOnChanges(changes: any): void {
    if (changes.inputErrors) {
      const errors: any = changes.inputErrors.currentValue;
      this.errorMessage = '';

      if (errors) {
        Object.keys(this.errorDefs).some(key => {
          if (errors[key]) {
            this.errorMessage = this.errorDefs[key];
            return true;
          }
          return false;
        });
      }
    }
  }
}
