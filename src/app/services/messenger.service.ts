import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()
  subjectQty = new Subject();
  subjectOrderToPay = new Subject();

  constructor() { }

  sendMsg(product) {
    this.subject.next(product) //Triggering an event
  }

  getMsg() {
    return this.subject.asObservable()
  }
   sendQty(qty:number){
    this.subjectQty.next(qty);
   }

   getQty(){
     return this.subjectQty.asObservable()
   }

   sendOrderToPay(OrderInfo){
    this.subjectQty.next(OrderInfo);
   }

   getOrderToPay(){
     return this.subjectQty.asObservable()
   }

}
