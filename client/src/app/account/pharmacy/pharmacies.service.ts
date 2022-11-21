import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupplierProduct } from '../_models/SupplierProduct';

@Injectable({
  providedIn: 'root'
})
export class PharmaciesService {
  baseUrl = environment.apiUrl;

  supplierProduct: SupplierProduct = {
    id: 0,
    idProduct: 0,
    product: undefined,
    idSupplier: 0,
    supplier: undefined,
    quantity: 0
  }

  private productSource = new BehaviorSubject<SupplierProduct>(this.supplierProduct);
  currentProduct = this.productSource.asObservable();

  changeProduct(supplierProduct: SupplierProduct) {
    this.productSource.next(supplierProduct);
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

  payProduct(product: SupplierProduct) {
    return this.http.post(this.baseUrl + 'pharmacies/buy', product);
  }

}
