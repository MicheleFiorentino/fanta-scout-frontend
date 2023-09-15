import { Component, Inject } from '@angular/core';
import { Player } from 'src/app/interface/player';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent {
  players: Player[] = [];   //will contain only one player

  titles: string[] = [
    'Media',
    'Quotazione',
    'Crediti spesi in media (su 1000)',
    //gol fatti (striker) o concessi (gk)
    'Assist',
    'Partite',
    'Cartellini',
    'Rigori calciati',
    'Autogol'
  ]
  displayedColumns: string[][] = [
    ['standardMean','fantaMean'],
    ['quotationClassic','quotationMantra'],
    ['FVM1000Classic','FVM1000Mantra'],
    //colonne gol fatti o concessi
    ['assists'],
    ['playedMatches'],
    ['yellowCards','redCards'],
    ['totalShotsPenalty', 'scoredShotsPenalty'],
    ['autogoals']
  ]

  constructor(
    public dialogRef: MatDialogRef<PlayerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public player: Player,
  ) {}

  ngOnInit(){
    this.players.push(this.player)
    console.log(this.player.FVM1000Classic)
    if(this.player.role === 'p'){
      this.titles.splice(3, 0, 'Gol concessi');
      this.titles.splice(7,2);
      this.displayedColumns.splice(3,0,['goalsConceded','goalsConcededHome','goalsConcededAway']);
    } else {
      this.titles.splice(3, 0, 'Gol fatti');
      this.displayedColumns.splice(3,0,['goals','goalsHome','goalsAway']);
    }
  }

}
