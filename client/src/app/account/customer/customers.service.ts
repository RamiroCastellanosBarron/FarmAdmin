import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PharmacyProduct } from '../_models/PharmacyProduct';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  baseUrl = environment.apiUrl;

  pharmacyProduct: PharmacyProduct = {
    id: 0,
    idProduct: 0,
    product: undefined,
    idPharmacy: 0,
    pharmacy: undefined,
    quantity: 0
  }

  private productSource = new BehaviorSubject<PharmacyProduct>(this.pharmacyProduct);
  currentProduct = this.productSource.asObservable();

  changeProduct(pharmacyProduct: PharmacyProduct) {
    // pharmacyProduct.quantity = 1;
    this.productSource.next(pharmacyProduct);
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

  payProduct(pharmacyProduct: PharmacyProduct) {
    return this.http.post(this.baseUrl + 'customers/buy', pharmacyProduct);
  }

}
