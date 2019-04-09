import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessinsightsComponent } from './businessinsights.component';

describe('BusinessinsightsComponent', () => {
  let component: BusinessinsightsComponent;
  let fixture: ComponentFixture<BusinessinsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessinsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
