import { Component, Input } from '@angular/core';
import { Player } from 'src/app/interface/player';

@Component({
  selector: 'app-player-detail-panel',
  templateUrl: './player-detail-panel.component.html',
  styleUrls: ['./player-detail-panel.component.scss']
})
export class PlayerDetailPanelComponent {
  @Input() player!: Player;
  playerImagePath?: string;
  squadImagePath?: string;
  playerRole?: string;

  ngOnInit(){
    this.playerImagePath = this.player.imagePath;
    this.squadImagePath = "https://www.drogbaster.it/loghi-squadre-calcio/" + this.player.team.toLocaleLowerCase() + ".png"

    switch(this.player.role){
      case 'p':
        this.playerRole = 'Portiere'
        break;
      case 'd':
        this.playerRole = 'Difensore'
        break;
      case 'c':
        this.playerRole = 'Centrocampista'
        break;
      case 'a':
        this.playerRole = 'Attaccante'
        break;
    }
  }
}
