import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppetiteService } from './appetite.service';

describe('AppetiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]  
  }));  

  it('should be created', () => {
    const service: AppetiteService = TestBed.get(AppetiteService);
    expect(service).toBeTruthy();
  });
});
