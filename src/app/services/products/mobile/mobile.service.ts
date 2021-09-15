import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../../models/product";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  private accessToken = localStorage.getItem("accessToken");
  constructor(private http: HttpClient , private auth:AuthService) { }
  baseUrl = 'http://127.0.0.1:8000/admin/app/api';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  commonOption(): { params?: any, headers?: HttpHeaders } {
    if (!this.auth.loggedIn) {
      return {};
    }
    return {
      headers: new HttpHeaders({Authorization: `token ${this.auth.accessToken}`})
    };
  }

  getAllMobile(): Observable<any> {
    return this.http.get(this.baseUrl + '/Mobile/',this.commonOption());
  }
}
