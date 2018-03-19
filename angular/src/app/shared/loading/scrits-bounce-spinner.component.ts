import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'scrits-bounce-spinner',
  template: `
    <div class="container-fluid">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
  `,
})
export class ScritsBounceSpinnerComponent {

}
