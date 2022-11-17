import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PharmaciesService {
  baseUrl = environment.apiUrl;

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

  getProducts() {
    return this.http.get(this.baseUrl + 'pharmacies/products');
  }

  getProduct(id: string) {
    return this.http.get(this.baseUrl + 'pharmacies/products/' + id);
  }

  getPurchases() {
    return this.http.get(this.baseUrl + 'pharmacies/purchases');
  }
}
