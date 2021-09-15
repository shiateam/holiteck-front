import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './components/slider/slider.component';
import {NgbPaginationModule, NgbAlertModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatTabsModule} from '@angular/material/tabs';

import * as $ from 'jquery';
import { SpecialProductsComponent } from './components/owl-carousels/special-products/special-products.component';
import { MobileComponent } from './components/category/mobile/mobile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenuComponent } from './components/shared/menu/menu.component';
import { CartItemComponent } from './components/shopping-cart/cart-item/cart-item.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FlashmemoryComponent } from './components/category/flashmemory/flashmemory.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { HeaderCartComponent } from './components/shopping-cart/header-cart/header-cart.component';
import { BestsellersComponent } from './components/bestsellers/bestsellers.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { AddressComponent } from './components/address/address.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import { InterceptorService } from './loader/interceptor.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StatusPayComponent } from './components/status-pay/status-pay.component';
import { SearchComponent } from './components/search/search.component';
import { PersianNumberPipe } from './pipes/persian-number.pipe';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { ContactComponent } from './components/contact/contact.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClickOutsideDirective } from './components/shared/menu/click-outside.directiv'

@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    CheckOutComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrderSuccessComponent,
    CategoryComponent,
    SliderComponent,
    SpecialProductsComponent,
    MobileComponent,
    MenuComponent,
    MenuComponent,
    CartItemComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ProductDetailComponent,
    FlashmemoryComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    VerifyCodeComponent,
    HeaderCartComponent,
    BestsellersComponent,
    NewArrivalsComponent,
    AddressComponent,
    DashboardComponent,
    StatusPayComponent,
    SearchComponent,
    PersianNumberPipe,
    ForgetPassComponent,
    ContactComponent,
   
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        FontAwesomeModule,
        NgbCollapseModule,
        IvyCarouselModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        MatRadioModule,
        MatSliderModule,
        MatProgressSpinnerModule
    ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass : InterceptorService , multi : true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
