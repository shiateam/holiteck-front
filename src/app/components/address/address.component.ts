import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  province = new FormControl();
  city = new FormControl();
  district = new FormControl();
  postcode = new FormControl();
  firstName = new FormControl();
  lastName = new FormControl();
  constructor(private service:CartService,private router : Router,private location: Location ) { }

  ngOnInit(): void {
  }
  createAddress(){
    this.service.createAddress(this.province.value,this.city.value,
      this.district.value,this.postcode.value,
      this.firstName.value,
      this.lastName.value).subscribe(res =>{
      // this.router.navigate(['/check-out/'])
      this.location.back();
    }, error =>
    console.log(error))
  }
}
