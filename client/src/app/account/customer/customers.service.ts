import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  baseUrl = environment.apiUrl;

  product: Product = {
    id: 0,
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    userId: 0,
    user: undefined
  };

  private productSource = new BehaviorSubject<Product>(this.product);
  currentProduct = this.productSource.asObservable();

  changeProduct(product: Product) {
    // product.quantity = 1;
    this.productSource.next(product);
  }

  constructor(private http: HttpClient) { }

  getPharmacies() {
    return this.http.get(this.baseUrl + 'customers');
  }

  getProducts() {
    return this.http.get(this.baseUrl + 'customers/products');
  }

  getPurchases() {
    return this.http.get(this.baseUrl + 'customers/purchases');
  }

  getPharmacy(id: string) {
    return this.http.get(this.baseUrl + 'customers/' + id);
  }

  getProduct(id: string) {
    return this.http.get(this.baseUrl + 'customers/products/' + id);
  }

  getPurchase(id: string) {
    return this.http.get(this.baseUrl + 'customers/purchase/' + id);
  }

  getUser() {
    return this.http.get(this.baseUrl + 'customers/user');
  }

  payProduct(product: Product) {
    return this.http.post(this.baseUrl + 'customers/buy', product);
  }

}
