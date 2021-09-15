import { Component, OnInit } from '@angular/core';
import {ShopService} from '../../services/shop.service';
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart/cart.service";
import {ShoppingCart} from "../../models/shopping-cart";
import {Observable} from "rxjs";
import {Product} from "../../models/product";


;@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Product: Product;
  // private productItem: any;

  constructor(
    private service: ShopService,
    private msg: MessengerService,
    private cartService: CartService
  )
  {
    this.getProducts();
  }


  async ngOnInit() {
   
  }

  getProducts = () => {
    this.service.getAllProducts().subscribe(
      data => {
        this.Product = data;
      },
      error => {
        console.log(error);
      }
    );
  }


}
