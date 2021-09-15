import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { CartItem } from './models/cart-item';
import { AuthService } from './services/auth/auth.service';
import { CartService } from './services/cart/cart.service';
import { MessengerService } from './services/messenger.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartItem : CartItem;
  constructor( private cartService : CartService , private msg:MessengerService, private auth:AuthService ,
    public loader : LoaderService) {}

  ngOnInit(){
    if(this.auth.loggedIn){ this.cartService.getUserBasketDetails().subscribe(res => {
      this.cartService._setOrderDetails(res); 
    });

  }

  }
 ConvertToPr(str) {
    return str.replace(/0/g,'٠').replace(/1/g,'١').replace(/2/g,'٢').replace(/3/g,'٣').replace(/4/g,'٤')
        .replace(/5/g,'٥').replace(/6/g,'٦').replace(/7/g,'٧').replace(/8/g,'٨').replace(/9/g,'٩')
        .replace(/۰/g,'٠').replace(/۱/g,'١').replace(/۲/g,'٢').replace(/۳/g,'٣').replace(/۴/g,'٤')
        .replace(/۵/g,'٥').replace(/۶/g,'٦').replace(/۷/g,'٧').replace(/۸/g,'٨').replace(/۹/g,'٩');
}
}
