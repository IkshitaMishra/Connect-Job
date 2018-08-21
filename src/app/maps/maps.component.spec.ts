import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { mapsComponent } from './maps.component';

describe('mapsComponent', () => {
  let component: mapsComponent;
  let fixture: ComponentFixture<mapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ mapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(mapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
