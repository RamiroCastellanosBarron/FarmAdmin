import { ToastrService } from 'ngx-toastr';
import { CustomersService } from './customers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PharmacyProduct } from '../_models/PharmacyProduct';

@Component({
  selector: 'app-shopping-cart',
  template: `
  <div>
    <div *ngIf="pharmacyProduct.id === 0">
      <h4>No hay productos</h4>
    </div>
    <div *ngIf="pharmacyProduct.id !== 0">

    <div class="">
      <span class="text-mute fs-4 me-2">Compra No.</span><span class="text-info fs-3 fst-italic fw-semibold">
        <!-- {{ purchase.id }} -->
        100
      </span>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary me-3">Fecha:</span><span class="fst-italic me-5">
        11/17/2022
        <!-- {{ purchase.saleDate | date: 'fullDate' }} -->
      </span>
      <span class="fs-5 fw-demibold text-secondary me-3">Hora:</span><span class="fst-italic">
        2:44 AM
        <!-- {{ purchase.saleDate | date: 'shortTime' }} -->
      </span>

    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Tienda: </span>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
      <span class="fs-4 fw-semibold text-secondary">{{ pharmacyProduct.pharmacy.firstName }}{{ pharmacyProduct.pharmacy.lastName }}</span><br>
      <span class="text-primary fw-light fst-italic">{{ pharmacyProduct.pharmacy.address.street }} {{ pharmacyProduct.pharmacy.address.number }}, {{ pharmacyProduct.pharmacy.address.zipCode }}. {{ pharmacyProduct.pharmacy.address.city }}, {{ pharmacyProduct.pharmacy.address.country }}</span>
      </div>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Comprador:</span>
    </div>
    <div class="card shadow-sm" *ngIf="user">
      <div class="card-body">
      <span class="fs-5 fw-demibold">{{ user.firstName }} {{ user.lastName }}</span><br>
      <span class="fs-6 fw-demibold">{{ user.email }}</span><br>
      <span class="fs-6 fw-demibold">{{ user.phoneNumber }}</span><br>
      </div>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Productos: </span>
    </div>
    <div class="row">
      <div class="my-2 d-flex align-items-center col-10">
        <div class="ms-5"><span class="fs-5 fw-demibold">{{ pharmacyProduct.product.name }}, {{ pharmacyProduct.product.description }}</span><br><span class="ms-2 fw-light">{{ pharmacyProduct.product.price | currency }}</span></div>
        <span class="fs-6 text-primary fw-semibold ms-5">({{ pharmacyProduct.quantity }} piezas)</span>
      </div>

      <div class="col-2 d-flex justify-content-end">
        <div>
          <button class="btn btn-outline-primary shadow-sm" (click)="rest()"><i class="fa fa-minus"></i></button>
          <button class="btn btn-outline-primary shadow-sm ms-3" (click)="add()"><i class="fa fa-plus"></i></button>
        </div>
      </div>

    </div>

    <hr>
    <div class="my-3">
      <span class="fs-5 fw-demibold text-secondary">Monto: </span><span class="fs-3 fw-light ms-2">{{pharmacyProduct.quantity * pharmacyProduct.product.price | currency }} </span><span class="text-success fw-bold fs-6 fst-italic">MXN</span>
    </div>
    <div class="mt-5">
      <button class="btn btn-outline-secondary shadow-sm me-2" (click)="back()">
        <i class="fa fa-angle-left me-2"></i>
        Atrás</button>
    <button class="btn btn-warning shadow-sm" (click)="pay()">
      <i class="fa fa-paypal me-2"></i>
      Pagar</button>
    </div>

    </div>
  </div>
  `,
  styles: [
  ]
})
export class ShoppingCartComponent implements OnInit {
  user: any;
  pharmacyProduct: PharmacyProduct;

  resetProduct: PharmacyProduct = {
    id: 0,
    idProduct: 0,
    product: undefined,
    idPharmacy: 0,
    pharmacy: undefined,
    quantity: 0
  };

  constructor(private customersService: CustomersService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
    this.customersService.currentProduct.subscribe(pharmacyProduct => this.pharmacyProduct = pharmacyProduct);
    this.pharmacyProduct.quantity = 1;
    console.log('pharmacyProduct load', this.pharmacyProduct);
  }

  pay() {
    this.customersService.payProduct(this.pharmacyProduct).subscribe(response => {
      console.log('pay response', response);
      this.router.navigateByUrl('account/customer/purchases');
      this.toastr.success('Producto pagado');
      this.customersService.changeProduct(this.resetProduct);
    }, error => {
      console.log('pay error', error);
      this.toastr.error('Error de pago');
    })
  }

  add() {
    this.pharmacyProduct.quantity++;
  }

  rest() {
    this.pharmacyProduct.quantity--;
  }

  getUser() {
    this.customersService.getUser().subscribe(response => {
      console.log('user response', response);
      this.user = response;
    }, error => {
      console.log('user error', error);
    })
  }

}
