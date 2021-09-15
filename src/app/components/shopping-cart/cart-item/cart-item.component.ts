import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { CartService } from 'src/app/services/cart/cart.service';
import {CartItem} from "../../../models/cart-item";
import { ShoppingCartComponent } from '../shopping-cart.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: any;
  faRemove = faTrash;
  totalprice : number;
  constructor(private cartService : CartService, private router : Router ,private shoppingCart : ShoppingCartComponent) { }

  ngOnInit(): void {

  }
  
  decQuantity(code) {
    this.cartService.decQuantity(code)
    .subscribe(res=>{
      this.cartService.getUserBasketDetails().subscribe(res => {
        this.cartService._setOrderDetails(res); 
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
    }, error =>
     console.log(error));
  }
  incQuantity(code){
    this.cartService.updateCart(code)
    .subscribe(res=>{
      this.cartService.getUserBasketDetails().subscribe(res => {
        this.cartService._setOrderDetails(res); 
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
    }, error =>
     console.log(error));
  }
  OrderItemDelete(code) {
    this.cartService.OrderItemDelete(code)
    .subscribe(res=>{
      this.cartService.getUserBasketDetails().subscribe(res => {
        this.cartService._setOrderDetails(res); 
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
    }, error =>
     console.log(error));
  }
  // removeItem(item) {
  //   // console.log( this.cartItem.splice(productId,1))
  //   // this.cartItem.splice(productId,1);
  //   if (this.cartItem.length > 1){
  //     this.cartItem.splice(item.codde,1);
  //     // this.cartItem = this.cartItem.filter(item => item.code === code)
  //     localStorage.setItem('localCart', JSON.stringify(this.cartItem))
  //   } else {
  //     this.cartItem = [];
  //     localStorage.removeItem('localCart')
  //   }
  // }
}
