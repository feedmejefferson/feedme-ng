import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RandomChoiceService } from './random-choice.service';

describe('RandomChoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: RandomChoiceService = TestBed.get(RandomChoiceService);
    expect(service).toBeTruthy();
  });
});
