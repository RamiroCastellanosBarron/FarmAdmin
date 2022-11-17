import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  template: `

<ngx-spinner
  bdColor="rgba(0, 0, 0, 0.8)"
  size="medium"
  color="#fff"
  type="ball-clip-rotate"
  [fullScreen]="true"
  ><span style="color: white"></span></ngx-spinner
>
<router-outlet></router-outlet>


  `,
  styles: [`



  `]
})
export class AppComponent {
  constructor(private accountService: AccountService, private router: Router) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
