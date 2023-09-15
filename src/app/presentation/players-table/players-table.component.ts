import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/business-logic/dashboard/dashboard.service';
import { Player } from 'src/app/interface/player';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss']
})
export class PlayersTableComponent{
  @Input() players: Player[] = [];
  @Input() position: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  dataSource =  new MatTableDataSource<Player>();
  displayedColumns: string[] = [];
  selectedRowIndex: number = -1;

  displayedPropertiesMovementPlayers: string[] =
    ['imagePath', 'name', 'team', 'playedMatches', 'goals', 'assists', 'yellowCards', 'redCards', 'fantaMean', 'fvm1000Classic', 'fav'];

  displayedPropertiesGoalkeepers: string[] =
    ['imagePath', 'name', 'team', 'playedMatches', 'goalsConceded', 'assists', 'yellowCards', 'redCards', 'fantaMean', 'fvm1000Classic', 'fav'];

  constructor(
    private service: DashboardService,
    private dialog: MatDialog
    ) { }

  ngOnInit(){
    this.displayedColumns =
      (this.position === 'p')? this.displayedPropertiesGoalkeepers : this.displayedPropertiesMovementPlayers;
    this.dataSource.data = this.players;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['players']){
      this.dataSource.data = this.players.sort(compareByPlayerName);
    }
  }

  onFavClick(player: Player, event: Event){
    event.stopPropagation(); // Stop the event propagation
    if(!player.isFavourite){
      this.service.addPlayerToFavorites(player.name).subscribe(mex => {
        console.log(mex)
      })
    } else {
      this.service.removePlayerFromFavorites(player.name).subscribe(mex => {
        console.log(mex)
      })
    }
    player.isFavourite = !player.isFavourite;
  }

  onRowClicked(row: Player){
    this.openPlayerDialog(row);
  }

  openPlayerDialog(player: Player): void {
    const dialogRef = this.dialog.open(PlayerDetailComponent, {
      data: player
    });

    dialogRef.afterClosed().subscribe(result => {
      //placeholder: operations after dialog has been closed
    });
  }
}

function compareByPlayerName(a: Player, b: Player): number {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}
