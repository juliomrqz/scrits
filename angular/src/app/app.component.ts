import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  Router,
  // NavigationStart,
  // NavigationEnd,
  // NavigationCancel,
  // NavigationError
} from '@angular/router';

// import { environment } from '../environments/environment';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'scrits-app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <!-- <ng2-slim-loading-bar [color]="'#337ab7'"></ng2-slim-loading-bar> -->

    <div class="wrapper">
      <scrits-sidebar class="sidebar-wrapper"></scrits-sidebar>

      <!-- Page Content -->
      <div class="page-content-wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnDestroy {
  private sub: any;
  // private position: string;

  constructor(
    // private slimLoader: SlimLoadingBarService,
    private router: Router
  ) {
    // Listen the navigation events to start or complete the slim bar loading
    this.sub = this.router.events.subscribe(
      event => {
        // if (event instanceof NavigationStart) {
        //   this.slimLoader.start();
        // } else if (
        //   event instanceof NavigationEnd ||
        //   event instanceof NavigationCancel ||
        //   event instanceof NavigationError
        // ) {
        //   this.slimLoader.complete();
        // }
      },
      (error: any) => {
        // this.slimLoader.complete();
      }
    );
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }
}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
