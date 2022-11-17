import { PharmaciesService } from './../pharmacies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from './../../supplier/supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-supplier-detail',
  template: `
  <div *ngIf="supplier">
    <h4>{{ supplier.firstName }} {{ supplier.lastName }}</h4>
    <p>{{ supplier.address.street }} {{ supplier.address.number }}, {{ supplier.address.zipCode }}. {{ supplier.address.city }}, {{ supplier.address.country }}</p>

    <div class="my-2">
    <span class="fst-italic fs-5 fw-semibold text-info"><i class="fa fa-phone me-2"></i>{{ supplier.phoneNumber }}</span>
    </div>

    <div class="card shadow mb-3">
    <!-- <h3 class="card-header text-center">Productos</h3> -->
    <!-- <div class="card-body p-0"> -->
      <table class="table table-striped table-hover mb-0 desktop">
        <!-- <thead>
          <tr class="text-center">
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead> -->

        <tbody>
          <tr
            *ngFor="let product of supplier.products"
            class="text-center"
          >
            <td class="text-center">
              {{ product.name }}
            </td>
            <td>{{ product.description }}</td>
            <td>
              {{ product.price | currency }}
            </td>
            <td>
              <button class="btn btn-outline-success shadow-sm">
                <i class="fa fa-plus"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    <!-- </div> -->
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
