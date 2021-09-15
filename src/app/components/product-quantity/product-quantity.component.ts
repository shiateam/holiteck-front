import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {CartService} from "../../services/cart/cart.service";
import {CartItem} from "../../models/cart-item";
import {ShoppingCart} from "../../models/shopping-cart";

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit{
  //
  // @Input('product') product: Product;
  @Input('cartItem') cartItem: any;
  //
  cart : CartItem[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    console.log(this.cartItem)
  }
  inc(code){
    this.cartService.updateCart(code);
  }
  //
  // addToCart() {
  //   console.log(this.cartItem);

  //   this.cartItem.qty += 1;
  //   this.cart= JSON.parse(localStorage.getItem('localCart'));
  //   for (let i=0; i< this.cart.length; i++){
  //     if (this.cart[i].productId === this.cartItem.productId){
  //       this.cart[i]=this.cartItem;
  //     }
  //   }
  //   localStorage.setItem('localCart',JSON.stringify(this.cart))
  // }
  // //
  // removeFromCart() {

  //   this.cartItem.qty -= 1;
  //   this.cart= JSON.parse(localStorage.getItem('localCart'));
  //   for (let i=0; i< this.cart.length; i++){
  //     if (this.cart[i].productId === this.cartItem.productId){
  //       this.cart[i]=this.cartItem;
  //     }
  //   }
  //   localStorage.setItem('localCart',JSON.stringify(this.cart))
  // }

}
