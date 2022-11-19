import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-s-sale-detail',
  template: `
 <div *ngIf="sale">
    <div class="">
      <span class="text-mute fs-4 me-2">Venta No.</span><span class="text-info fs-3 fst-italic fw-semibold">{{ sale.id }}</span>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary me-3">Fecha:</span><span class="fst-italic me-5">{{ sale.saleDate | date: 'fullDate' }}</span>
      <span class="fs-5 fw-demibold text-secondary me-3">Hora:</span><span class="fst-italic">{{ sale.saleDate | date: 'shortTime' }}</span>

    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Tienda: </span>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
      <span class="fs-4 fw-semibold text-secondary">{{ sale.seller.firstName }}{{ sale.seller.lastName }}</span><br>
      <span class="text-primary fw-light fst-italic">{{ sale.seller.address.street }} {{ sale.seller.address.number }}, {{ sale.seller.address.zipCode }}. {{ sale.seller.address.city }}, {{ sale.seller.address.country }}</span>
      </div>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Comprador:</span>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
      <span class="fs-5 fw-demibold">{{ sale.buyer.firstName }} {{ sale.buyer.lastName }}</span><br>
      <span class="fs-6 fw-demibold">{{ sale.buyer.phoneNumber }}</span><br>
      </div>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Productos: </span>
    </div>
    <div class="my-2 d-flex align-items-center">
      <div class="ms-5"><span class="fs-5 fw-demibold">{{ sale.product.name }}, {{ sale.product.description }}</span><br><span class="ms-2 fw-light">{{ sale.product.price | currency }}</span></div>
      <span class="fs-6 text-primary fw-semibold ms-5">({{ sale.quantity }} piezas)</span>
    </div>
    <hr>
    <div class="my-3">
      <span class="fs-5 fw-demibold text-secondary">Monto: </span><span class="fs-3 fw-light ms-2">{{sale.quantity * sale.product.price | currency }} </span><span class="text-success fw-bold fs-6 fst-italic">MXN</span>
    </div>
    <div class="mt-5">
      <button class="btn btn-outline-secondary shadow-sm me-2" (click)="back()">
        <i class="fa fa-angle-left me-2"></i>
        Atrás</button>
    <button class="btn btn-secondary shadow-sm">
      <i class="fa fa-print me-2"></i>
      Imprimir</button>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class SSaleDetailComponent implements OnInit {
  sale: any;

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getSale();
  }

  back() {
    this.router.navigateByUrl('account/supplier/sales');
  }

  getSale() {
    this.supplierService.getSale(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('sale response', response);
      this.sale = response;
    }, error => {
      console.log('sale error', error);
    })
  }

}
