import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterOutlet, AvatarModule, MenuModule, ToastModule],
  providers: [MessageService],
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

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

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
            label: 'Kijelentkezés',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      }
    ];

  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      console.log("Kijelentkezés");
      
    }); 

    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'Sikeres kijelentkezés', detail: 'Sikeresen kijelentkeztél a fiókodból!', life: 5000 });  
    }, 1000)

    setTimeout(() => {
      this.router.navigate(['/bejelentkezes']);
    }, 3500)

    
  }





}
