import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PaginationControlsComponent } from 'ngx-pagination';


@Component({
  selector: 'scrits-pagination',
  styles: ['li > a { cursor: pointer; }'],
  templateUrl: 'scrits-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScritsPaginationComponent extends PaginationControlsComponent { }
