import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  template: `
    <div class="mb-3">
  <label for="{{ label }}" class="form-label">{{ label }}</label>
  <input
    [class.is-invalid]="ngControl.touched && ngControl.invalid"
    autocomplete="off"
    type="{{ type }}"
    id="{{ label }}"
    class="form-control"
    [formControl]="ngControl.control"
    placeholder="{{ label }}"
  />
  <div *ngIf="ngControl.control.errors?.required" class="invalid-feedback">
    Por favor ingrese su {{ label | lowercase }}
  </div>
  <div *ngIf="ngControl.control.errors?.minlength" class="invalid-feedback">
    {{ label }} must be at least
    {{ ngControl.control.errors.minlength["requiredLength"] }}
  </div>
  <div *ngIf="ngControl.control.errors?.maxlength" class="invalid-feedback">
    {{ label }} must be at most
    {{ ngControl.control.errors.maxlength["requiredLength"] }}
  </div>
  <div *ngIf="ngControl.control.errors?.isMatching" class="invalid-feedback">
    Passwords do not match
  </div>
</div>

  `,
  styles: [
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

}
