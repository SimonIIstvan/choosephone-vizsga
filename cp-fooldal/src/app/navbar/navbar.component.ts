import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterOutlet, AvatarModule, MenuModule],
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
export class NavbarComponent implements OnInit {
  isNavbarOpened = false;
  isLoggedIn = false;
  userMonogram: string = "";
  username: string = "";
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService) { }

  toggleNavbar(): void {
    this.isNavbarOpened = !this.isNavbarOpened;
  }

  ngOnInit(): void {
    this.authService.getMe().subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userMonogram = user.username.slice(0, 2);
        this.username = user.username;
        console.log("Bejelentkezési állapot:", this.isLoggedIn);
      }
    },
      (error) => {
        console.error('Nem vagy bejelentkezve!', error);
      });

    this.items = [
      {
        label: "Profil",
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh'
          },
          {
            label: 'Kijelentkezés',
            icon: 'pi pi-sign-out'
          }
        ]
      }
    ];

  }





}
