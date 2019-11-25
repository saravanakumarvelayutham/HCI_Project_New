import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventdialogComponent } from './addeventdialog.component';

describe('AddeventdialogComponent', () => {
  let component: AddeventdialogComponent;
  let fixture: ComponentFixture<AddeventdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeventdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeventdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
