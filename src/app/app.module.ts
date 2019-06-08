import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { RouterModule, Routes} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RecommendationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'about', component: AboutComponent},
      {path:'recommendations',component: RecommendationsComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
