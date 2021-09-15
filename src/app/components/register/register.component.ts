import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message : string;
  showAlert : boolean = true;
  mobile = new FormControl('');
  constructor(private auth : AuthService) { }

  register() {
    this.showAlert = true;
    this.auth
      .getPhone(this.mobile.value);
      this.auth._getMessageReg().subscribe(res=>{
        this.message = res;
       
      }); 
  }

  ngOnInit(): void {
 
  }
 fadeAlert(){
  setTimeout( () => {
        this.showAlert = false;
      }, 2000);
 }
}
