import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, timer } from 'rxjs';
import { concatAll, retryWhen, delayWhen } from 'rxjs/operators';
import { Player } from 'src/app/interface/player';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8080/fantascout/scraper/';
  private favsUrl = 'http://localhost:8080/fantascout/scraper/players/favourites';
  private sseUrl = 'http://localhost:8080/fantascout/scraper/sse';
  private eventSource?: EventSource;

  constructor(private http: HttpClient) {}

  scrapeAllPlayersInfo(season: string): Observable<Player[]>{
    const allUrl = this.url.concat("squads/" + season);
    return this.http.get<Player[]>(allUrl, { responseType: 'json' }).pipe(
        retryWhen(errors => errors.pipe(delayWhen(() => timer(3000))))
    );
  }

  getFavouritesPlayersUrl(): Observable<String[]>{
    return this.http.get<String[]>(this.favsUrl, { responseType: 'json' }).pipe(
      retryWhen(errors => errors.pipe(delayWhen(() => timer(3000))))
  );
  }

  addPlayerToFavorites(playerName: string): Observable<any> {
    return this.http.post(this.favsUrl, playerName, { responseType: 'text' });
  }

  removePlayerFromFavorites(playerName: string): Observable<any> {
    return this.http.delete(`${this.favsUrl}?playerName=${playerName}`, { responseType: 'text' });
  }

  createEventSource(): Observable<string>{
    this.eventSource = new EventSource(this.sseUrl);

    return new Observable(observer => {
      this.eventSource!!.onmessage = event => {
        observer.next(event.data);
      }
    });
  }

  destroyEventSource(){
    this.eventSource!!.close();
  }
}
