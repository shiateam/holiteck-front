import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  styleUrls: ['./header-cart.component.css']
})
export class HeaderCartComponent implements OnInit {

  cartItems : any = [];
  cart : any;
  cartTotal = 0;
  details: any;
  totalPrice =0;
  cartItemQuantity = 0 ;
  faShoppingCart = faShoppingCart;
  showCart :boolean =false

  constructor(
    private cartService: CartService,
    private msg: MessengerService,
    public auth: AuthService
  ) {
    this.cartService._getOrderDetails().subscribe(res => {
      this.cartItems = res;
      console.log(this.cartItems)
      if (this.cartItems !== null && this.cartItems.length) {
        // this.totalPrice = 0;
        for (let i = 0; i < this.cartItems.length; i++) {
          this.cartItemQuantity = this.cartItems[i].order.get_total_quantity;
          this.totalPrice += this.cartItems[i].price * this.cartItems[i].quantity;
        }
      }
      else {
        this.cartItemQuantity = 0;
        this.totalPrice = 0;
      }
      console.log(this.cartItemQuantity)
     
    });
   }

  ngOnInit() {


   
  }
}
