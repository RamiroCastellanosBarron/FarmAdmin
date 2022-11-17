import { PharmaciesService } from '../pharmacies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-suppliers-list',
  template: `
    <div class="card shadow mb-5">
    <h3 class="card-header text-center">Proveedores</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center">
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let supplier of suppliers"
            class="text-center"
            routerLink="/account/pharmacy/supplier/{{ supplier.id }}"
            style="cursor: pointer"
          >
            <td class="text-center">
              {{ supplier.firstName | titlecase }}{{ supplier.lastName }}
            </td>
            <td>{{ supplier.address.street }} {{ supplier.address.number }}, {{supplier.address.city }}</td>
            <td>{{ supplier.phoneNumber }}</td>
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
