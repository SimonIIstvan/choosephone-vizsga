import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PhonecardComponent } from './phonecard/phonecard.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectModule } from 'primeng/select';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { Telephone } from '../models/telephone.model';
import { TermekSzuro } from '../models/termek-szuro.model';
import { TelephonesService } from './telephones.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface rendezesTipus {
  rendezes_tipus: string;
}

@Component({
  selector: 'app-telephones',
  imports: [ButtonModule, NavbarComponent, FooterComponent, PhonecardComponent, ScrollPanelModule, SelectModule, Select, FormsModule, SliderModule, CommonModule],
  templateUrl: './telephones.component.html',
  styleUrl: './telephones.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TelephonesComponent implements OnInit {
  telephones: Telephone[] = [];
  filter: TermekSzuro = {};
  rendezesek: rendezesTipus[] | undefined;
  arSkala: number[] = [40000, 510000];
  minPrice: number = 0;
  maxPrice: number = 0;
  error = '';


  kivalaszottRendezes: rendezesTipus | undefined;

  constructor(private telephonesService: TelephonesService, private http: HttpClient) { }

  ngOnInit(): void {
    this.rendezesek = [
      { rendezes_tipus: 'Ár szerint növekvő' },
      { rendezes_tipus: 'Ár szerint csökkenő' },
      { rendezes_tipus: 'Megjelenési év szerint csökkkenő' },
      { rendezes_tipus: 'Megjelenési év szerint növekvő' }
    ]

    this.loadTelephones();
  }


  loadTelephones(): void {
    this.telephonesService.getTelephones(this.filter).subscribe((data: Telephone[]) => {
      this.telephones = data;
      this.calculateMinMaxPrice();

    },
      (error) => {
        this.error = "Hiba történt!:", error;
      }
    );

  }

  


  calculateMinMaxPrice(): void {
    if (this.telephones.length === 0) {
      this.minPrice = 0;
      this.maxPrice = 0;
      return;
    }

    // Inicializáljuk a változókat az első telefon árával
    this.minPrice = this.telephones[0].ar;
    this.maxPrice = this.telephones[0].ar;

    // Végigmegyünk a többi telefonon és frissítjük a min/max értékeket
    for (const phone of this.telephones) {
      if (phone.ar < this.minPrice) {
        this.minPrice = phone.ar;
      }
      if (phone.ar > this.maxPrice) {
        this.maxPrice = phone.ar;
      }
    }
  }


}
