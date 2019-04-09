import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2EditComponent } from './step2.component';

describe('Step2Component', () => {
  let component: Step2EditComponent;
  let fixture: ComponentFixture<Step2EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
