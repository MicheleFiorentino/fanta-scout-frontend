import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailTableComponent } from './player-detail-table.component';

describe('PlayerDetailTableComponent', () => {
  let component: PlayerDetailTableComponent;
  let fixture: ComponentFixture<PlayerDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerDetailTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
