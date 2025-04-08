import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import * as AOS from 'aos';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'cp-fooldal';

  constructor(private router: Router, private cd: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    AOS.init({
      once: false, // Az animációk többször is lejátszódhatnak
      duration: 1000
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          AOS.refresh(); // Frissíti az AOS-t minden navigáció után
        }, 100); // Kis késleltetés, hogy a DOM biztosan betöltődjön
      }
    });

      this.authService.getMe().subscribe((user) => {
        if (user) {
          console.log('Bejelentkezve:', user);
        }
      },
      (error) => {
        console.error('Hiba a bejelentkezéskor vagy nincs bejelentkezve:', error);
      });

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.refreshAOS();
  }

  private refreshAOS(): void {
    AOS.refresh();
  }

  ngOnDestroy(): void {
    AOS.refreshHard();
  }
  
}

