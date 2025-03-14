import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import * as AOS from 'aos';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-panel',
  imports: [NavbarComponent, RouterLink, FooterComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register-panel.component.html',
  styleUrl: './register-panel.component.css'
})
export class RegisterPanelComponent {
  username: string = '';
  password: string = '';
  passwordAgain: string = '';

  constructor(private authService: AuthService) { }


  register() {
    if (this.password === this.passwordAgain) {
      this.authService.register(this.username, this.password).subscribe(
        () => {
          alert('Sikeres regisztráció!');
          this.username = '';
          this.password = '';
          this.passwordAgain = '';
        },
        error => {
          alert('Sikertelen regisztráció!');
        }
      );
    } else {
      alert('A jelszök nem egyeznek!');
    }
  }

}
