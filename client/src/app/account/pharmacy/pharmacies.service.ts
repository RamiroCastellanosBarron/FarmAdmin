import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class PharmaciesService {
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
    product.quantity = 1;
    this.productSource.next(product);
  }

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.baseUrl + 'pharmacies');
  }

  getCustomer(id: string) {
    return this.http.get(this.baseUrl + 'pharmacies/' + id);
  }

  getSuppliers() {
    return this.http.get(this.baseUrl + 'pharmacies/suppliers');
  }

  getSupplier(id: string) {
    return this.http.get(this.baseUrl + 'pharmacies/suppliers/' + id);
  }

  getSales() {
    return this.http.get(this.baseUrl + 'pharmacies/sales');
  }

  getSale(id: string) {
    return this.http.get(this.baseUrl + 'pharmacies/sales/' + id);
  }

  getProducts() {
    return this.http.get(this.baseUrl + 'pharmacies/products');
  }

  getProduct(id: string) {
    return this.http.get(this.baseUrl + 'pharmacies/products/' + id);
  }

  getItems() {
    return this.http.get(this.baseUrl + 'pharmacies/items');
  }

  getItem(id: string) {
    return this.http.get(this.baseUrl + 'pharmacies/items/' + id);
  }

  getPurchases() {
    return this.http.get(this.baseUrl + 'pharmacies/purchases');
  }

  getPurchase(id: string) {
    return this.http.get(this.baseUrl + 'pharmacies/purchases/' + id);
  }

  getUser() {
    return this.http.get(this.baseUrl + 'pharmacies/user');
  }

  payProduct(product: Product) {
    return this.http.post(this.baseUrl + 'pharmacies/buy', product);
  }

}
