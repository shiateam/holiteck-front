import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  faUser,
  faSearch,
  faShoppingCart,
  faCaretDown,
  faCaretSquareDown,
  faCaretUp,
  faCaretSquareRight, faCaretSquareLeft
} from '@fortawesome/free-solid-svg-icons';
import {ShoppingCart} from "../../../models/shopping-cart";
import {Observable} from "rxjs";
import {CartService} from "../../../services/cart/cart.service";
import {CartItem} from "../../../models/cart-item";
import {MessengerService} from "../../../services/messenger.service";
import {Product} from "../../../models/product";
import {AuthService} from "../../../services/auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  height: number = 20 ;
  // @Output() heightChange = new EventEmitter<number>();
  public isMenuCollapsed = true;
  public openDropdown = true;
  public isCollapsed1 = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faSearch = faSearch;
  faCaret = faCaretSquareLeft;
  cartItemQuantity: number = 0 ;
  panelOpenState = false;
  cart: any;
  productAdded: any;

  constructor(private cartService:CartService, private msg:MessengerService , public auth : AuthService ,private router : Router) {
    // this.cartService.subject.subscribe((data) =>{
    //   // @ts-ignore
    //   this.cartItemQuantity = data;
    // })
    // this.msg.getMsg().subscribe((product : Product) =>{
    //   this.cart = product;
    //   console.log(this.cart)
    // })
    this.msg.getQty().subscribe((qty:number)=>{
      this.cartItemQuantity = qty;
    })
  }
  // inc() {
  //   this.reheight(+50);
  //   console.log(this.reheight(+50))
  // }

  // reheight(delta: number) {
  //   this.height = Math.min(40, Math.max(8, +this.height + delta));
  //   this.heightChange.emit(this.height);
  caretdown = faCaretDown;
  caretUp= faCaretUp;

  ngOnInit() {
    // this.cartService.getCartItems().subscribe((data)=>{
    //   this.cart = data;
    //   this.cartItemQuantity = data.length;
    // })
  }
  logout() {
    this.auth.logout();
    window.location.href = 'http://127.0.0.1:4200'  ;
    // let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    //   });
  }
  // samsong() {
  //   this.router.navigate(['/products'], { queryParams: { order: 'popular' } });
  // }

//  cartItemfunc() {
//    var cartValue = JSON.parse(localStorage.getItem('localCart'));
//    if(cartValue != null){
//      this.cart = cartValue;
//       this.cartItemQuantity = cartValue.length;
//     }
//  }

// 

}
