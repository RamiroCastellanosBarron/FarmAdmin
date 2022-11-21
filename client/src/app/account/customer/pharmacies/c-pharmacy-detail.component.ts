import { PProductsListComponent } from './../../pharmacy/products/p-products-list.component';
import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-c-pharmacy-detail',
  template: `
  <div *ngIf="pharmacyProducts">
    <h4 class="">{{ pharmacyProducts[0].pharmacy.firstName }} {{ pharmacyProducts[0].pharmacy.lastName }}</h4>
    <span class="fs-5 fw-demibold text-secondary fst-italic">{{ pharmacyProducts[0].pharmacy.address.street }} {{ pharmacyProducts[0].pharmacy.address.number }}, {{ pharmacyProducts[0].pharmacy.address.zipCode }}. {{ pharmacyProducts[0].pharmacy.address.city }}, {{ pharmacyProducts[0].pharmacy.address.country }}</span>

    <div class="mb-4">
    <span class="fst-italic fs-6 fw-semibold text-info"><i class="fa fa-phone me-1"></i>{{ pharmacyProducts[0].pharmacy.phoneNumber }}</span>
    </div>
    <div class="card shadow mb-3">
    <h3 class="card-header text-secondary fst-italic">
      <i class="fa fa-thermometer me-2 ms-3"></i>
      Productos</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-demibold">
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let product of pharmacyProducts"
            routerLink="/account/customer/products/{{ product.id }}"
            style="cursor: pointer"
          >
          <td class="ps-4">
            {{ product.product.name }}
          </td>
            <td>{{ product.product.description }}</td>
            <td class="text-center">
              <span class="text-success fw-bold">{{ product.product.price | currency }}</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
  <div class="mb-5">
      <button class="btn btn-outline-secondary shadow-sm me-2" (click)="back()">
        <i class="fa fa-angle-left me-2"></i>
        Atrás</button>
    </div>
  `,
  styles: [
  ]
})
export class CPharmacyDetailComponent implements OnInit {
  pharmacyProducts: any;

  constructor(private customersService: CustomersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPharmacy();
  }

  back() {
    this.router.navigateByUrl('account/customer/pharmacies');
  }

  getPharmacy() {
    this.customersService.getPharmacy(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('pharmacyProducts response', response);
      this.pharmacyProducts = response;
    }, error => {
      console.log('pharmacyProducts error', error);
    })
  }

}
