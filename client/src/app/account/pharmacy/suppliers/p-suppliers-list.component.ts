import { PharmaciesService } from '../pharmacies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-suppliers-list',
  template: `
    <div class="card shadow mb-5">
    <h3 class="card-header text-secondary fst-italic">
      <i class="fa fa-address-book-o me-2 ms-3"></i>
      Proveedores</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-semibold">
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let supplier of suppliers"
            routerLink="/account/pharmacy/suppliers/{{ supplier.id }}"
            style="cursor: pointer"
          >
            <td class="ps-4">
              {{ supplier.firstName | titlecase }}{{ supplier.lastName }}
            </td>
            <td>{{ supplier.address.street }} {{ supplier.address.number }}, {{supplier.address.city }}</td>
            <td class="text-center">{{ supplier.phoneNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class PSuppliersListComponent implements OnInit {
  suppliers: any;

  constructor(private pharmaciesService: PharmaciesService) { }

  ngOnInit(): void {
    this.getSuppliersForPharmacy();
  }

  getSuppliersForPharmacy() {
    this.pharmaciesService.getSuppliers().subscribe(response => {
      console.log('response suppliers', response);
      this.suppliers = response;
    }, error => {
      console.log('error suppliers', error);
    })
  }

}
