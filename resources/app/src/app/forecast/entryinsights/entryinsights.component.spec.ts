import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryinsightsComponent } from './entryinsights.component';

describe('EntryinsightsComponent', () => {
  let component: EntryinsightsComponent;
  let fixture: ComponentFixture<EntryinsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryinsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
