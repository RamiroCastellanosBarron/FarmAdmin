import { CPharmacyDetailComponent } from './../pharmacies/c-pharmacy-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { PharmacyProduct } from '../../_models/PharmacyProduct';

@Component({
  selector: 'app-c-product-detail',
  template: `
  <div *ngIf="pharmacyProduct">
    <h4 class="fst-italic">{{ pharmacyProduct.product.name }}</h4>
    <p class="text-primary fst-semibold fs-3">{{ pharmacyProduct.product.description }}</p>
    <div class="mb-3">
    <span>Producto de: </span><span class="fst-semibold fst-italic text-info fs-4">{{pharmacyProduct.pharmacy.firstName}}{{ pharmacyProduct.pharmacy.lastName }}</span>
    <br>
    <span class="text-secondary fst-italic">{{ pharmacyProduct.pharmacy.address.street }} {{ pharmacyProduct.pharmacy.address.number }}, {{ pharmacyProduct.pharmacy.address.zipCode }}. {{ pharmacyProduct.pharmacy.address.city }}, {{ pharmacyProduct.pharmacy.address.country }}</span>
    <span class="fst-demibold text-secondary fs-3 fst-italic mx-3">|</span>
    <i class="fa fa-phone me-2"></i><span class="text-secondary fst-demibold">{{ pharmacyProduct.pharmacy.phoneNumber}}</span>
    </div>

    <div class="card shadow-sm my-3">
      <div class="card-body">
        <h5 class="fst-italic fst-semibold">Disponibilidad</h5>
        <span class="fs-4">{{ pharmacyProduct.quantity }} </span><span class="fst-italic text-secondary fst-light"> ejemplares en tienda.</span>
      </div>
    </div>

    <div class="my-3">
      <button class="btn btn-outline-secondary shadow-sm me-2" (click)="back()">
        <i class="fa fa-angle-left me-2"></i>
        Atrás</button>
    <button class="btn btn-success shadow" (click)="add(pharmacyProduct)">
      <i class="fa fa-shopping-cart me-2"></i>
      Agregar al carrito
      <i class="fa fa-plus ms-2"></i>
    </button>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class CProductDetailComponent implements OnInit {
  pharmacyProduct: any;
  producto: PharmacyProduct;

  constructor(private customersService: CustomersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.customersService.currentProduct.subscribe(pharmacyProduct => this.producto = pharmacyProduct);
    this.getProduct();
  }

  add(pharmacyProduct: PharmacyProduct) {
    console.log('add pharmacyProduct', pharmacyProduct);
    this.customersService.changeProduct(pharmacyProduct);
  }

  back() {
    this.router.navigateByUrl('account/customer/products');
  }

  getProduct() {
    this.customersService.getProduct(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('pharmacyProduct response', response);
      this.pharmacyProduct = response;
    }, error => {
      console.log('pharmacyProduct error', error);
    })
  }

}
