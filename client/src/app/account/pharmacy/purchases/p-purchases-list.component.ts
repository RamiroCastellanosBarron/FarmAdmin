import { PharmaciesService } from './../pharmacies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-purchases-list',
  template: `
  <div class="card shadow mb-5">
    <h3 class="card-header text-center">Compras</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center">
            <th scope="col">Fecha</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
          </tr>
        </thead>

        <tbody>
          <ng-container *ngIf="purchases">
          <tr
            *ngFor="let purchase of purchases"
            class="text-center"
            routerLink="/account/pharmacy/sale/{{ purchase.id }}"
            style="cursor: pointer"
          >
            <td> {{ purchase.saleDate | date }}</td>
            <td>
              {{ purchase.seller.firstName }} {{ purchase.seller.lastName }}
            </td>
            <td>{{ purchase.product.name }}</td>
            <td>
              {{ purchase.quantity | number }}
            </td>
            <td>{{(purchase.quantity * purchase.product.price) | currency}}</td>
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
export class PPurchasesListComponent implements OnInit {
  purchases: any;

  constructor(private pharmaciesService: PharmaciesService) { }

  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases() {
    this.pharmaciesService.getPurchases().subscribe(response => {
      console.log('purchases response', response);
      this.purchases = response;
    }, error => {
      console.log('purchase error', error);
    })
  }

}
