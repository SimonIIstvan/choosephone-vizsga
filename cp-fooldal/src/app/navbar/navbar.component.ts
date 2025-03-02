import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '50.8rem',
        opacity: 1
      })),
      state('closed', style({
        height: '0',
        opacity: 0
      })),
      transition('open <=> closed', [animate('0.8s ease-in-out')])
    ])
  ]
  
})
export class NavbarComponent {
  isNavbarOpened = false;

  toggleNavbar(): void {
    this.isNavbarOpened = !this.isNavbarOpened;
  }
  
}
