import { PCustomersListComponent } from './pharmacy/customers/p-customers-list.component';
import { HasRoleDirective } from './has-role.directive';
import { JwtInterceptor } from './jwt.interceptor';
import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccontRoutingModule } from './account-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { LoadingInterceptor } from '../loading.interceptor';
import { NavComponent } from './nav.component';
import { PSuppliersListComponent } from './pharmacy/suppliers/p-suppliers-list.component';
import { PProductsListComponent } from './pharmacy/products/p-products-list.component';
import { PSalesListComponent } from './pharmacy/sales/p-sales-list.component';
import { PCustomerDetailComponent } from './pharmacy/customers/p-customer-detail.component';
import { PSupplierDetailComponent } from './pharmacy/suppliers/p-supplier-detail.component';
import { PProductDetailComponent } from './pharmacy/products/p-product-detail.component';
import { PSaleDetailComponent } from './pharmacy/sales/p-sale-detail.component';
import { PPurchasesListComponent } from './pharmacy/purchases/p-purchases-list.component';
import { PPurchaseDetailComponent } from './pharmacy/purchases/p-purchase-detail.component';
import { SCustomersListComponent } from './supplier/customers/s-customers-list.component';
import { SCustomerDetailComponent } from './supplier/customers/s-customer-detail.component';
import { SProductsListComponent } from './supplier/inventory/s-products-list.component';
import { SProductDetailComponent } from './supplier/inventory/s-product-detail.component';
import { SOrdersListComponent } from './supplier/orders/s-orders-list.component';
import { SOrderDetailComponent } from './supplier/orders/s-order-detail.component';
import { SSalesListComponent } from './supplier/sales/s-sales-list.component';
import { SSaleDetailComponent } from './supplier/sales/s-sale-detail.component';
import { ShoppingCartComponent } from './customer/c-shopping-cart.component';
import { CProductsListComponent } from './customer/products/c-products-list.component';
import { CProductDetailComponent } from './customer/products/c-product-detail.component';
import { CPurchasesListComponent } from './customer/purchases/c-purchases-list.component';
import { CPurchaseDetailComponent } from './customer/purchases/c-purchase-detail.component';
import { CPharmaciesListComponent } from './customer/pharmacies/c-pharmacies-list.component';
import { CPharmacyDetailComponent } from './customer/pharmacies/c-pharmacy-detail.component';
import { PItemDetailComponent } from './pharmacy/items/p-item-detail.component';
import { PItemsListComponent } from './pharmacy/items/p-items-list.component';
import { PShoppingCartComponent } from './pharmacy/p-shopping-cart.component';

@NgModule({
  declarations: [
    AccountComponent,
    NavComponent,
    HasRoleDirective,
    PSuppliersListComponent,
    PProductsListComponent,
    PSalesListComponent,
    PCustomerDetailComponent,
    PCustomersListComponent,
    PSupplierDetailComponent,
    PProductDetailComponent,
    PSaleDetailComponent,
    PPurchasesListComponent,
    PPurchaseDetailComponent,
    SCustomersListComponent,
    SCustomerDetailComponent,
    SProductsListComponent,
    SProductDetailComponent,
    SOrdersListComponent,
    SOrderDetailComponent,
    SSalesListComponent,
    SSaleDetailComponent,
    ShoppingCartComponent,
    CProductsListComponent,
    CProductDetailComponent,
    CPurchasesListComponent,
    CPurchaseDetailComponent,
    CPharmaciesListComponent,
    CPharmacyDetailComponent,
    PItemDetailComponent,
    PItemsListComponent,
    PShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    AccontRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class AccontModule { }
