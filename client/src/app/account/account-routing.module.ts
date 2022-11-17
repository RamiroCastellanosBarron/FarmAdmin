import { ShoppingCartComponent } from './customer/shopping-cart.component';
import { CPharmacyDetailComponent } from './customer/pharmacies/c-pharmacy-detail.component';
import { CPharmaciesListComponent } from './customer/pharmacies/c-pharmacies-list.component';
import { CProductDetailComponent } from './customer/products/c-product-detail.component';
import { CProductsListComponent } from './customer/products/c-products-list.component';
import { CPurchaseDetailComponent } from './customer/purchases/c-purchase-detail.component';
import { CPurchasesListComponent } from './customer/purchases/c-purchases-list.component';
import { SOrdersListComponent } from './supplier/orders/s-orders-list.component';
import { SOrderDetailComponent } from './supplier/orders/s-order-detail.component';
import { SCustomerDetailComponent } from './supplier/customers/s-customer-detail.component';
import { SCustomersListComponent } from './supplier/customers/s-customers-list.component';
import { SProductsListComponent } from './supplier/inventory/s-products-list.component';
import { SProductDetailComponent } from './supplier/inventory/s-product-detail.component';
import { PPurchaseDetailComponent } from './pharmacy/purchases/p-purchase-detail.component';
import { PPurchasesListComponent } from './pharmacy/purchases/p-purchases-list.component';
import { PSaleDetailComponent } from './pharmacy/sales/p-sale-detail.component';
import { PProductDetailComponent } from './pharmacy/products/p-product-detail.component';
import { PSupplierDetailComponent } from './pharmacy/suppliers/p-supplier-detail.component';
import { PCustomerDetailComponent } from './pharmacy/customers/p-customer-detail.component';
import { PSalesListComponent } from './pharmacy/sales/p-sales-list.component';
import { PProductsListComponent } from './pharmacy/products/p-products-list.component';
import { PSuppliersListComponent } from './pharmacy/suppliers/p-suppliers-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PCustomersListComponent } from './pharmacy/customers/p-customers-list.component';
import { SSalesListComponent } from './supplier/sales/s-sales-list.component';

const routes: Routes = [
  // Suppliers
  { path: 'supplier/inventory', component: SProductsListComponent },
  { path: 'supplier/inventory/product/:id', component: SProductDetailComponent },

  { path: 'supplier/customers', component: SCustomersListComponent },
  { path: 'supplier/customer/:id', component: SCustomerDetailComponent },

  { path: 'supplier/sales', component: SSalesListComponent },
  { path: 'supplier/sale/:id', component: PSaleDetailComponent },

  { path: 'supplier/orders', component: SOrdersListComponent },
  { path: 'supplier/order/:id', component: SOrderDetailComponent },

  // Pharmacies
  { path: 'pharmacy/customers', component: PCustomersListComponent },
  { path: 'pharmacy/customer/:id', component: PCustomerDetailComponent },

  { path: 'pharmacy/suppliers', component: PSuppliersListComponent },
  { path: 'pharmacy/supplier/:id', component: PSupplierDetailComponent },

  { path: 'pharmacy/inventory', component: PProductsListComponent },
  { path: 'pharmacy/inventory/product/:id', component: PProductDetailComponent },

  { path: 'pharmacy/sales', component: PSalesListComponent },
  { path: 'pharmacy/sale/:id', component: PSaleDetailComponent },

  { path: 'pharmacy/purchases', component: PPurchasesListComponent },
  { path: 'pharmacy/purchase/:id', component: PPurchaseDetailComponent },

  // Customers
  { path: 'customer/purchases', component: CPurchasesListComponent },
  { path: 'customer/purchase/:id', component: CPurchaseDetailComponent },

  { path: 'customer/products', component: CProductsListComponent },
  { path: 'customer/product/:id', component: CProductDetailComponent },

  { path: 'customer/pharmacies', component: CPharmaciesListComponent },
  { path: 'customer/pharmacy/:id', component: CPharmacyDetailComponent },

  { path: 'customer/shopping-cart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccontRoutingModule { }
