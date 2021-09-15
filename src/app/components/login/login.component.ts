import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message : string;
  showAlert : boolean=true;

  username = new FormControl('',[Validators.required
  ,Validators.pattern('(^09)[0-9]{9}$')
  ]);
  password = new  FormControl('');
  public caret = faCaretLeft
  constructor(public api :AuthService) { }

  ngOnInit(): void {
   
  }
  onLogin() {
    this.api
      .login(this.username.value, this.password.value);
      this.api._getMessage().subscribe(res=>{
        this.message = res;
        this.showAlert = true;
      })
  }
  logout() {
    this.api.logout();
  }

  fadeAlert(){
    setTimeout( () => {
          this.showAlert = false;
        }, 4000);
   }

}
