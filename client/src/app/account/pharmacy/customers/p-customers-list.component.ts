import { Component, OnInit } from '@angular/core';
import { PharmaciesService } from '../pharmacies.service';

@Component({
  selector: 'app-p-customers-list',
  template: `
   <div class="card shadow mb-5">
    <h3 class="card-header text-center">Clientes</h3>
    <div class="card-body p-0">
      <table class="table table-striped table-hover mb-0 desktop">
        <thead>
          <tr class="text-center">
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Dirección</th>
          </tr>
        </thead>

        <tbody>
          <tr
            *ngFor="let customer of customers"
            class="text-center"
            routerLink="/account/pharmacy/customer/{{ customer.id }}"
            style="cursor: pointer"
          >
            <td class="text-center">
              {{ customer.firstName }} {{customer.lastName }}
            </td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phoneNumber }}</td>
            <td>{{ customer.address.street }} {{ customer.address.number }}, {{customer.address.city }}</td>
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
