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

interface rendezesTipus {
  rendezes_tipus: string;
}

@Component({
  selector: 'app-telephones',
  imports: [ButtonModule, NavbarComponent, FooterComponent, PhonecardComponent, ScrollPanelModule, SelectModule, Select, FormsModule, SliderModule],
  templateUrl: './telephones.component.html',
  styleUrl: './telephones.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TelephonesComponent implements OnInit {

  rendezesek: rendezesTipus[] | undefined;
  arSkala: number[] = [30000, 500000];

  kivalaszottRendezes: rendezesTipus | undefined;

  ngOnInit(): void {
    this.rendezesek = [
      { rendezes_tipus: 'Ár szerint növekvő' },
      { rendezes_tipus: 'Ár szerint csökkenő' },
      { rendezes_tipus: 'Megjelenési év szerint csökkkenő' },
      { rendezes_tipus: 'Megjelenési év szerint növekvő' }
    ]
  }

  


}
