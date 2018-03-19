import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CookieModule } from 'ngx-cookie';
import { NgxPaginationModule } from 'ngx-pagination';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArticlesService } from './backend/articles.service';
import { CategoriesService } from './backend/categories.service';
import { UserService } from './backend/user.service';
import { SimpleMDEComponent } from './simplemde/simplemde.component';
import { WindowRefService } from './window/window-ref.service';
import { ScritsPaginationComponent } from './pagination/scrits-pagination.component';
import { ScritsInputComponent } from './forms/scrits-input.component';

import { ScritsLoadingIconComponent } from './loading/scrits-loading-icon.component';
import { ScritsBounceSpinnerComponent } from './loading/scrits-bounce-spinner.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    SimpleMDEComponent,
    ScritsPaginationComponent,
    ScritsLoadingIconComponent,
    ScritsBounceSpinnerComponent,
    ScritsInputComponent
  ],
  exports: [
    ToolbarComponent,
    SidebarComponent,
    SimpleMDEComponent,
    ScritsPaginationComponent,
    ScritsLoadingIconComponent,
    ScritsBounceSpinnerComponent,
    ScritsInputComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ArticlesService, CategoriesService, UserService, WindowRefService]
    };
  }
}
