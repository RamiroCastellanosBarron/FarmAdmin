import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s-customer-detail',
  template: `
  <div *ngIf="pharmacy">
  <h4 class="">{{ pharmacy.firstName }} {{ pharmacy.lastName }}</h4>
    <span class="fs-5 fw-demibold text-secondary fst-italic">{{ pharmacy.address.street }} {{ pharmacy.address.number }}, {{ pharmacy.address.zipCode }}. {{ pharmacy.address.city }}, {{ pharmacy.address.country }}</span>

    <div class="mb-4">
    <span class="fst-italic fs-6 fw-semibold text-info"><i class="fa fa-phone me-1"></i>{{ pharmacy.phoneNumber }}</span>
    </div>

    <div class="card shadow mb-3">
    <h3 class="card-header text-secondary fst-italic">
      <i class="fa fa-archive me-2 ms-3"></i>
      Inventario</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-demibold">
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Disponibilidad</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let product of pharmacy.pharmacyProducts"
          >
          <td class="ps-4">
            {{ product.product.name }}
          </td>
            <td>{{ product.product.description }}</td>
            <td class="text-center">
              <span class="text-secondary fw-bold">{{ product.quantity }}</span>
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
export class SCustomerDetailComponent implements OnInit {
  pharmacy: any;

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPharmacy();
  }

  back() {
    this.router.navigateByUrl('account/supplier/customers');
  }

  getPharmacy() {
    this.supplierService.getCustomer(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('pharmacy response', response);
      this.pharmacy = response;
    }, error => {
      console.log('pharmacy error', error);
    })
  }

}
