import { PharmaciesService } from '../pharmacies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-sales-list',
  template: `
    <div class="card shadow mb-5">
    <h3 class="card-header fst-italic text-secondary">
      <i class="fa fa-tag me-2 ms-3"></i>
      Ventas</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-semibold">
            <th scope="col">Fecha</th>
            <th scope="col">Comprador</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
          </tr>
        </thead>

        <tbody>
          <ng-container *ngIf="sales">
          <tr
            *ngFor="let sale of sales"
            routerLink="/account/pharmacy/sale/{{ sale.id }}"
            style="cursor: pointer"
          >
            <td class="ps-4"> {{ sale.saleDate | date }}</td>
            <td>
              {{ sale.buyer.firstName }} {{ sale.buyer.lastName }}
            </td>
            <td>{{ sale.product.name }}</td>
            <td class="text-center">
              {{ sale.quantity }}
            </td>
            <td class="text-center">{{(sale.quantity * sale.product.price) | currency}} MXN</td>
          </tr>
          </ng-container>

        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class PSalesListComponent implements OnInit {
  sales: any;

  constructor(private pharmaciesService: PharmaciesService) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.pharmaciesService.getSales().subscribe(response => {
      console.log('sales response', response);
      this.sales = response;
    }, error => {
      console.log('sales error', error);
    })
  }


}
