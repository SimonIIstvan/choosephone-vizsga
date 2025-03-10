import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import * as AOS from 'aos';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-main-page',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent  {
  
}
