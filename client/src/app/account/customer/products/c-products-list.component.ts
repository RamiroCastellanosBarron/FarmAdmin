import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-products-list',
  template: `
  <div class="card shadow mb-5">
    <h3 class="card-header text-secondary fst-italic">
      <i class="fa fa-thermometer me-2 ms-3"></i>
      Medicamentos</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-demibold">
            <th scope="col">Tienda</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let product of products"
            routerLink="/account/customer/products/{{ product.id }}"
            style="cursor: pointer"
          >
          <td class="ps-4">{{product.user.firstName}}</td>
          <td>
            {{ product.name }}
          </td>
            <td>{{ product.description }}</td>
            <td class="text-center">
              <span class="text-success fw-bold">{{ product.price | currency }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class CProductsListComponent implements OnInit {
  products: any;

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.customersService.getProducts().subscribe(response => {
      console.log('products response', response);
      this.products = response;
    }, error => {
      console.log('products error', error);
    })
  }

}
