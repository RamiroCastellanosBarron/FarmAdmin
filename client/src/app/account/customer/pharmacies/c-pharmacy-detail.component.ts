import { PProductsListComponent } from './../../pharmacy/products/p-products-list.component';
import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-c-pharmacy-detail',
  template: `
  <div *ngIf="pharmacy">
    <h4>{{ pharmacy.firstName }} {{ pharmacy.lastName }}</h4>
    <p>{{ pharmacy.address.street }} {{ pharmacy.address.number }}, {{ pharmacy.address.zipCode }}. {{ pharmacy.address.city }}, {{ pharmacy.address.country }}</p>

    <div class="my-2">
    <span class="fst-italic fs-5 fw-semibold text-info"><i class="fa fa-phone me-2"></i>{{ pharmacy.phoneNumber }}</span>
    </div>

    <div class="card shadow mb-5">
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
            *ngFor="let product of pharmacy.products"
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
  <div><button class="btn btn-outline-secondary shadow-sm me-2" (click)="back()">
    <i class="fa fa-angle-left me-2"></i>
    Atrás</button></div>
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
