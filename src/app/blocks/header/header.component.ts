import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  toolbarStyle: boolean;
  isMobile: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) 
  {
   if(window.innerWidth > 800){
	   	this.isMobile = false;
   }else{
	   	this.isMobile = true;
   }
  }

  ngOnInit() {
  }
  
  @HostListener("window:scroll", [])
	onWindowScroll() {
		if(window.scrollY > 0){
			this.toolbarStyle = true;
		}
		if(window.scrollY == 0){
			this.toolbarStyle = false;
		}
	}
}

