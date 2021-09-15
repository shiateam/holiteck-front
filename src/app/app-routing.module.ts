import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { CategoryComponent } from './components/category/category.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { HomeComponent } from './components/home/home.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MobileComponent} from "./components/category/mobile/mobile.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {FlashmemoryComponent} from "./components/category/flashmemory/flashmemory.component";
import {LoginComponent} from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { AddressComponent } from './components/address/address.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatusPayComponent } from './components/status-pay/status-pay.component';
import { SearchComponent } from './components/search/search.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [
  {path : '', component: HomeComponent},
  {path: 'products' , component: ProductsComponent},
  {path: 'products/:code' , component: ProductDetailComponent},
  {path: 'category' , component: CategoryComponent},
  {path: 'category/mobile' , component: MobileComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'order-success', component: OrderSuccessComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'admin/products', component: AdminProductsComponent},
  {path: 'admin/orders', component: AdminOrdersComponent},
  {path: 'flashmemory', component: FlashmemoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'get-phone', component: RegisterComponent},
  {path: 'verify-code', component: VerifyCodeComponent},
  {path: 'address', component: AddressComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'status-pay', component: StatusPayComponent},
  {path: 'search', component: SearchComponent},
  {path: 'forget-pass', component: ForgetPassComponent},
  {path: 'contact', component: ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
