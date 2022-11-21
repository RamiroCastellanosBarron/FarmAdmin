import { PharmaciesService } from '../pharmacies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-products-list',
  template: `
    <div class="card shadow mb-5">
    <h3 class="card-header text-secondary fst-italic">
      <i class="fa fa-archive me-2 ms-3"></i>
      Inventario</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-semibold">
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let product of products"
            routerLink="/account/pharmacy/inventory/product/{{ product.id }}"
            style="cursor: pointer"
          >
            <td class="ps-4">
              {{ product.product.name }}
            </td>
            <td>{{ product.product.description }}</td>
            <td class="text-center">
              {{ product.product.price | currency }}
            </td>
            <td class="text-center">{{product.quantity | number}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class PProductsListComponent implements OnInit {
  products: any;

  constructor(private pharmaciesService: PharmaciesService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.pharmaciesService.getProducts().subscribe(response => {
      console.log('response products', response);
      this.products = response;
    }, error => {
      console.log('error products', error);
    })
  }

}
