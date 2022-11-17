import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-account',
  template: `

  <main class="flex-shrink-0">
  <app-nav></app-nav>

  <div class="container" style="margin-top: 100px">
    <router-outlet></router-outlet>
  </div>

</main>

<footer class="footer mt-auto py-3 bg-light">
  <div class="row w-100">
      <span class="text-muted fw-light text-center">FarmAdmin, S.A. de C.V.</span>
  </div>
</footer>


  `,
  styles: [`



  `]
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.setCurrentUser();

    $(document).ready(function () {
      var html = $('html')
      html.addClass('h-100')
      $('app-root').addClass('h-100')
      $('body').addClass('h-100')
      var body = $('app-account')
      body.addClass('d-flex flex-column h-100')
    })
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
