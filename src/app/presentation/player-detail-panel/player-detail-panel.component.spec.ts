import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailPanelComponent } from './player-detail-panel.component';

describe('PlayerDetailPanelComponent', () => {
  let component: PlayerDetailPanelComponent;
  let fixture: ComponentFixture<PlayerDetailPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerDetailPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
