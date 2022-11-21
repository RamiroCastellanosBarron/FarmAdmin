import { Component, OnInit } from '@angular/core';
import { PharmaciesService } from '../pharmacies.service';

@Component({
  selector: 'app-p-customers-list',
  template: `
   <div class="card shadow mb-5">
    <h3 class="card-header text-secondary fst-italic">
      <i class="fa fa-address-book me-2 ms-3"></i>
      Clientes</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center text-secondary fst-italic fw-semibold">
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let customer of customers"
            routerLink="/account/pharmacy/customers/{{ customer.id }}"
            style="cursor: pointer"
          >
            <td class="ps-4">
              {{ customer.firstName }} {{customer.lastName }}
            </td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.address.street }} {{ customer.address.number }}, {{customer.address.city }}</td>
            <td class="text-center">{{ customer.phoneNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class PCustomersListComponent implements OnInit {
  customers: any;

  constructor(private pharmaciesService: PharmaciesService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.pharmaciesService.getCustomers().subscribe(response => {
      console.log('response customers', response);
      this.customers = response;
    }, error => {
      console.log('error customers', error);
    })
  }

}
