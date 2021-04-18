import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ShoppingCart} from "../models/shopping-cart";
import {Product} from "../models/product";
import {map, take} from 'rxjs/operators';
import {CartItem} from "../models/cart-item";
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem: CartItem[];
  cartNumber:number = 0;

  constructor(private http: HttpClient) { }
  baseUrl = 'http://127.0.0.1:3000';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.http.get(this.baseUrl + '/cart/' , {headers: this.httpHeaders})
  //  .pipe(map((result) => new ShoppingCart(result["items"])));
  // }

  // async addToCart(product: Product) {
  //   this.updateItem(product, 1);
  // }

  // async removeFromCart(product: Product) {
  //   this.updateItem(product, -1);
  // }

  // async clearCart() {
  //   let cartId = await this.getOrCreateCartId();
  //   this.http.delete(this.baseUrl + '/cart/' + cartId + '/items', {headers: this.httpHeaders});
  // }


  // private create() {
  //   return this.http.post(this.baseUrl + '/cart/' ,
  //     {dateCreated: new Date().getTime() , cartID: uuid.v4()} ,
  //     {headers: this.httpHeaders});
  // }

  // private getItem(cartId: string, productId: string) {
  //   return this.http.get(this.baseUrl +'/cart/' + cartId + '/items/' + productId);
  // }

  // private async getOrCreateCartId(): Promise<string> {
  //   let cartId = localStorage.getItem('cartId');
  //   if (cartId) return cartId;

  //   await this.create().subscribe((result: any) => {
  //     localStorage.setItem('cartId', cartId);
  //     return result.id;
  //   });
  // }

  // private async updateItem(product: Product, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.$key);
  //   item$.pipe(take(1)).subscribe(item => {
  //     let quantity = (item["quantity"] || 0) + change;
  //     if (quantity === 0) {
  //       return this.http.delete(this.baseUrl +'/cart/' + cartId + '/items/' + product.$key);
  //     }
  //     else {
  //       return this.http.put(this.baseUrl +'/cart/' + cartId + '/items/' + product.$key,
  //         { title: product.name,
  //           imageUrl: product.imageUrl,
  //           price: product.price,
  //           quantity: quantity
  //         });
  //     }
  //   })

  //   // let item$ = this.getItem(cartId, product.$key);
  //   // item$.pipe(take(1)).subscribe(item => {
  //   //   // @ts-ignore
  //   //   let quantity = (item.quantity || 0) + change;
  //   //   if (quantity === 0) item$.remove();
  //   //   else item$.update({
  //   //     title: product.title,
  //   //     imageUrl: product.imageUrl,
  //   //     price: product.price,
  //   //     quantity: quantity
  //   //   });
  //   // });
  // }

  // getCartItems(): Observable<CartItem[]> {
  //   //TODO: Mapping the obtained result to our CartItem props. (pipe() and map())
  //   return this.http.get<CartItem[]>(this.baseUrl + '/cart',{headers: this.httpHeaders}).pipe(
  //     map((result: any[]) => {
  //       let cartItems: CartItem[] = [];
  //
  //       for (let item of result) {
  //         let productExists = false
  //
  //         for (let i in cartItems) {
  //           if (cartItems[i].productId === item.product.id) {
  //             cartItems[i].qty++
  //             productExists = true
  //             break;
  //           }
  //         }
  //
  //         if (!productExists) {
  //           cartItems.push(new CartItem(item.id, item.product));
  //         }
  //       }
  //
  //       return cartItems;
  //     })
  //   );
  // }
  // addProductToCart(product: Product)  {
  //   localStorage.setItem('product',product.name);
  //   // return this.http.post(this.baseUrl + '/cart', { product },{headers: this.httpHeaders});
  // }
  subject = new Subject()
  addToCart(product : Product) {
    let cartDatNull = localStorage.getItem('localCart');
    if (cartDatNull === null){
      let storeDataGet :any =[];
      storeDataGet.push(new CartItem( product ));
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }
    else {
      var id = product.id;
      let index:number = -1;
      this.cartItem = JSON.parse(localStorage.getItem('localCart'));
      for (let i = 0; i < this.cartItem.length; i++){
        if (parseInt(String(id))===parseInt(String(this.cartItem[i].productId))) {
          this.cartItem[i].qty +=1;
          index = i;
          break;
        }
      }
      if (index == -1){
        this.cartItem.push(new CartItem( product ));
        localStorage.setItem('localCart', JSON.stringify(this.cartItem))

      }
      else {
        localStorage.setItem('localCart', JSON.stringify(this.cartItem))
      }
    }
    this.cartNumberFunc();
  }
  cartNumberFunc (){
    var cartValue = JSON.parse(localStorage.getItem('localCart'));
    this.cartNumber = cartValue.length;
    this.subject.next(this.cartNumber)
    console.log(this.cartNumber);
  }
}
