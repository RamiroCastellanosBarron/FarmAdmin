import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { HighlightSpanKind } from 'typescript/lib/tsserverlibrary';

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
  role: string;
  url: string;

  constructor(private accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.setCurrentUser();
    console.log('role', this.role);

    if(this.role === 'supplier' || this.role === 'pharmacy') {
      this.url = 'account/' + this.role + '/sales';
    } else if(this.role === 'customer') {
      this.url = 'account/' + this.role + '/purchases';
    }

    this.router.navigateByUrl(this.url);

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

    this.role = user.roles[0].toLowerCase();
  }
}
