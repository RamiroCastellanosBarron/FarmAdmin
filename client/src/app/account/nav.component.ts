import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-expand-sm navbar-light bg-light fixed-top shadow">
  <div class="container">
    <a
      class="text-secondary me-3 fs-4 text-decoration-none fst-italic fw-semibold"
      routerLink="/account"
      >FarmAdmin</a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarToggle">
      <ul class="navbar-nav me-auto">
        <ng-container *ngIf="accountService.currentUser$ | async">
          <!-- Pharmacy -->
          <li class="nav-item" *appHasRole="['Pharmacy']">
            <a
              class="nav-link"
              routerLink="/account/pharmacy/customers"
              routerLinkActive="active"
              >Clientes
              <i class="fa fa-address-book"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Pharmacy']">
            <a
              class="nav-link"
              routerLink="/account/pharmacy/suppliers"
              routerLinkActive="active"
              >Proveedores
              <i class="fa fa-address-book-o"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Pharmacy']">
            <a
              class="nav-link"
              routerLink="/account/pharmacy/inventory"
              routerLinkActive="active"
              >Inventario
              <i class="fa fa-archive"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Pharmacy']">
            <a
              class="nav-link"
              routerLink="/account/pharmacy/items"
              routerLinkActive="active"
              >Productos
              <i class="fa fa-thermometer"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Pharmacy']">
            <a
              class="nav-link"
              routerLink="/account/pharmacy/sales"
              routerLinkActive="active"
              >Ventas
              <i class="fa fa-tag"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Pharmacy']">
            <a
              class="nav-link"
              routerLink="/account/pharmacy/purchases"
              routerLinkActive="active"
              >Compras
              <i class="fa fa-shopping-bag"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Pharmacy']">
            <a
              class="nav-link"
              routerLink="/account/pharmacy/shopping-cart"
              routerLinkActive="active"
              >Carrito de Compras
              <i class="fa fa-shopping-cart"></i>
            </a>
          </li>
          <!-- Supplier -->
          <li class="nav-item" *appHasRole="['Supplier']">
            <a
              class="nav-link"
              routerLink="/account/supplier/customers"
              routerLinkActive="active"
              >Farmacias
              <i class="fa fa-address-book"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Supplier']">
            <a
              class="nav-link"
              routerLink="/account/supplier/inventory"
              routerLinkActive="active"
              >Inventario
              <i class="fa fa-archive"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Supplier']">
            <a
              class="nav-link"
              routerLink="/account/supplier/sales"
              routerLinkActive="active"
              >Ventas
              <i class="fa fa-tag"></i>
            </a>
          </li>
          <!-- Customer -->
          <li class="nav-item" *appHasRole="['Customer']">
            <a
              class="nav-link"
              routerLink="/account/customer/pharmacies"
              routerLinkActive="active"
              >Farmacias
              <i class="fa fa-hospital-o"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Customer']">
            <a
              class="nav-link"
              routerLink="/account/customer/products"
              routerLinkActive="active"
              >Medicamentos
              <i class="fa fa-thermometer-empty"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Customer']">
            <a
              class="nav-link"
              routerLink="/account/customer/purchases"
              routerLinkActive="active"
              >Mis Compras
              <i class="fa fa-history"></i>
            </a>
          </li>
          <li class="nav-item" *appHasRole="['Customer']">
            <a
              class="nav-link"
              routerLink="/account/customer/shopping-cart"
              routerLinkActive="active"
              >Carrito de Compras
              <i class="fa fa-shopping-cart"></i>
            </a>
          </li>
          <div
            class="opciones-movil"
            *ngIf="accountService.currentUser$ | async as user"
          >
            <hr class="my-4" />
            <div class="row">
              <div class="col-2">
                <img
                  src="{{ user.photoUrl || './assets/user.png' }}"
                  alt="{{ user.username }}"
                />
              </div>
              <div class="col-10">
                <h6 class="dropdown-header fs-3 text-dark">
                  {{ user.username | titlecase }}
                </h6>
                <h6 class="dropdown-header fst-italic text-dark">
                  {{ user.roles }}
                </h6>
              </div>
            </div>
            <hr class="my-4" />
            <li class="nav-item">
              <a class="nav-link" routerLink="/account/edit"
                >Editar perfil
                <i class="fa fa-user ms-2"></i>
              </a>
            </li>
            <li class="nav-item">
              <a
                routerLink="/account/management"
                *appHasRole="['Admin']"
                class="dropdown-item"
                >Mi organización</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="logout()"
                >Cerrar sesión
                <i class="fa fa-sign-out ms-2"></i>
              </a>
            </li>
          </div>
        </ng-container>
      </ul>

      <div
        class="dropdown"
        *ngIf="accountService.currentUser$ | async as user"
        dropdown
      >
        <img
          src="{{ user.photoUrl || './assets/user.png' }}"
          alt="{{ user.username }}"
        />
        <a
          class="dropdown-toggle text-dark ms-2 text-decoration-none"
          dropdownToggle
          >{{ user.username | titlecase }}</a
        >
        <div class="dropdown-menu mt-3" *dropdownMenu>
          <li>
            <h6 class="dropdown-header">{{ user.roles }}</h6>
          </li>
          <div class="dropdown-divider"></div>
          <a routerLink="/account/edit" class="dropdown-item">Editar perfil</a>
          <a
            routerLink="/account/management"
            *appHasRole="['Admin']"
            class="dropdown-item"
            >Mi organización</a
          >
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" (click)="logout()">Cerrar sesión</a>
        </div>
      </div>
    </div>
  </div>
</nav>

  `,
  styles: [`

.navbar-nav .nav-link.active, .navbar-nav .show>.nav-link {
  color: #0dcaf0 !important;
}

.dropdown-toggle, .dropdown-item {
  cursor: pointer;
}

img {
  max-height: 50px;
  display: inline;
}

.opciones-movil {
  display: none;
}

hr {
  background-color: rgba(255,255,255,0.7);
}

@media (max-width: 576px) {
  li > a {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  .opciones-movil {
    display: block;
  }

  .dropdown {
    display: none;
  }
}


  `]
})
export class NavComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login')
  }

}
