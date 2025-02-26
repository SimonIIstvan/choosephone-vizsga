import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PhonecardComponent } from './phonecard/phonecard.component';

@Component({
  selector: 'app-telephones',
  imports: [ButtonModule, NavbarComponent, FooterComponent, PhonecardComponent],
  templateUrl: './telephones.component.html',
  styleUrl: './telephones.component.css'
})
export class TelephonesComponent {


}
