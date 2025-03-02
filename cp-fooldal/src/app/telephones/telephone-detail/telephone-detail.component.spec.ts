import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneDetailComponent } from './telephone-detail.component';

describe('TelephoneDetailComponent', () => {
  let component: TelephoneDetailComponent;
  let fixture: ComponentFixture<TelephoneDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelephoneDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelephoneDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
