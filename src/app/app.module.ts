import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './presentation/dashboard/dashboard.component';
import { MaterialDesignModule } from './material-design/material-design.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlayersTableComponent } from './presentation/players-table/players-table.component';
import { PlayerDetailComponent } from './presentation/player-detail/player-detail.component';
import { PlayerDetailTableComponent } from './presentation/player-detail-table/player-detail-table.component';
import { PlayerDetailPanelComponent } from './presentation/player-detail-panel/player-detail-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersTableComponent,
    PlayerDetailComponent,
    PlayerDetailTableComponent,
    PlayerDetailPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
