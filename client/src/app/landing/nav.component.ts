import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
<nav class="navbar navbar-bg-light d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
  <div class="container">
    <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
    </a>

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">Features</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">Pricing</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">FAQs</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
    </ul>

    <div class="col-md-3 text-end">
      <button type="button" class="btn btn-outline-primary me-2" routerLink="/login">Login</button>
      <button type="button" class="btn btn-primary" routerLink="/register">Sign-up</button>
    </div>
  </div>
</nav>

  `,
  styles: [`

  .dropdown-toggle, .dropdown-item {
  cursor: pointer;
}

img {
  max-height: 40px;
  border: 2px solid #fff;
  display: inline;
}

a:hover {
  cursor:pointer;
}

.link-crear-cuenta {
  display: none;
}

.linea {
  display:none;
}

@media (max-width: 768px) {
  .link-registro {
    display: none;
  }
  .link-crear-cuenta {
    display: block;
  }
  .linea {
    display:block;
  }
}


  `]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
