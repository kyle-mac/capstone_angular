import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recommendation } from '../models/recommendation';
import { PRODUCTFEATURES } from '../models/productFeatures';
import { FinalResultApiService } from '../services/final-products-api.service';



@Component({
  selector: 'app-personal-recommendation',
  templateUrl: './personal-recommendation.component.html',
  styleUrls: ['./personal-recommendation.component.css']
})
export class PersonalRecommendationComponent implements OnInit, OnDestroy {

  personalListSubs: Subscription;
  recommendationList: Recommendation[];

  constructor(private finalProductApi: FinalResultApiService) { }

  ngOnInit() {
    this.personalListSubs = this.finalProductApi
      .getRecommendations()
      .subscribe(res => {
          this.recommendationList = res;
          console.log(this.recommendationList[0])
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.personalListSubs.unsubscribe();
  }

}
