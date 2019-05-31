import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFairComponent } from './create-fair.component';

describe('CreateFairComponent', () => {
  let component: CreateFairComponent;
  let fixture: ComponentFixture<CreateFairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
