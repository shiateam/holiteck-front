import {Component, OnInit, ViewChildren} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {MobileService} from "../../../services/products/mobile/mobile.service";
import {Mobile} from "../../../models/category/mobile";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent  {

}
