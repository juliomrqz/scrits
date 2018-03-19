import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticlesDetailComponent } from './articles-detail.component';
import { ArticlesEditComponent } from './articles-edit.component';
import { ArticlesEditDeactivateGuard } from './articles-edit.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'articles', component: ArticlesComponent },
      { path: 'articles/create', component: ArticlesEditComponent, canDeactivate: [ArticlesEditDeactivateGuard] },
      { path: 'articles/:id', component: ArticlesDetailComponent },
      { path: 'articles/:id/edit', component: ArticlesEditComponent, canDeactivate: [ArticlesEditDeactivateGuard] },
    ])
  ],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
