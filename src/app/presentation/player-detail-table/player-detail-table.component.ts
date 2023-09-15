import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/interface/player';

@Component({
  selector: 'app-player-detail-table',
  templateUrl: './player-detail-table.component.html',
  styleUrls: ['./player-detail-table.component.scss']
})
export class PlayerDetailTableComponent {
  dataSource =  new MatTableDataSource<Player>();
  @Input() displayedColumns: string[] = [];
  @Input() players: Player[] = [];
  @Input() title = '';

  ngOnInit(){
    console.log(this.players[0])
    this.dataSource.data = this.players;
  }
}
