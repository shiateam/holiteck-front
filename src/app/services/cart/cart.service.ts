import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ShoppingCart} from "../../models/shopping-cart";
import {Product} from "../../models/product";
import {map, take} from 'rxjs/operators';
import {CartItem} from "../../models/cart-item";
import * as uuid from 'uuid';
import {MessengerService} from "../messenger.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: CartItem[];
  cartNumber:number = 0;
  Authority : any;

  constructor(private http: HttpClient , private msg:MessengerService,private auth:AuthService) { }
  baseUrl = 'http://www.api.holitech.ir/admin/app/api';
  // baseUrl = 'http://127.0.0.1:8000/admin/app/api';
  zarinpal = 'http://www.api.holitech.ir/zarinpal'

  httpHeaders = new HttpHeaders({'Content-type': 'application/json','Access-Control-Allow-Origin': '*'});

  commonOption(): { params?: any, headers?: HttpHeaders } {
    if (!this.auth.loggedIn) {
      return {};
    }
    return {
      headers: new HttpHeaders({Authorization: `Token ${this.auth.accessToken}`})
    };
  }



  addProductToCart(product): Observable<any> {
    const cartItem = new CartItem( product );
      console.log(cartItem);
      const data = {
       'code':cartItem.code ,
        'qty': cartItem.quantity,
      };
    return this.http.post(this.baseUrl + '/Ordermanage/OrderControl/', data, this.commonOption())
    ;
  };
  // ordukhani -----------------------------
  private orderDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // private orderDetails = new Subject();
  _setOrderDetails(details) {
    this.orderDetails.next(details);
  }

  _getOrderDetails(): Observable<any> {
    return this.orderDetails;
  }


  getUserBasketDetails(): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + '/Order/CartItems/',this.commonOption());
  }
  // -----------------------------
  updateCart(code: any) : Observable<any>{
    const data = {
      'code':code ,
      'qty': 1
     };
     console.log(data)
     return this.http.put(this.baseUrl + '/Ordermanage/OrderItemChange/', data, this.commonOption())
  }
  decQuantity(code: any) : Observable<any>{
    const data = {
      'code':code ,
      'qty': -1
     };
     return this.http.put(this.baseUrl + '/Ordermanage/OrderItemChange/', data, this.commonOption())
  }

  OrderItemDelete(code):Observable<any>{
    const data = {
      'code':code ,
     };
     return this.http.post(this.baseUrl + '/Ordermanage/OrderItemDelete/', data, this.commonOption())
  }

  orderConfirmPrice():Observable<any>{
    
    return this.http.get<any>(this.baseUrl + '/Order/OrderConfirmPrice/', this.commonOption())
  
  }

  orderToPay(OrderConfirmPrice):Observable<any>{

    return this.http.post(this.baseUrl + '/Order/OrderToPay/', OrderConfirmPrice, this.commonOption())

    
  }

  goToZrinpal(totalprice,mobile) {

    const Data = {
      totalprice,
      mobile
    }
    console.log(Data);
    this.http.post(this.zarinpal + '/request/' ,Data , this.commonOption())
    .subscribe(response => {
      this.Authority = response['Authority'];
      localStorage.removeItem('OrderPay');
      window.location.href = 'https://www.zarinpal.com/pg/StartPay/' + this.Authority ;
    } , (error) =>{
      console.log(error)
    })
  }

  verify(params) : Observable<any>{
    const json = JSON.parse(localStorage.getItem('order'))
    
    const Data = {
      'Authority':params.Authority,
      'Status': params.Status,
      'amount': json.totalprice
    }
    return this.http.post(this.zarinpal + '/verify/' ,Data , this.commonOption())
  }

  orderSuccess():Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Order/orderpayed/', this.commonOption())
  }

addressUser():Observable<any> {
  return this.http.get(this.baseUrl + '/Usermanagement/GetAddress/' ,this.commonOption())
}
createAddress(province,city,district,postcode,firstName,lastName):Observable<any> {
  const data = {
    'province':province,
    'city':city,
    'district':district,
    'postcode':postcode,
    'first_name':firstName,
    'last_name': lastName
  }
  return this.http.post(this.baseUrl + '/Usermanagement/AddressCreate/' ,data,this.commonOption())
}

addressChange (province,city,district,postcode,firstName,lastName):Observable<any>{
  const data = {
    'province':province,
    'city':city,
    'district':district,
    'postcode':postcode,
    'first_name':firstName,
    'last_name': lastName
  }
  return this.http.put(this.baseUrl + '/Usermanagement/AddressChange/' ,data,this.commonOption())
}
 
  subject = new Subject()


  addToCartClient(product : Product) {

    let cartDatNull = localStorage.getItem('localCart');
    if (cartDatNull === null){
      let storeDataGet :any =[];
      storeDataGet.push(new CartItem( product ));
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }
    else {
      var code = product.code;
      let index:number = -1;
      this.cartItem = JSON.parse(localStorage.getItem('localCart'));
      for (let i = 0; i < this.cartItem.length; i++){
        // if (parseInt(String(id))===parseInt(String(this.cartItem[i].productId)))
      if (code===this.cartItem[i].code){
          this.cartItem[i].quantity +=1;
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
    this.msg.sendMsg(cartValue);
    this.cartNumber = cartValue.length;
    this.subject.next(this.cartNumber)
  }
}
