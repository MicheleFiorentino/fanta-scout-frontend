import { Component, OnInit, ElementRef, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Player } from 'src/app/interface/player';
import { DashboardService } from 'src/app/business-logic/dashboard/dashboard.service';
import { concatMap } from 'rxjs/operators';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild('input') input?: ElementRef;
  seasons: string[] = ['2022-23','2023-24']
  selectedSeason = this.seasons[1];
  loading = false;
  spinnerValue = 0;
  spinnerValueBackground = 100;
  spinnerMode: ProgressSpinnerMode = 'determinate';

  favsName: String[] = [];
  areFavsSelected: boolean = false;
  players: Player[] = [];

  goalkeepers: Player[] = [];
  defenders: Player[] = [];
  midfielders: Player[] = [];
  strikers: Player[] = [];

  filteredGoalkeepers: Player[] = [];
  filteredDefenders: Player[] = [];
  filteredMidfielders: Player[] = [];
  filteredStrikers: Player[] = [];

  positions: string[] = ['p','d','m','s'];

  constructor(
    private service: DashboardService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.getScrapedPlayers();
  }

  getScrapedPlayers(){
    this.loading = true;
    this.createSpinnerEventSource();

    //clean arrays
    this.players = [];
    this.goalkeepers = [];
    this.defenders = [];
    this.midfielders = [];
    this.strikers = [];

    //get Players
    this.service
      .getFavouritesPlayersUrl()
      .pipe(
        concatMap((favs) => {
          this.favsName = favs;
          // Now, chain the scrapeAllPlayersInfo request
          return this.service.scrapeAllPlayersInfo(this.selectedSeason);
        })
      )
      .subscribe((players) => {
        this.players = players;
        for (let player of players) {
          player.isFavourite = (this.favsName.includes(player.name));
          switch (player.role) {
            case 'p':
              this.goalkeepers.push(player);
              break;
            case 'd':
              this.defenders.push(player);
              break;
            case 'c':
              this.midfielders.push(player);
              break;
            case 'a':
              this.strikers.push(player);
              break;
          }
        }
        // Convert to array
        this.filteredGoalkeepers = [...this.goalkeepers];
        this.filteredDefenders = [...this.defenders];
        this.filteredMidfielders = [...this.midfielders];
        this.filteredStrikers = [...this.strikers];

        this.loading = false;
        this.spinnerValue = 0;
        this.destroySpinnerEventSource();
      });
  }

  applyFilter(event: Event) {
    let toFilterGoalkeepers;
    let toFilterDefenders;
    let toFilterMidfielders;
    let toFilterStrikers;

    if(this.areFavsSelected){
      toFilterGoalkeepers = this.goalkeepers.filter(player => player.isFavourite).map(player => ({ ...player }));
      toFilterDefenders = this.defenders.filter(player => player.isFavourite).map(player => ({ ...player }));
      toFilterMidfielders = this.midfielders.filter(player => player.isFavourite).map(player => ({ ...player }));
      toFilterStrikers = this.strikers.filter(player => player.isFavourite).map(player => ({ ...player }));
    } else {
      toFilterGoalkeepers = this.goalkeepers
      toFilterDefenders = this.defenders
      toFilterMidfielders = this.midfielders
      toFilterStrikers = this.strikers
    }

    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredGoalkeepers = toFilterGoalkeepers.filter(player => {
      return player.name.toLocaleLowerCase().includes(filterValue)
    });
    this.filteredDefenders = toFilterDefenders.filter(player => {
      return player.name.toLocaleLowerCase().includes(filterValue)
    });
    this.filteredMidfielders = toFilterMidfielders.filter(player => {
      return player.name.toLocaleLowerCase().includes(filterValue)
    });
    this.filteredStrikers = toFilterStrikers.filter(player => {
      return player.name.toLocaleLowerCase().includes(filterValue)
    });
  }

  onSeasonChange(){
    this.input!.nativeElement.value = ''; //reset search
    this.areFavsSelected = false; //reset checkbox
    this.getScrapedPlayers();
  }

  toggleFavs(){
    this.input!.nativeElement.value = ''; //reset search
    if(this.areFavsSelected){
      // Deep copy the filtered players with isFavourite set to true
      this.filteredGoalkeepers = this.goalkeepers.filter(player => player.isFavourite).map(player => ({ ...player }));
      this.filteredDefenders = this.defenders.filter(player => player.isFavourite).map(player => ({ ...player }));
      this.filteredMidfielders = this.midfielders.filter(player => player.isFavourite).map(player => ({ ...player }));
      this.filteredStrikers = this.strikers.filter(player => player.isFavourite).map(player => ({ ...player }));
    } else {
      // Reset the filtered arrays to include all players
      this.filteredGoalkeepers = [...this.goalkeepers];
      this.filteredDefenders = [...this.defenders];
      this.filteredMidfielders = [...this.midfielders];
      this.filteredStrikers = [...this.strikers];
    }
  }

  createSpinnerEventSource(){
    this.service.createEventSource()
    .subscribe(data => {
      this.spinnerValue += 5;
      console.log(this.spinnerValue)
      this.cdr.detectChanges(); //to trigger manually the changes to spinner
    })
  }

  destroySpinnerEventSource(){
    this.service.destroyEventSource();
  }
}
