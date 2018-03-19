import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ArticlesEditComponent } from './articles-edit.component';

import { WindowRefService } from '../shared/window/window-ref.service';


@Injectable()
export class ArticlesEditDeactivateGuard implements CanDeactivate<ArticlesEditComponent> {
  private window: Window;

  /**
   * Creates an instance of the ArticlesEditDeactivateGuard with the injected
   * WindowRefService.
   *
   * @param {WindowRefService} windowRef - The injected WindowRefService.
   */
  constructor(windowRef: WindowRefService) {

    // Store the browser native window
    this.window = windowRef.nativeWindow;
  }

  canDeactivate(target: ArticlesEditComponent) {
    if (target.articleForm.dirty && !target.isCreated) {
      return this.window.confirm('You have unsaved changes. Do you really want to cancel?');
    }
    return true;
  }
}
