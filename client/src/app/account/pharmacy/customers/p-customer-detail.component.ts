import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PharmaciesService } from '../pharmacies.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-p-customer-detail',
  template: `
    <div *ngIf="purchases">


      <h4>{{ purchases[0].buyer.firstName }} {{ purchases[0].buyer.lastName }}</h4>
      <span>No. de Usuario: </span><span class="fs-4 fw-semibold fst-italic text-info ms-2">{{ purchases[0].buyer.id }}</span><br>
      <span class="fs-5 fw-semibold text-primary">{{ purchases[0].buyer.email }}</span><br>
      <span class="text-mute fw-semibold">
        <i class="fa fa-phone me-2"></i>
        {{ purchases[0].buyer.phoneNumber }}</span><br>
        <div class="mb-4">
        <span class="fst-italic fw-demibold text-secondary fs-6">{{ purchases[0].buyer.address.street }} {{ purchases[0].buyer.address.number }}, {{ purchases[0].buyer.address.zipCode }}. {{ purchases[0].buyer.address.city }}, {{ purchases[0].buyer.address.country }}
        <i class="fa fa-map-pin ms-2"></i>
        </span>
        </div>

        <div class="card shadow mb-3">
    <h3 class="card-header text-secondary fst-italic">
      <i class="fa fa-history me-2 ms-3"></i>
      Compras</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-demibold">
            <th scope="col">Fecha</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
          </tr>
        </thead>

        <tbody>
          <ng-container *ngIf="purchases">
          <tr
            *ngFor="let purchase of purchases"
            routerLink="/account/customer/purchases/{{ purchase.id }}"
            style="cursor: pointer"
          >
            <td class="ps-4"> {{ purchase.saleDate | date }}</td>
            <td>{{ purchase.product.name }}</td>
            <td class="text-center">
              {{ purchase.quantity | number }}
            </td>
            <td class="text-center">{{(purchase.quantity * purchase.product.price) | currency}}</td>
          </tr>
          </ng-container>

        </tbody>
      </table>
    </div>
  </div>
  <button class="btn btn-outline-secondary shadow-sm" (click)="back()"><i class="fa fa-angle-left me-2"></i>Atrás</button>
    </div>
  `,
  styles: [
  ]
})
export class PCustomerDetailComponent implements OnInit {
  purchases: any;

  constructor(private pharmaciesService: PharmaciesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  back() {
    this.router.navigateByUrl('account/pharmacy/customers');
  }

  getCustomer() {
    this.pharmaciesService.getCustomer(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('customer response', response);
      this.purchases = response;
    }, error => {
      console.log('customer error', error);
    })
  }

}
