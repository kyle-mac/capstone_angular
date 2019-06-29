import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CategoryApiService } from './services/category-api.service';
import { RecommendationApiService } from './services/recommendations-api.service';



@NgModule({
  declarations: [
    AppComponent,
    RecommendationsComponent,
    HomeComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {path:'home', component: HomeComponent},
      {path:'recommendations',component: RecommendationsComponent},
      {path:'searchResults',component: SearchResultsComponent}

    ])
  ],
  providers: [CategoryApiService, RecommendationApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
