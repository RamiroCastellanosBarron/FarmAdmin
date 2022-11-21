import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmaciesService } from '../pharmacies.service';

@Component({
  selector: 'app-p-product-detail',
  template: `
  <div *ngIf="product">
    <h4 class="fst-italic">{{ product.product.name }}</h4>
    <p class="text-primary fst-semibold fs-3">{{ product.product.description }}</p>
    <div class="mb-3">
    <span>Producto de: </span><span class="fst-semibold fst-italic text-info fs-4">{{product.pharmacy.firstName}}{{ product.pharmacy.lastName }}</span>
    <br>
    <span class="text-secondary fst-italic">{{ product.pharmacy.address.street }} {{ product.pharmacy.address.number }}, {{ product.pharmacy.address.zipCode }}. {{ product.pharmacy.address.city }}, {{ product.pharmacy.address.country }}</span>
    <span class="fst-demibold text-secondary fs-3 fst-italic mx-3">|</span>
    <i class="fa fa-phone me-2"></i><span class="text-secondary fst-demibold">{{ product.pharmacy.phoneNumber}}</span>
    </div>

    <div class="card shadow-sm my-3">
      <div class="card-body">
        <h5 class="fst-italic fst-semibold">Disponibilidad</h5>
        <span class="fs-4">{{ product.quantity }} </span><span class="fst-italic text-secondary fst-light"> ejemplares en tienda.</span>
      </div>
    </div>

    <button class="btn btn-outline-secondary me-2 shadow fw-semibold" (click)="back()">
      <i class="fa fa-angle-left me-2"></i>
      Atrás
    </button>
    <button class="btn btn-info me-2 shadow text-white fw-semibold" (click)="edit()">
      Editar
      <i class="fa fa-edit ms-2"></i>
    </button>
    <button class="btn btn-outline-danger shadow fw-semibold" (click)="delete()">
      Eliminar
      <i class="fa fa-trash ms-2"></i>
    </button>
  </div>
  `,
  styles: [
  ]
})
export class PProductDetailComponent implements OnInit {
  product: any;

  constructor(private pharmaciesService: PharmaciesService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  back() {
    this.router.navigateByUrl('account/pharmacy/inventory');
  }

  delete() {
    this.toastr.warning('Pendiente por borrar');
  }

  getProduct() {
    this.pharmaciesService.getProduct(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('product response', response);
      this.product = response;
    }, error => {
      console.log('product error', error);
    })
  }

}
