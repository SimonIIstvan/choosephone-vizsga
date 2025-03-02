import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TelephonesService } from '../telephones.service';
import { Telephone } from '../../models/telephone.model';
import { TermekSzuro } from '../../models/termek-szuro.model';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-phonecard',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './phonecard.component.html',
  styleUrl: './phonecard.component.css'
})
export class PhonecardComponent {
  @Input() phone!: Telephone;

  penz = 147000;
  telephones: Telephone[] = [];
  filters: TermekSzuro[] = [];
  error = '';

  constructor(private telephonesService: TelephonesService) {}

  selectTelephone() {
    this.telephonesService.setSelectedTelephone(this.phone);
  }

  
  
  

  
}
