import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.baseUrl + 'suppliers');
  }

  getProducts() {
    return this.http.get(this.baseUrl + 'suppliers/products');
  }

  getSales() {
    return this.http.get(this.baseUrl + 'suppliers/sales');
  }

  getOrders() {
    return this.http.get(this.baseUrl + 'suppliers/orders');
  }

  getCustomer(id: string) {
    return this.http.get(this.baseUrl + 'suppliers/' + id);
  }

  getProduct(id: string) {
    return this.http.get(this.baseUrl + 'suppliers/products/' + id);
  }

  getSale(id: string) {
    return this.http.get(this.baseUrl + 'suppliers/sales/' + id);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + 'suppliers/products/' + id);
  }

}
