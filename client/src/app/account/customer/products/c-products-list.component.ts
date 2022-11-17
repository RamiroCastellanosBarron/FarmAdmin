import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-products-list',
  template: `
  <div class="card shadow mb-5">
    <h3 class="card-header text-center">Productos</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center">
            <th scope="col">Tienda</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let product of products"
            class="text-center"
            routerLink="/account/customer/product/{{ product.id }}"
            style="cursor: pointer"
          >
          <td>{{product.user.firstName}}</td>
          <td class="text-center">
            {{ product.name }}
          </td>
            <td>{{ product.description }}</td>
            <td>
              {{ product.price | currency }}
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
