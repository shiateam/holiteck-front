import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  pages : number[] = [];
  count : number;
  favoriteSeason: string;
  iconToggle:boolean=false;
  seasons: string[] = [];
  category :any;
  products :any;
  brand : number;
  filterdProducts : any;
  _brandFilter :string;
  get brandFilter() : string {
    return this._brandFilter;
  }
  set brandFilter (value:string){
    this._brandFilter = value;
  }
  constructor( private service : ShopService, private route:ActivatedRoute,private router : Router) {
    this.route.queryParams.subscribe(params => {
      this.category = params;
      this.initSeasons();
      this.getAllProduct(this.category)

    });
   }



  ngOnInit(): void {

 
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'تومان';
    }

    return value;
  }
  initSeasons() {
    if (this.category.product ==='Mobile') {
      this.seasons = ['sumsong', 'apple', 'هواوی', 'شیایومی']
    }
    else  this.seasons = ['سامسونگ', 'اپل', 'نوکیا', 'الجی']
  }
  getAllProduct(category) {
    this.service.getAllCategoris(category).subscribe(data => {
 
        this.products = data.results;
        this.count = data.count;
        this.count =this.count / 3;
        this.pages = [...Array(this.count).keys()]
    },
    error => {this.products = []} );
  }
  changeBrand(value){
    this.router.navigate(['category'],{ queryParams: {product: this.category.product, brand: value}})
    // console.log(value)
  }
  performfilter(listFilter: string) {
    return this.products.filter(product => product.brand.indexOf(listFilter) !== -1)
  }

getProductPagin(page){
  this.router.navigate(['category'],{ queryParams: {product: this.category.product, brand: this.category.brand , page: page}})

}
getProductOrdering(value){
  // this.category.ordering = value;
  this.router.navigate(['category'],{ queryParams: {product: this.category.product, brand: this.category.brand , ordering : value}})

}
}
