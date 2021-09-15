import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  pages : number[] = [];
  count : number;
  value : string;
  products : any;
  iconToggle:boolean=false;
  brands:string[];
  constructor( private service : ShopService, private route:ActivatedRoute,private router : Router) {
    this.route.queryParams.subscribe(params => {
      this.value = params.q;
      // this.initSeasons();
      this.getAllProduct(this.value);
    });
   }
  getAllProduct(value: string) {
    this.service.searchProduct(value).subscribe(res => {
      this.products = res;
      this.count = this.products.count;
      this.products = this.products.results;
      this.count =this.count / 3;
      this.pages = [...Array(this.count).keys()]
    })
  }

  ngOnInit(): void {
    this.initBrands()
  }
  initBrands() {
   this.brands = ['سامسونگ', 'اپل', 'نوکیا', 'الجی']
  }
  changeBrand(value){
    this.router.navigate(['search'],{ queryParams: {q:value}})
    // console.log(value)
  }

  getProductPagin(page){
   
    this.router.navigate(['search'],{ queryParams: {q: this.value , page: page}})
  
  }
  getProductOrdering(value){
    this.router.navigate(['category'],{ queryParams: {q: this.value  , ordering : value}})
  
  }

}
