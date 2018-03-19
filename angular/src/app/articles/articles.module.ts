import { NgModule } from '@angular/core';

import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ArticlesComponent } from './articles.component';
import { ArticlesDetailComponent } from './articles-detail.component';
import { ArticlesEditComponent } from './articles-edit.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesEditDeactivateGuard } from './articles-edit.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ArticlesRoutingModule,
    MomentModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    ArticlesComponent,
    ArticlesDetailComponent,
    ArticlesEditComponent,
  ],
  exports: [ArticlesComponent],
  providers: [ArticlesEditDeactivateGuard]
})
export class ArticlesModule { }
