import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonecardComponent } from './phonecard.component';

describe('PhonecardComponent', () => {
  let component: PhonecardComponent;
  let fixture: ComponentFixture<PhonecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhonecardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
