import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  title = 'cp-fooldal';

  ngOnInit(): void {
      AOS.init({
        duration: 850,
        delay: 200,
        once: false
      });
    }
  
    ngAfterViewInit(): void {
      // Ha a komponens újra láthatóvá válik
      AOS.refresh();
    }
  
    private refreshAOS(): void {
      AOS.refresh();
    }
  
    ngOnDestroy(): void {
      AOS.refreshHard();
    }
  
}

