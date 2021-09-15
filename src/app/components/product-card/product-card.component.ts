import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ShoppingCart} from "../../models/shopping-cart";
import {CartService} from "../../services/cart/cart.service";
import {MessengerService} from "../../services/messenger.service";
import {CartItem} from "../../models/cart-item";
import {ActivatedRoute,Router} from "@angular/router";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit  {
  @Input('product') product: Product;
  imageUrl : string


  cartItem : CartItem[];
  constructor(
        private cartService: CartService,
        private msg: MessengerService,
        private router : Router,
        private shopService : ShopService,) {

         }

         ngOnInit(){
          let str = this.product.image.split('/'); // or newStr = [...str];
          if (str.length ==6) {
            str.splice(0,3);
            this.imageUrl = str.join('/');
          }
          else this.imageUrl = this.product.image;
         }
}
