import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login-panel',
  imports: [NavbarComponent, RouterLink, FooterComponent],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.css'
})
export class LoginPanelComponent implements OnInit {
  ngOnInit(): void {
    AOS.init({
      duration: 850,
      delay: 200,
    });
  }

  ngAfterViewInit(): void {
    this.refreshAOS();
  }

  private refreshAOS(): void {
    AOS.refresh();
  }


}
