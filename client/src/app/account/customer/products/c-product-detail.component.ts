import { CPharmacyDetailComponent } from './../pharmacies/c-pharmacy-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-c-product-detail',
  template: `
  <div *ngIf="product">
    <h4 class="fst-italic">{{ product.name }}</h4>
    <p class="text-primary fst-semibold fs-3">{{ product.description }}</p>
    <div class="mb-3">
    <span>Producto de: </span><span class="fst-semibold fst-italic text-info fs-4">{{product.user.firstName}}{{ product.user.lastName }}</span>
    <br>
    <span class="text-secondary fst-italic">{{ product.user.address.street }} {{ product.user.address.number }}, {{ product.user.address.zipCode }}. {{ product.user.address.city }}, {{ product.user.address.country }}</span>
    <span class="fst-demibold text-secondary fs-3 fst-italic mx-3">|</span>
    <i class="fa fa-phone me-2"></i><span class="text-secondary fst-demibold">{{ product.user.phoneNumber}}</span>
    </div>

    <div class="card shadow-sm my-3">
      <div class="card-body">
        <h5 class="fst-italic fst-semibold">Disponibilidad</h5>
        <span class="fs-4">{{ product.quantity }} </span><span class="fst-italic text-secondary fst-light"> ejemplares en tienda.</span>
      </div>
    </div>

    <div class="my-3">
      <button class="btn btn-outline-secondary shadow-sm me-2" (click)="back()">
        <i class="fa fa-angle-left me-2"></i>
        Atrás</button>
    <button class="btn btn-success shadow" (click)="add(product)">
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
  product: any;
  producto: Product;

  constructor(private customersService: CustomersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.customersService.currentProduct.subscribe(product => this.producto = product);
    this.getProduct();
  }

  add(product: Product) {
    console.log('add product', product);
    this.customersService.changeProduct(product);
  }

  back() {
    this.router.navigateByUrl('account/customer/products');
  }

  getProduct() {
    this.customersService.getProduct(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('product response', response);
      this.product = response;
    }, error => {
      console.log('product error', error);
    })
  }

}
