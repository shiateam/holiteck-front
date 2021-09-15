import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import {Product} from "../models/product";
import {AuthService} from "./auth/auth.service";
import { CategoryComponent } from '../components/category/category.component';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  Products : Product;
  private accessToken = localStorage.getItem('accessToken');
  constructor(private http: HttpClient,private auth:AuthService ) { }
  baseUrl = 'http://www.api.holitech.ir/admin/app/api';
  // baseUrl = 'http://127.0.0.1:8000/admin/app/api';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  commonOption(): { params?: any, headers?: HttpHeaders } {
    if (!this.auth.loggedIn) {
      return {};
    }
    return {
      headers: new HttpHeaders({Authorization: `token ${this.auth.accessToken}`})
    };
  }
getAllCategoris(category): Observable<any> {
  let params;
    if (category.brand !=undefined) {
      params = new HttpParams().set('search',category.brand).set('offset',category.page).set('ordering' , category.ordering)
      return this.http.get(this.baseUrl + '/Mobile'  ,{params} );
    }
    params = new HttpParams().set('offset',category.page).set('ordering' , category.ordering);
    return this.http.get(this.baseUrl + '/' + category.product  , {params});
  }
getAllProducts(): Observable<Product> {
  return this.http.get<Product>(this.baseUrl + '/home/', this.commonOption());
}

getOneProduct(code):Observable<Product> {
  // const param = new HttpParams().set('code',code)
  return this.http.post<Product>(this.baseUrl + '/Detail/detailpro/', {code: code },this.commonOption()) ;

}
searchProduct(value: string): Observable<Product> {
  return this.http.get<Product>(this.baseUrl + '/home/?search=' + value, this.commonOption());

}
getProductPagin(params): Observable<any> {

  if (params.brand !=undefined) {
    return this.http.get(this.baseUrl + '/Mobile?search=' + params.brand + '&offset=' + params.page  , this.commonOption() , );
  }
  return this.http.get(this.baseUrl + '/' + params.product + '&offset=' + params.page  , this.commonOption());
}
newestproducts():Observable<any> {
  return this.http.get<any>(this.baseUrl + '/home/newestproducts', this.commonOption())
}
highestcountsell():Observable<any> {
  return this.http.get<any>(this.baseUrl + '/home/highestcountsell', this.commonOption())
}
}
