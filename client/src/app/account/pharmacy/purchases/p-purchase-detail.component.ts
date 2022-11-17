import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmaciesService } from '../pharmacies.service';

@Component({
  selector: 'app-p-purchase-detail',
  template: `
  <div *ngIf="purchase">
    <div class="">
      <span class="text-mute fs-4 me-2">Compra No.</span><span class="text-info fs-3 fst-italic fw-semibold">{{ purchase.id }}</span>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary me-3">Fecha:</span><span class="fst-italic me-5">{{ purchase.saleDate | date: 'fullDate' }}</span>
      <span class="fs-5 fw-demibold text-secondary me-3">Hora:</span><span class="fst-italic">{{ purchase.saleDate | date: 'shortTime' }}</span>

    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Tienda: </span>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
      <span class="fs-4 fw-semibold text-secondary">{{ purchase.seller.firstName }}{{ purchase.seller.lastName }}</span><br>
      <span class="text-primary fw-light fst-italic">{{ purchase.seller.address.street }} {{ purchase.seller.address.number }}, {{ purchase.seller.address.zipCode }}. {{ purchase.seller.address.city }}, {{ purchase.seller.address.country }}</span>
      </div>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Comprador:</span>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
      <span class="fs-5 fw-demibold">{{ purchase.buyer.firstName }} {{ purchase.buyer.lastName }}</span><br>
      <span class="fs-6 fw-demibold">{{ purchase.buyer.phoneNumber }}</span><br>
      </div>
    </div>
    <div class="my-2">
      <span class="fs-5 fw-demibold text-secondary">Productos: </span>
    </div>
    <div class="my-2 d-flex align-items-center">
      <div class="ms-5"><span class="fs-5 fw-demibold">{{ purchase.product.name }}, {{ purchase.product.description }}</span><br><span class="ms-2 fw-light">{{ purchase.product.price | currency }}</span></div>
      <span class="fs-6 text-primary fw-semibold ms-5">({{ purchase.quantity }} piezas)</span>
    </div>
    <hr>
    <div class="my-3">
      <span class="fs-5 fw-demibold text-secondary">Monto: </span><span class="fs-3 fw-light ms-2">{{purchase.quantity * purchase.product.price | currency }} </span><span class="text-success fw-bold fs-6 fst-italic">MXN</span>
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
export class PPurchaseDetailComponent implements OnInit {
  purchase: any;

  constructor(private pharmaciesService: PharmaciesService, private route: ActivatedRoute, private router: Router) { }

  back() {
    this.router.navigateByUrl('account/pharmacy/purchases');
  }

  ngOnInit(): void {
    this.getPurchase();
  }

  getPurchase() {
    this.pharmaciesService.getPurchase(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('purchase response', response);
      this.purchase = response;
    }, error => {
      console.log('purchase error', error);
    })
  }

}
