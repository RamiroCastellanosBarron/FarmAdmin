import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-s-sale-detail',
  template: `
  <div *ngIf="sale">
  <button class="btn btn-outline-secondary me-2 shadow fw-semibold" (click)="back()">
      <i class="fa fa-angle-left me-2"></i>
      Atrás
    </button>

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
