import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../_models/item';

@Component({
  selector: 'app-s-products-list',
  template: `
  <div class="card shadow mb-5">
    <h3 class="card-header text-center">Productos</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center">
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let item of items"
            class="text-center"
            routerLink="/account/supplier/inventory/product/{{ item.id }}"
            style="cursor: pointer"
          >
            <td class="text-center">
              {{ item.name }}
            </td>
            <td>{{ item.description }}</td>
            <td>
              {{ item.price | currency }}
            </td>
            <td>{{item.quantity | number}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class SProductsListComponent implements OnInit {
  items: Item [] = [];

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.supplierService.getProducts().subscribe((response: Item[]) => {
      this.items = response;
      console.log('get products response', response);
    }, error => {
      console.log('error response', error);
    })
  }

}
