import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MendeleyComponent } from './mendeley.component';

describe('MendeleyComponent', () => {
  let component: MendeleyComponent;
  let fixture: ComponentFixture<MendeleyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MendeleyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MendeleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
