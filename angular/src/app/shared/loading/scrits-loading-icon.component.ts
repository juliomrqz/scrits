import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'scrits-loading-icon',
  template: '<i class="fa fa-refresh fa-spin fa-fw"></i><span class="sr-only">Loading...</span>',
  styles: [`:host {
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
  }`]
})
export class ScritsLoadingIconComponent { }
