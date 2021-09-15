import { Component, OnInit, ViewChild } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../models/product";
import { CartService } from 'src/app/services/cart/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartItem } from 'src/app/models/cart-item';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  Product:any;
  subscribedParam = "code";
  label : number;
  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;
  constructor(private shopService : ShopService,private route : ActivatedRoute , private cartService : CartService , private msg : MessengerService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getDetail();

  }
  handleAddToCart(product) {
    if (this.auth.loggedIn) {
          this.cartService.addProductToCart(product).subscribe(() => {
      this.cartService.getUserBasketDetails().subscribe(res => {
        console.log(res);
        this.cartService._setOrderDetails(res); 
      });
    },error =>{console.log(error) }
      )
    }
    else {
      this.deleteSwal.fire();
    }

  }
  getDetail() {
    // const code = +this.route.snapshot.paramMap.get('code');
    // const routeParams = this.route.snapshot.paramMap;
    // const code = Number(routeParams.get('code'));
    this.route.paramMap.subscribe(params => {
      this.subscribedParam = params.get("code");
    });
  this.shopService.getOneProduct(this.subscribedParam)
      .subscribe(data => {
        console.log(data)
          this.Product= data;
          this.label = this.Product.category.id;
        },
        error => {
          console.log(error);
        }
      );
  }
}
