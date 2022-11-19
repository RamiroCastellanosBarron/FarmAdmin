import { PProductsListComponent } from './../../pharmacy/products/p-products-list.component';
import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-c-pharmacy-detail',
  template: `
  <div *ngIf="pharmacy">
    <h4 class="">{{ pharmacy.firstName }} {{ pharmacy.lastName }}</h4>
    <span class="fs-5 fw-demibold text-secondary fst-italic">{{ pharmacy.address.street }} {{ pharmacy.address.number }}, {{ pharmacy.address.zipCode }}. {{ pharmacy.address.city }}, {{ pharmacy.address.country }}</span>

    <div class="mb-4">
    <span class="fst-italic fs-6 fw-semibold text-info"><i class="fa fa-phone me-1"></i>{{ pharmacy.phoneNumber }}</span>
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
            *ngFor="let product of pharmacy.products"
            routerLink="/account/customer/products/{{ product.id }}"
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
  `,
  styles: [
  ]
})
export class CPharmacyDetailComponent implements OnInit {
  pharmacy: any;

  constructor(private customersService: CustomersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPharmacy();
  }

  back() {
    this.router.navigateByUrl('account/customer/pharmacies');
  }

  getPharmacy() {
    this.customersService.getPharmacy(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('pharmacy response', response);
      this.pharmacy = response;
    }, error => {
      console.log('pharmacy error', error);
    })
  }

}
