import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  code = new FormControl();
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    
  }

  sendCode(){
    const mobile = localStorage.getItem('mobile')
    this.auth.sendVerifyCode(mobile,this.code.value)
  }

}
