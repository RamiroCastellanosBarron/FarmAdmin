import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  baseUrl = environment.apiUrl;

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
}
