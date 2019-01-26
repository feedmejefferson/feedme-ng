import { TestBed } from '@angular/core/testing';

import { AppetiteService } from './appetite.service';

describe('AppetiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppetiteService = TestBed.get(AppetiteService);
    expect(service).toBeTruthy();
  });
});
