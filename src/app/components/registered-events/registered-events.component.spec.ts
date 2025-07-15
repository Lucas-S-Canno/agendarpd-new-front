import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredEventsComponent } from './registered-events.component';

describe('RegisteredEventsComponent', () => {
  let component: RegisteredEventsComponent;
  let fixture: ComponentFixture<RegisteredEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
