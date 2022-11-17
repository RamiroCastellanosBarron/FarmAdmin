import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  template: `
   <div class="mb-3">
  <label for="{{label}}" class="form-label">{{label}}</label>
  <input
      type="text"
      [class.is-invalid]='ngControl.touched && ngControl.invalid'
      class='form-control'
      [formControl]='ngControl.control'
      placeholder="{{label}}"
      bsDatepicker
      id="{{label}}"
      [bsConfig]='bsConfig'
      [maxDate]='maxDate'
  >
  <div *ngIf="ngControl.control.errors?.required" class="invalid-feedback">{{label}} es obligatorio</div>
</div>

  `,
  styles: [
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD MMMM YYYY'
    }
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }
}
