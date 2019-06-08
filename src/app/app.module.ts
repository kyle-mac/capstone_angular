import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { RouterModule, Routes} from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RecommendationsComponent,
    SearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'home', component: HomeComponent},
      {path:'about', component: AboutComponent},
      {path:'recommendations',component: RecommendationsComponent},
      {path:'search',component: SearchComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
