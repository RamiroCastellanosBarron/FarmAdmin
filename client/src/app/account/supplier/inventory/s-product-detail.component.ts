import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-s-product-detail',
  template: `
    <div *ngIf="product">
    <h4 class="fst-italic">{{ product.name }}</h4>
    <p class="text-primary fst-semibold fs-3">{{ product.description }}</p>
    <div class="mb-3">
    <span>Producto de: </span><span class="fst-semibold fst-italic text-info fs-4">{{product.supplierProducts[0].supplier.firstName}}{{ product.supplierProducts[0].supplier.lastName }}</span>
    <br>
    <span class="text-secondary fst-italic">{{ product.supplierProducts[0].supplier.address.street }} {{ product.supplierProducts[0].supplier.address.number }}, {{ product.supplierProducts[0].supplier.address.zipCode }}. {{ product.supplierProducts[0].supplier.address.city }}, {{ product.supplierProducts[0].supplier.address.country }}</span>
    <span class="fst-demibold text-secondary fs-3 fst-italic mx-3">|</span>
    <i class="fa fa-phone me-2"></i><span class="text-secondary fst-demibold">{{ product.supplierProducts[0].supplier.phoneNumber}}</span>
    </div>

    <div class="card shadow-sm my-3">
      <div class="card-body">
        <h5 class="fst-italic fst-semibold">Disponibilidad</h5>
        <span class="fs-4">{{ product.supplierProducts[0].quantity }} </span><span class="fst-italic text-secondary fst-light"> ejemplares en tienda.</span>
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
export class SProductDetailComponent implements OnInit {
  product: any;

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  delete() {
    this.supplierService.deleteProduct(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('delete product response', response);
      this.router.navigateByUrl('account/supplier/inventory');
      this.toastr.success('Producto eliminado.');
    }, error => {
      console.log('delete product error', error);
      this.toastr.error('Error al eliminar producto.')
    })
  }

  back() {
    this.router.navigateByUrl('account/supplier/inventory');
  }

  getProduct() {
    this.supplierService.getProduct(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      console.log('product response', response);
      this.product = response;
    }, error => {
      console.log('product error', error);
    })
  }

}
