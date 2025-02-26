import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-phonecard',
  imports: [CommonModule],
  templateUrl: './phonecard.component.html',
  styleUrl: './phonecard.component.css'
})
export class PhonecardComponent {
  penz = 147000;

}
