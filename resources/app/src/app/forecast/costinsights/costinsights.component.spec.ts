import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostinsightsComponent } from './costinsights.component';

describe('CostinsightsComponent', () => {
  let component: CostinsightsComponent;
  let fixture: ComponentFixture<CostinsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostinsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
