import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotFoundComponent } from './bot-found.component';

describe('BotFoundComponent', () => {
  let component: BotFoundComponent;
  let fixture: ComponentFixture<BotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
