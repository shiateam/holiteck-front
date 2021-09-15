import { Component, OnInit } from '@angular/core';
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart/cart.service";
import {CartItem} from "../../models/cart-item";
import {Product} from "../../models/product";
import {AuthService} from "../../services/auth/auth.service";
import { Router } from '@angular/router';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  cartIcon = faShoppingCart;
  cartItems : any = [];
  OrderConfirmPrice :any;
  cartTotal = 0;
  cartItemQuantity = 0;

  constructor(
    private cartService: CartService,
    private msg: MessengerService,
    public auth: AuthService,
    private router : Router
  ) { }
  
  ngOnInit() {
    this.handleSubscription();
    this.getOrderConfirmPrice();

  }


  handleSubscription() {
    this.cartService._getOrderDetails().subscribe(res =>{
      this.cartItems = res;
    })

  }


  
  getOrderConfirmPrice() {
    this.cartService.orderConfirmPrice().subscribe(data =>{
      console.log(data);
      this.OrderConfirmPrice = data;
    })
  }
  checkOut(){
    this.router.navigate(['/check-out']);
  }
}
