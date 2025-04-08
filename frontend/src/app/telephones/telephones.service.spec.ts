import { TestBed } from '@angular/core/testing';

import { TelephonesService } from './telephones.service';

describe('TelephonesService', () => {
  let service: TelephonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelephonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
