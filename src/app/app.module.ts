// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Libraries
import { NgMendeleyModule } from 'ng-mendeley';

// Application
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { OverviewModule } from './overview';
import { MendeleyModule } from './mendeley';
import { PageNotFoundModule } from './page-not-found';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgMendeleyModule,
    AppMaterialModule,
    OverviewModule,
    MendeleyModule,
    PageNotFoundModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
