import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TelephonesService } from '../telephones.service';
import { Telephone } from '../../models/telephone.model';
import { TermekSzuro } from '../../models/termek-szuro.model';

@Component({
  selector: 'app-phonecard',
  imports: [CommonModule],
  templateUrl: './phonecard.component.html',
  styleUrl: './phonecard.component.css'
})
export class PhonecardComponent {
  @Input() phone!: Telephone;
  penz = 147000;
  telephones: Telephone[] = [];
  filters: TermekSzuro[] = [];
  error = '';
  
  

  
}
