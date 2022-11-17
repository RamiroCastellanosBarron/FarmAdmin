import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmaciesService } from '../pharmacies.service';

@Component({
  selector: 'app-p-product-detail',
  template: `
    <p>
      p-product-detail works!
    </p>
  `,
  styles: [
  ]
})
export class PProductDetailComponent implements OnInit {
  product: any;

  constructor(private pharmaciesService: PharmaciesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProduct();
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
