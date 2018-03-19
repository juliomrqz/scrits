import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const SimpleMDE = require('simplemde');

@Component({
  selector: 'simple-mde',
  template: '<textarea #simplemde [(ngModel)]="value" (blur)="onBlur()" class="form-control"></textarea>',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SimpleMDEComponent),
    multi: true
  }]
})
export class SimpleMDEComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {
  @ViewChild('simplemde') textarea: ElementRef;
  simpleMDE: any;

  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  /**
   * Creates a new SimpleMDEComponent with the injected ElementRef.
   * @param {ElementRef} elementRef - The injected ElementRef.
   * @constructor
   */
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.initializeSimpleMDE();
  }

  ngOnDestroy() {
    this.destroySimpleMDE();
  }

  initializeSimpleMDE() {
    this.destroySimpleMDE();

    this.simpleMDE = new SimpleMDE({
      element: this.elementRef.nativeElement.value,
      autoDownloadFontAwesome: false,
      forceSync: true,
      hideIcons: ['side-by-side', 'fullscreen']
    });

    if (this.value) {
      this.simpleMDE.value(this.value);
    }

    this.simpleMDE.codemirror.on('change', () => {
      this.value = this.simpleMDE.value();
    });
  }

  destroySimpleMDE() {
    if (this.simpleMDE) {
      this.simpleMDE.toTextArea();
      this.simpleMDE = null;
    }
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  };

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }

    if (value) {
      this.initializeSimpleMDE();
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
