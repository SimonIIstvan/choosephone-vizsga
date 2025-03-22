import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-panel',
  imports: [NavbarComponent, RouterLink, FooterComponent, FormsModule],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.css'
})
export class LoginPanelComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  login() {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        alert('Sikeres bejelentkezés!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Hiba a bejelentkezéskor:', error);
      },
    );
  }


}
