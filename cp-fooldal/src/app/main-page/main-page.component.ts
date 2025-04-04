import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import * as AOS from 'aos';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-main-page',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit  {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }
  
}
