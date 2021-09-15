import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { data } from 'jquery';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl = 'http://api.holitech.ir';
  // baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  public loggedIn = false;
  public accessToken: string;
  private message: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private messageReg: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private messageCode: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private messageForget: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // private orderDetails = new Subject();
  _setMessage(msg) {
    this.message.next(msg);
  }

  _getMessage(): Observable<any> {
    return this.message;
  }
  _setMessageReg(msg) {
    this.messageReg.next(msg);
  }

  _getMessageReg(): Observable<any> {
    return this.messageReg;
  }
  _setMessageCode(msg) {
    this.messageCode.next(msg);
  }

  _getMessageCode(): Observable<any> {
    return this.messageCode;
  }
  _setMessageForget(msg) {
    this.messageForget.next(msg);
  }

  _getMessageForget(): Observable<any> {
    return this.messageForget;
  }
  constructor(private http: HttpClient,private router:Router , private route :ActivatedRoute) {
    this.accessToken = localStorage.getItem('accessToken');
    this.loggedIn = this.accessToken !== null;
  }
  commonOption(): { params?: any, headers?: HttpHeaders } {
    if (!this.loggedIn) {
      return {};
    }
    return {
      headers: new HttpHeaders({Authorization: `Token ${this.accessToken}`})
    };
  }
  login(username: string, password: string) {
    const userData = {
      username,
      password,
    };
    return this.http.post(this.baseUrl + '/admin/app/api/Usermanagement/login/', userData, this.commonOption())
      .subscribe((response: any) => {
       
        this.loggedIn = true;
        this.accessToken = response.token;
        localStorage.setItem('accessToken', this.accessToken);
        console.log(response);
        this.router.navigate(['/'] ,{ relativeTo: this.route } )
        // window.location.href = 'http://holitech.ir'
       
      }, (error => {
        this.logout();
        console.log(error);
        this._setMessage('شماره موبایل یا رمز عبور نادرست است')
           
      }));

  }
  getPhone(mobile){
    const Data = {
      mobile,
    };
    return this.http.post(this.baseUrl + '/admin/app/api/Usermanagement/getphone/',Data, {headers : this.httpHeaders})
    .subscribe((res:any)=>{
      localStorage.setItem('mobile',mobile.toString()); 
      this.router.navigate(['/verify-code']);   
    },(error) => {
      console.log(error);
      this._setMessageReg('شما در گذشته ثبت نام کرده اید')
    })
  };
  forgetPass(mobile: any) {
    const Data = {
      mobile,
    };
    return this.http.post(this.baseUrl + '/admin/app/api/Usermanagement/forgetpass/',Data, {headers : this.httpHeaders})
    .subscribe((res:any)=>{
      localStorage.setItem('mobile',mobile.toString()); 
      this.router.navigate(['/verify-code']);   
    },(error) => {
      console.log(error);
      this._setMessageForget('شما در گذشته ثبت نام نکرده اید')    })
  };
  sendVerifyCode(mobile,code){
    const Data = {
      mobile,
      code
    };
    return this.http.post(this.baseUrl + '/admin/app/api/Usermanagement/userverify/',Data, {headers : this.httpHeaders})
    .subscribe((res:any)=>{
      localStorage.removeItem('mobile'); 
      this.loggedIn = true;
      this.accessToken = res.token;
      localStorage.setItem('accessToken', this.accessToken);
      console.log(res);
      this.router.navigate(['/'] ,{ relativeTo: this.route } )
      // window.location.href = 'http://holitech.ir'   
    },(error) => {
      console.log(error);
      this._setMessageCode('  کد وارد شده صحیح نمی باشد ')
    })
  };
  logout() {
    this.loggedIn = false;
    this.accessToken = null;
    localStorage.removeItem("accessToken")
  }


  // tslint:disable-next-line:variable-name
  register(username: string, first_name: string, last_name: string, email: string, password: string){
    const userData = {
      username,
      first_name,
      last_name,
      email,
      password,
    };
    return this.http.post(this.baseUrl + 'admin/app/api/Usermanagement/', userData, this.commonOption());
  }
  getProcessingOrder():Observable<any>{
    return this.http.get (this.baseUrl + '/admin/app/api/Usermanagement/ProcessingOrder/' , this.commonOption())
  }
  getSendedOrder():Observable<any>{
    return this.http.get (this.baseUrl + '/admin/app/api/Usermanagement/SendedOrder/' , this.commonOption())
  }
  getDeliveredOrder():Observable<any>{
    return this.http.get (this.baseUrl + '/admin/app/api/Usermanagement/DeliveredOrder/' , this.commonOption())
  }
}
