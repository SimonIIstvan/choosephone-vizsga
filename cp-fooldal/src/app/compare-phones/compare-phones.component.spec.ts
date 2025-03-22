import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePhonesComponent } from './compare-phones.component';

describe('ComparePhonesComponent', () => {
  let component: ComparePhonesComponent;
  let fixture: ComponentFixture<ComparePhonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparePhonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparePhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
