import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-register',
  template: `
 <div class="body">
  <div class="center">
    <form
      [formGroup]="registerForm"
      (ngSubmit)="registerForm.valid && register()"
      autocomplete="off"
    >
      <div class="row">
        <app-text-input
          [formControl]="registerForm.controls['email']"
          [label]="'Email'"
        ></app-text-input>
      </div>

      <div class="row">
        <div class="col-6">
          <app-text-input
            [formControl]="registerForm.controls['firstName']"
            [label]="'Nombre'"
          ></app-text-input>
        </div>
        <div class="col-6">
          <app-text-input
            [formControl]="registerForm.controls['lastName']"
            [label]="'Apellido'"
          ></app-text-input>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              value="Masculino"
              formControlName="gender"
              id="male"
            />
            <label for="male" class="form-check-label">Hombre</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              value="Femenino"
              formControlName="gender"
              id="female"
            />
            <label for="female" class="form-check-label">Mujer</label>
          </div>
        </div>

        <div class="col-6">
          <app-date-input
            [formControl]="registerForm.controls['dateOfBirth']"
            [label]="'Fecha de nacimiento'"
            [maxDate]="maxDate"
            id="fechaNacimiento"
          ></app-date-input>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <app-text-input
            [formControl]="registerForm.controls['city']"
            [label]="'Municipio'"
          ></app-text-input>
        </div>
        <div class="col-6">
          <app-text-input
            [formControl]="registerForm.controls['country']"
            [label]="'País'"
          ></app-text-input>
        </div>
      </div>
      <app-text-input
        [formControl]="registerForm.controls['password']"
        [label]="'Contraseña'"
        [type]="'password'"
      >
      </app-text-input>
      <app-text-input
        [formControl]="registerForm.controls['confirmPassword']"
        [label]="'Confirmar contraseña'"
        [type]="'password'"
      ></app-text-input>

      <div class="row">
        <div class="form-check ps-5">
          <input
            type="checkbox"
            class="form-check-input"
            id="terminosCondiciones"
          />
          <label class="form-check-label" for="terminosCondiciones"
            >Aceptar términos y condiciones</label
          >
        </div>
        <div class="form-check ps-5">
          <input
            type="checkbox"
            class="form-check-input"
            id="suscripcionCheck"
            checked
          />
          <label class="form-check-label" for="suscripcionCheck"
            >Suscripción de noticias por correo</label
          >
        </div>
      </div>

      <hr class="mt-4" />

      <div class="col mb-3">
        <a routerLink="/login"
          >Ya tengo una cuenta
          <i class="fa fa-angle-right"></i>
        </a>
      </div>

      <div class="row" *ngIf="validationErrors.length > 0">
        <ul class="text-danger">
          <li *ngFor="let error of validationErrors">
            {{ error }}
          </li>
        </ul>
      </div>

      <div class="form-group text-center">
        <button
          [disabled]="!registerForm.valid"
          class="btn btn-success mr-2"
          type="submit"
        >
          Crear cuenta
        </button>
        <button
          class="btn btn-secondary shadow-sm ms-2"
          routerLink="/"
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</div>

  `,
  styles: [`

  .body {
  margin:0;
  padding:0;
  height:100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  background-color: #f5f5f5;
}

.center {
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  width: 550px;

}

  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['Masculino'],
      dateOfBirth: ['', Validators.required],
      city: [''],
      country: [''],
      password: ['Pa$$w0rd', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['Pa$$w0rd', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }

  register() {
    console.log(this.registerForm.controls);

    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/account');
      this.toastr.success('Cuenta creada con éxito')
    }, error => {
      this.validationErrors = error;
      console.log(error);
      this.toastr.error(error.status, error.error);
    })
  }

}
