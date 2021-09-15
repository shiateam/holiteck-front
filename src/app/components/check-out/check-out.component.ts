import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { CartService } from 'src/app/services/cart/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  firstName = new FormControl();
  lastName = new FormControl();
  mobile = new FormControl();
  OrderInfo: any;
  OrderConfirmPrice : any
  Address :any;
  // title :  'ذخیره';
  toggle : boolean = false;
  toggleForm : boolean = true
  closeResult = '';
  province = new FormControl();
  city = new FormControl();
  district = new FormControl();
  postcode = new FormControl();
  first_name = new FormControl();
  last_name = new FormControl();

  constructor(private cartService : CartService, private msg: MessengerService,private router : Router,private modalService: NgbModal) {
      // this.router.navigate (['/address/'])
      // this.addressUser();
   }

  ngOnInit(): void {
    this.loadDataPay(); 
    this.addressUser();
  }

  addressUser(){

    return this.cartService.addressUser().subscribe(res=>{
      console.log(res);
      // if(!res.address.length) this.router.navigate(['/address']);
      this.Address = res.address;
    },error =>   this.router.navigate(['/address'])
    )
  }

  changeAddress(modal){
    this.cartService.addressChange(this.province.value,this.city.value,
      this.district.value,this.postcode.value,
      this.first_name.value,
      this.last_name.value).subscribe(res => {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
            modal.close('Save click')
          });
      },error => console.log(error))
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  loadDataPay() {
    this.cartService.orderConfirmPrice().subscribe(data =>{
      this.OrderConfirmPrice = data;
      this.cartService.orderToPay(data).subscribe(res =>{
        this.OrderInfo = res;
      },error => console.log(error)
      );
    })
  }
payment(totalprice,mobile) {
  this.cartService.goToZrinpal(totalprice,mobile);
      const data = {
      'firstname':this.Address.first_name,
      'last_name':this.Address.last_name,
      'totalprice': this.OrderInfo.totalprice,
      'mobile':this.OrderInfo.mobile
    }
    localStorage.setItem('order',JSON.stringify(data))
}

}
