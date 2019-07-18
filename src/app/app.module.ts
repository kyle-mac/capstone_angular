import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list'
import {MatGridListModule} from '@angular/material/grid-list';

import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryApiService } from './services/category-api.service';
import { RecommendationApiService } from './services/recommendations-api.service';
import { FinalResultApiService } from './services/final-products-api.service';
import { AboutComponent } from './about/about.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { PersonalRecommendationComponent } from './personal-recommendation/personal-recommendation.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RecommendationsComponent,
    HomeComponent,
    AboutComponent,
    ProductSearchComponent,
    PersonalRecommendationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {path:'home', component: HomeComponent},
      {path:'about', component: AboutComponent},
      {path:'recommendations',component: RecommendationsComponent},
      {path:'productSearch',component: ProductSearchComponent},
      {path:'personalRecommendation',component: PersonalRecommendationComponent}
    ])
  ],
  providers: [CategoryApiService, RecommendationApiService, FinalResultApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
