import {Component, HostListener, ViewChild, Renderer2, AfterViewInit, ElementRef, OnInit} from '@angular/core';
// @ts-ignore
import { NavbarComponent } from "ng-uikit-pro-standard";
import {
  faUser,
  faSearch,
  faShoppingCart,
  faCaretDown,
  faCaretSquareDown,
  faCaretUp,
  faCaretSquareRight, faCaretSquareLeft,faBars,faHome,faIdCard,faSignInAlt, faLessThanEqual
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
// import { threadId } from 'worker_threads';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {
  public closeMenu = false;
  public isMenuCollapsed = false;
  public openDropdown = true;
  public isCollapsed1 = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  public isCollapsed5 = false;
  public isCollapsed6 = false;
  public isCollapsed7 = false;
  faCaret = faCaretSquareLeft;
  faSearch = faSearch
  caretdown = faCaretDown;
  caretUp= faCaretUp;
  faUser = faUser;
  faToggle = faBars;
  faHome = faHome;
  faCard = faIdCard;
  show : boolean = false;
  faSignIn = faSignInAlt;
  showMenu : boolean = false;
  searchValue = new FormControl();
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  constructor(private cartService:CartService,  public auth : AuthService ,private router : Router,private eRef: ElementRef,private renderer: Renderer2) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
       if(!this.toggleButton.nativeElement.contains(e.target) && !this.menu.nativeElement.contains(e.target)) {
        this.isMenuCollapsed=false;
    
     }
 }); 
 }
 toggleMenu() {
  this.isMenuCollapsed = !this.isMenuCollapsed;
}

  incrementClickOutsideCount() {
    if (this.isMenuCollapsed) {
      this.closeMenu = this.isMenuCollapsed;
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
    // else {
    //   this.closeMenu = this.isMenuCollapsed;
    //   this.isMenuCollapsed = !this.isMenuCollapsed;
    // }
    
    console.log(this.isMenuCollapsed);
    console.log(this.closeMenu)
  }
  ngOnInit(){
    this.router.events.subscribe(event =>{
       if (event instanceof NavigationStart){
        this.isMenuCollapsed = false;
        this.isCollapsed1 = false;
        this.isCollapsed2 = false;
        this.isCollapsed3 = false;
        this.isCollapsed4 = false;
        this.isCollapsed5 = false;
        this.isCollapsed6 = false;
        this.isCollapsed7 = false;

    
       }
    })
  }
  logout() {
    this.auth.logout();
    window.location.href = 'http://holitech.ir/'  ;
  }

  search(){
    this.router.navigate(['search'],{ queryParams: {q: this.searchValue.value}})  }
}
