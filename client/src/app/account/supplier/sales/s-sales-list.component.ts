import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s-sales-list',
  template: `
  <div class="card shadow mb-5">
    <h3 class="card-header text-muted fst-italic">
      <i class="fa fa-tag ms-3 me-2"></i>
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
            routerLink="/account/supplier/sales/{{ sale.id }}"
            style="cursor: pointer"
          >
            <td class="text-center"> {{ sale.saleDate | date }}</td>
            <td>
              {{ sale.buyer.firstName }} {{ sale.buyer.lastName }}
            </td>
            <td>{{ sale.product.name }}</td>
            <td class="text-center">
              {{ sale.quantity | number }}
            </td>
            <td class="text-center">{{(sale.quantity * sale.product.price) | currency}}</td>
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
export class SSalesListComponent implements OnInit {
  sales: any;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getSalesforSupplier();
  }

  getSalesforSupplier() {
    this.supplierService.getSales().subscribe(response => {
      console.log('response sales', response);
      this.sales = response;
    }, error => {
      console.log('error sales', error);
    })
  }

}
