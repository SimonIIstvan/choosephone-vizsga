import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { Tooltip, TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-compare-phones',
  imports: [CommonModule, NavbarComponent, ProgressBarModule, ProgressBar, ButtonModule, TooltipModule],
  templateUrl: './compare-phones.component.html',
  styleUrl: './compare-phones.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ComparePhonesComponent implements OnInit {
  phone1: any;
  phone2: any;
  comparisonResults: any[] = [];
  private apiUrl = 'http://localhost:3000';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id1 = +this.route.snapshot.paramMap.get('telephoneId1')!;
    const id2 = +this.route.snapshot.paramMap.get('telephoneId2')!;

    forkJoin([
      this.http.get(`${this.apiUrl}/telephones/${id1}`),
      this.http.get(`${this.apiUrl}/telephones/${id2}`)
    ]).subscribe(([phone1Data, phone2Data]) => {
      this.phone1 = phone1Data;
      this.phone2 = phone2Data;
      console.log(this.phone1);
      console.log("--------------")
      console.log(this.phone2);
      
    });
  }




  bar1 = {
    value: {
      background: '#b05febea'
    }
  }

  bar2 = {
    value: {
      background: '#ff8c00'
    }
  }


}
