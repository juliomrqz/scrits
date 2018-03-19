import { Component, Input } from '@angular/core';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'scrits-toolbar',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
  @Input() text: any;
}

