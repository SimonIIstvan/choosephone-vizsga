import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import * as AOS from 'aos';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register-panel',
  imports: [NavbarComponent, RouterLink, FooterComponent],
  templateUrl: './register-panel.component.html',
  styleUrl: './register-panel.component.css'
})
export class RegisterPanelComponent {
  

}
