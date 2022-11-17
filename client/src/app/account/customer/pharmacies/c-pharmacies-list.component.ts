import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-pharmacies-list',
  template: `
  <div class="card shadow mb-5">
    <h3 class="card-header text-center">Farmacias</h3>
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
            *ngFor="let pharmacy of pharmacies"
            class="text-center"
            routerLink="/account/customer/pharmacy/{{ pharmacy.id }}"
            style="cursor: pointer"
          >
            <td class="text-center">
              {{ pharmacy.firstName | titlecase }}{{ pharmacy.lastName }}
            </td>
            <td>{{ pharmacy.address.street }} {{ pharmacy.address.number }}, {{pharmacy.address.city }}</td>
            <td>{{ pharmacy.phoneNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class CPharmaciesListComponent implements OnInit {
  pharmacies: any;

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.getPharmacies();
  }

  getPharmacies() {
    this.customersService.getPharmacies().subscribe(response => {
      console.log('pharmacies response', response);
      this.pharmacies = response;
    }, error => {
      console.log('pharmacies error', error);
    })
  }

}
