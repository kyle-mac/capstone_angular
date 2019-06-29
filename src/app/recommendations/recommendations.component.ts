import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recommendation } from '../models/recommendation';
import { PRODUCTFEATURES } from '../models/productFeatures';
import { RecommendationApiService } from '../services/recommendations-api.service';



@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})

export class RecommendationsComponent implements OnInit , OnDestroy {

    recommendationListSubs: Subscription;
    recommendationList: Recommendation[];
    ProductFeatures = PRODUCTFEATURES;
    featureList = [];

    constructor(private recommendationApi: RecommendationApiService) {
    }

    ngOnInit() {
      this.recommendationListSubs = this.recommendationApi
        .getRecommendations()
        .subscribe(res => {
            this.recommendationList = res;
            console.log(this.recommendationList[0])
          },
          console.error
        );
    }

    ngOnDestroy() {
      this.recommendationListSubs.unsubscribe();
    }

    saveFeature(feature) {
        console.log('Clicked feature was ' + feature)
        this.featureList.push(feature)
        console.log('Feature list is now ' + this.featureList);
      }

     presentFeatures(){
        return this.featureList
     }
}
