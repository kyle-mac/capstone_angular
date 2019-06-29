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
      this.featureList.push("You haven't selected any features yet!")
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
        this.featureList = this.featureList.filter(item => item !== "You haven't selected any features yet!");
        if (this.featureList.includes(feature)) {
           console.log("Feature already added");
        }
        else {
          this.featureList.push(feature)
        }
        console.log('Feature list is now ' + this.featureList);
      }

     clearFeatures() {
             console.log(5)
             this.featureList=[]
             this.featureList.push("You haven't selected any features yet!")
             console.log('Feature list');
           }
}
