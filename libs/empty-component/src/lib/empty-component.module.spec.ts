import { async, TestBed } from '@angular/core/testing';
import { EmptyComponentModule } from './empty-component.module';

describe('EmptyComponentModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmptyComponentModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EmptyComponentModule).toBeDefined();
  });
});
