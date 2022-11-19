import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s-customers-list',
  template: `
  <div class="card shadow mb-5">
    <h3 class="card-header text-muted fst-italic">
      <i class="fa fa-address-book ms-3 me-2"></i>
      Farmacias</h3>
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
            *ngFor="let pharmacy of pharmacies"
            routerLink="/account/supplier/customers/{{ pharmacy.id }}"
            style="cursor: pointer"
          >
            <td class="ps-4">
              {{ pharmacy.firstName | titlecase }}{{ pharmacy.lastName }}
            </td>
            <td>{{ pharmacy.address.street }} {{ pharmacy.address.number }}, {{pharmacy.address.city }}</td>
            <td class="text-center">{{ pharmacy.phoneNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class SCustomersListComponent implements OnInit {
  pharmacies: any;

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.supplierService.getCustomers().subscribe(response => {
      this.pharmacies = response;
      console.log('farmacies for suppliers response', response);
    }, error => {
      console.log('farmacies for supp response', error);
    })
  }
}
