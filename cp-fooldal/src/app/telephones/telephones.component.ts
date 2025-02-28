import { Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  filters: TermekSzuro[] = [];
  rendezesek: rendezesTipus[] | undefined;
  arSkala: number[] = [30000, 500000];
  error = '';

  kivalaszottRendezes: rendezesTipus | undefined;

  constructor(private telephonesService: TelephonesService) {}

  ngOnInit(): void {
    this.rendezesek = [
      { rendezes_tipus: 'Ár szerint növekvő' },
      { rendezes_tipus: 'Ár szerint csökkenő' },
      { rendezes_tipus: 'Megjelenési év szerint csökkkenő' },
      { rendezes_tipus: 'Megjelenési év szerint növekvő' }
    ]

    this.loadPhones();
    
  }

  loadPhones(): void {
    this.telephonesService.getPhones().subscribe({
      next: (phones) => {
        this.telephones = phones;
        console.log(phones)
      },
      error: (error) => {
        this.error = 'Hiba történt a telefonok betöltésekor';
        console.error(error);
      }
    });
  }

  


}
