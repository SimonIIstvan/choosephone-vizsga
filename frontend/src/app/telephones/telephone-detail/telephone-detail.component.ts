import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Telephone } from '../../models/telephone.model';
import { TelephonesService } from '../telephones.service';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-telephone-detail',
  imports: [CommonModule, NavbarComponent, AnimateOnScrollModule],
  templateUrl: './telephone-detail.component.html',
  styleUrl: './telephone-detail.component.css'
})
export class TelephoneDetailComponent implements OnInit, AfterViewInit {
  phone: Telephone | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private phoneService: TelephonesService
  ) { }

  ngAfterViewInit() {
    AOS.init();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.phoneService.getTelephoneById(id);
      })
    ).subscribe({
      next: (phone) => {
        this.phone = phone;
        this.loading = false;
      },
      error: (err) => {
        console.error('Hiba történt a telefon betöltése közben', err);
        this.error = true;
        this.loading = false;
      }
    });

    AOS.init({
      duration: 850,
      delay: 200,
      once: true
    });
  }


}
