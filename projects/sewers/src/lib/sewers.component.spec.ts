import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SewersComponent } from './sewers.component';

describe('SewersComponent', () => {
  let component: SewersComponent;
  let fixture: ComponentFixture<SewersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SewersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
