import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-status-pay',
  templateUrl: './status-pay.component.html',
  styleUrls: ['./status-pay.component.css']
})
export class StatusPayComponent implements OnInit {

  status : number

  constructor(private route:ActivatedRoute, private cartService : CartService, private auth : AuthService , private router : Router ) {
    this.route.queryParams.subscribe(params => {
     this.cartService.verify(params)
     .subscribe(response => {
       console.log(response)
       this.statusPay(response)
    } , (error) =>{
      console.log(error);
    })
    });
   }

  ngOnInit(): void {
  }

  statusPay(response){
    console.log(response)
    this.status = response['Status'];
    if (this.status == 100 || this.status==101) {

      this.cartService.orderSuccess().subscribe(res => {
      console.log(res);
      this.cartService.getUserBasketDetails().subscribe(data => {
        this.cartService._setOrderDetails(data); 
      });
      
    } , error => console.log(error))
    } 
    
  };
  // ordersuccess(){
  //   this.cartService.orderSuccess().subscribe(res => {
  //     console.log(res);
  //     this.cartService.getUserBasketDetails().subscribe(data => {
  //       this.cartService._setOrderDetails(data); 
  //     });
      
  //   } , error => console.log(error))
  // }
}
