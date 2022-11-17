import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-login',
  template: `
  <div
  class="body"
>
  <div class="center">
    <form (ngSubmit)="login()">
      <app-text-input
        [formControl]="registerForm.controls['username']"
        [label]="'Usuario'"
        [type]="'text'"
      >
      </app-text-input>
      <app-text-input
        [formControl]="registerForm.controls['password']"
        [label]="'Contraseña'"
        [type]="'password'"
      ></app-text-input>

      <div class="row my-3">
        <div class="form-check ps-5">
          <input
            type="checkbox"
            class="form-check-input"
            id="recordarInfo"
            checked
          />
          <label class="form-check-label" for="recordarInfo"
            >Recordar mi información</label
          >
        </div>
        <div class="form-check ps-5">
          <input
            type="checkbox"
            class="form-check-input"
            id="showPassword"
          />
          <label class="form-check-label"  for="showPassword"
            >Mostrar contraseña</label
          >
        </div>
      </div>

      <button type="submit" class="btn btn-primary shadow-sm w-100">
        Iniciar sesión
      </button>
      <button routerLink="/" class="btn btn-light shadow-sm w-100 mt-3">
        Cancelar
      </button>
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
  width: 350px;

}

.logo {
  width:300px;
}


  `]
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) {

  }

  login() {
    this.accountService.login(this.registerForm.value).subscribe((response: any) => {
      console.log('login response', response);
      this.router.navigateByUrl('/account');
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
    this.intitializeForm();

    $(document).ready(function () {

      var check = $('#showPassword');
      var tipo = $('input:password')
      check.on('click', function () {
        if (check.prop("checked")) {
          tipo.prop('type', 'text')
        } else {
          tipo.prop('type', 'password')
        }

      })

    })

  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['Pa$$w0rd', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
    })
  }

}
