import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AccountComponent } from './account';
import {
  ArticlesComponent,
  ArticlesDetailComponent,
  ArticlesEditComponent,
  ArticlesEditDeactivateGuard
} from './articles';
import { CategoriesComponent } from './categories';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'account',      component: AccountComponent },

  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/create', component: ArticlesEditComponent, canDeactivate: [ArticlesEditDeactivateGuard] },
  { path: 'articles/:id', component: ArticlesDetailComponent },
  { path: 'articles/:id/edit', component: ArticlesEditComponent, canDeactivate: [ArticlesEditDeactivateGuard] },

  { path: 'categories', component: CategoriesComponent },

  { path: '**',    component: NoContentComponent },
];
