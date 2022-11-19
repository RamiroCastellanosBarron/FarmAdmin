import { PharmaciesService } from './../pharmacies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from './../../supplier/supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-supplier-detail',
  template: `
  <div *ngIf="supplier">
  <h4 class="">{{ supplier.firstName }} {{ supplier.lastName }}</h4>
    <span class="fs-5 fw-demibold text-secondary fst-italic">{{ supplier.address.street }} {{ supplier.address.number }}, {{ supplier.address.zipCode }}. {{ supplier.address.city }}, {{ supplier.address.country }}</span>

    <div class="mb-4">
    <span class="fst-italic fs-6 fw-semibold text-info"><i class="fa fa-phone me-1"></i>{{ supplier.phoneNumber }}</span>
    </div>

    <div class="card shadow mb-5">
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
            *ngFor="let product of supplier.products"
            routerLink="/account/pharmacy/item/product/{{ product.id }}"
            style="cursor: pointer"
          >
          <td class="ps-4">
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
  <button class="btn btn-outline-secondary me-2 shadow fw-semibold" (click)="back()">
      <i class="fa fa-angle-left me-2"></i>
      Atrás
    </button>
  </div>
  `,
  styles: [
  ]
})
export class PSupplierDetailComponent implements OnInit {
  supplier: any;

  constructor(private pharmaciesService: PharmaciesService, private router: Router, private route: ActivatedRoute) { }

  back() {
    this.router.navigateByUrl('account/pharmacy/suppliers');
  }

  getSupplier() {
    this.pharmaciesService.getSupplier(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('supplier response', response);
      this.supplier = response;
    }, error => {
      console.log('supplier error', error);
    })
  }

  ngOnInit(): void {
    this.getSupplier();
  }

}
