import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DrawerModule } from 'primeng/drawer';
import * as AOS from 'aos';
import { CompareService } from '../services/compare.service';
import { Router } from '@angular/router';

interface rendezesTipus {
  rendezes_tipus: string;
}

@Component({
  selector: 'app-telephones',
  imports: [ButtonModule, NavbarComponent, PhonecardComponent,
    ScrollPanelModule, SelectModule, Select, FormsModule, SliderModule, CommonModule, MultiSelectModule, InputNumberModule, AccordionModule, PanelModule,
    CheckboxModule, RadioButtonModule, DrawerModule],
  templateUrl: './telephones.component.html',
  styleUrl: './telephones.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TelephonesComponent implements OnInit, AfterViewInit, OnDestroy {
  compareList: any[] = [];
  isCompareListEmpty: boolean = true;
  hamburgerOpen: boolean = false;
  telephones: Telephone[] = [];
  filter: TermekSzuro = {};
  rendezesek: rendezesTipus[] | undefined;
  arSkala: number[] = [0, 1000000];
  minPrice: number = 0;
  maxPrice: number = 0;
  error = '';

  /* Szűrőkhöz szükséges tárolók */

  markak: string[] = [];
  kivalasztottMarkak: string[] = [];

  megjelenesEvMin: number = 2008;
  megjelenesEvMax: number = 2025;

  tarhely: number[] = [];

  ram: number[] = [];

  magok: number[] = [];

  os: string = '';

  kijelzoMeret: number[] = [];

  kepfrissites: number[] = [];
  
  foKamera: number[] = [];
  szelfiKamera: number[] = [];
  videoFelvetel: number[] = [];

  akkumulatorKapacitas: number[] = [];
  toltes: number[] = [];

  kivalaszottRendezes: rendezesTipus | undefined;

  constructor(private telephonesService: TelephonesService, private compareService: CompareService, private router: Router) { }

  ngAfterViewInit() {
    AOS.refreshHard();
  }

  ngOnInit(): void {
    this.rendezesek = [
      { rendezes_tipus: 'Ár szerint növekvő' },
      { rendezes_tipus: 'Ár szerint csökkenő' },
      { rendezes_tipus: 'Megjelenési év szerint csökkkenő' },
      { rendezes_tipus: 'Megjelenési év szerint növekvő' }
    ]







    this.telephonesService.getAllTelephones().subscribe((data: Telephone[]) => {
      data.forEach(phone => {
        if (!this.markak.includes(phone.marka)) {
          this.markak.push(phone.marka);
        }
      })
    })

    this.loadCompare();

    this.loadTelephones();
    AOS.refreshHard();
  }

  removeFromCompare(telephoneId: number) {
    this.compareService.removeFromCompare(telephoneId).subscribe(() => {
      this.loadCompare();
    })


  }

  onCompareClick() {
    const selectedPhones = this.compareService.getSelectedPhones();
    if (selectedPhones.length === 2) {
      this.router.navigate(['/compare', selectedPhones[0], selectedPhones[1]]);
    }
    else{
      alert('Kérlek, válassz ki pontosan két telefont az összehasonlításhoz!');
    }

    console.log(selectedPhones);

  }

  loadCompare() {
    this.compareService.getCompare().subscribe((data: any) => {
      if (data) {
        this.isCompareListEmpty = false;
        this.compareList = data;
      }
    });
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

  /* Jobbról balra átadás a szűrőnek */
  gombKattintas() {
    /* Márka alapján szűrés */
    this.filter.markak = this.kivalasztottMarkak;

    /* Ár alapján szűrés */
    if (this.arSkala[0] !== this.minPrice || this.arSkala[1] !== this.maxPrice) {
      this.filter.minAr = this.arSkala[0];
      this.filter.maxAr = this.arSkala[1];
    }

    /* Megjelenési év alapján szűrés */
    if (this.megjelenesEvMin !== 2008 || this.megjelenesEvMax !== 2025) {
      this.filter.minMegjelenesEv = this.megjelenesEvMin;
      this.filter.maxMegjelenesEv = this.megjelenesEvMax;
    }


    /* Tárhely alapján szűrés */
    if (this.tarhely.length !== 0) {
      this.filter.tarhely = this.tarhely;
      this.tarhely = [];
    }

    /* Memória alapján szűrés */
    if (this.ram.length !== 0) {
      if (this.ram.find((ram) => ram <= 4)) {
        this.ram.push(1, 2, 3);
      }

      if (this.ram.find((ram) => ram >= 12)) {
        this.ram.push(14, 16, 24, 32);
      }

      this.filter.ram = this.ram;
      this.ram = [];
      console.log(this.filter.ram);
    }

    /* Magok alapján szűrés */
    if (this.magok.length !== 0) {
      if (this.magok.find((mag) => mag == 2)) {
        this.magok.push(1)
      }

      if (this.magok.find((mag) => mag == 4)) {
        this.magok.push(2, 3)
      }

      if (this.magok.find((mag) => mag == 8)) {
        this.magok.push(5, 6, 7)
      }

      if (this.magok.find((mag) => mag == 16)) {
        this.magok.push(9, 10, 11, 12, 13, 14, 15)
      }
    }


    this.filter.magok = [...new Set(this.magok)];
    this.magok = [];


    /* Kijelző méret alapján szűrés */
    if (this.kijelzoMeret.length !== 0) {
      if (this.kijelzoMeret.find((meret) => meret == 5.5)) {
        this.kijelzoMeret.push(5.6, 5.7, 5.8, 5.9, 6, 6.1)
        
      }

      if (this.kijelzoMeret.find((meret) => meret == 6.2)) {
        this.kijelzoMeret.push(6.3, 6.4)
      }

      if (this.kijelzoMeret.find((meret) => meret == 6.5)) {
        this.kijelzoMeret.push(6.6, 6.7)
      }

      if (this.kijelzoMeret.find((meret) => meret == 6.7)) {
        this.kijelzoMeret.push(6.8, 6.9, 7)
      }
    }

    this.filter.kijelzoMeret = [...new Set(this.kijelzoMeret)];
    this.kijelzoMeret = [];
    console.log(this.filter.kijelzoMeret);


    /* Képfrissítés alapján szűrés */
    if (this.kepfrissites.length !== 0) {
      this.filter.kepfrissites = this.kepfrissites;
      this.kepfrissites = [];
    }

    /* Előlapi kamera alapján szűrés */
    if (this.foKamera.length !== 0) {
      this.filter.foKamera = this.foKamera;
      this.foKamera = [];
    }

    /* Előlapi kamera alapján szűrés */
    if (this.szelfiKamera.length !== 0) {
      this.filter.szelfiKamera = this.szelfiKamera;
      this.szelfiKamera = [];
    }

    /* Videófelvétel alapján szűrés */
    if (this.videoFelvetel.length !== 0) {
      this.filter.videoFelvetel = this.videoFelvetel;
      this.videoFelvetel = [];
      
    }

    /* Akkumulátorkapacitás alapján szűrés */
    if (this.akkumulatorKapacitas.length !== 0) {
      this.filter.akkumulatorKapacitas = this.akkumulatorKapacitas;
      this.akkumulatorKapacitas = [];
      
    }

    /* Töltés alapján szűrés */
    if (this.toltes.length !== 0) {
      this.filter.toltes = this.toltes;
      this.toltes = [];
      
    }
      

    if (this.os.length !== 0) {
      this.filter.operaciosRendszer = this.os;
      this.os = '';
    }


    this.loadTelephones();
  }



  /* --- PrimeNG komponens dizánjnok --- */

  elrendezes = {
    overlay: {
      background: "#9200FF",
    }

  }

  arCsuszka = {
    rangeBackground: "#9200FF",
    trackSize: "5px",
    trackBackground: "#9000ff60",

  }


  /* Compare listával kapcs... */
  isCompareOpened: boolean = false;

  openCompareList() {
    this.isCompareOpened = !this.isCompareOpened;
    this.loadCompare();
  }


  ngOnDestroy(): void {
    AOS.refreshHard();
  }


}
