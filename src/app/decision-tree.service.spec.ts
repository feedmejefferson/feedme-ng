import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DecisionTreeService } from './decision-tree.service';

describe('DecisionTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]  
  }));

  it('should be created', () => {
    const service: DecisionTreeService = TestBed.get(DecisionTreeService);
    expect(service).toBeTruthy();
  });
});
