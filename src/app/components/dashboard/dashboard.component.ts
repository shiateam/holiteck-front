import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  labale:number=1;
  ProcessingOrder:any;
  SendedOrder: any;
  DeliveredOrder : any;
  firstName = new FormControl();
  lastName = new FormControl();
  mobile = new FormControl();
  OrderInfo: any;
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
  constructor(private route:ActivatedRoute, private cartService : CartService, private auth : AuthService , private router : Router,private modalService: NgbModal ) {
 
   }

  ngOnInit(): void {
    this.getProcessingOrder();
    this.getSendedOrder();
    this.getDeliveredOrder();
    this.addressUser();
  }
  getProcessingOrder(){
    this.auth.getProcessingOrder().subscribe(res => {
    this.ProcessingOrder = res;
    console.log(res)
    })
  };
  getSendedOrder(){
    this.auth.getSendedOrder().subscribe(res => {
    this.SendedOrder = res;
    })
  }
  getDeliveredOrder(){
    this.auth.getDeliveredOrder().subscribe(res => {
    this.DeliveredOrder = res;
    console.log(res)
    })
  }
  addressUser(){

    return this.cartService.addressUser().subscribe(res=>{
      console.log(res)
      // if(!res.length) this.router.navigate(['/address']);
      this.Address = res;
      console.log(this.Address)
    },error => this.Address = {})
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
  logout() {
    this.auth.logout();
    window.location.href = 'http://holitech.ir'  ;
  }
}
