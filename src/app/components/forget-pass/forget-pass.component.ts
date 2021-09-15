import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
   
  mobile = new FormControl('');
  message : string;
  showAlert : boolean = true;
  constructor(private auth : AuthService) { }

  send() {
    this.showAlert = true;
    this.auth
      .forgetPass(this.mobile.value);
      this.auth._getMessageForget().subscribe(res=>{
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
