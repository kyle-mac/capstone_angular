import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recommendation } from '../models/recommendation';
import { PRODUCTFEATURES } from '../models/productFeatures';
import { FinalResultApiService } from '../services/final-products-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-personal-recommendation',
  templateUrl: './personal-recommendation.component.html',
  styleUrls: ['./personal-recommendation.component.css']
})
export class PersonalRecommendationComponent implements OnInit {

  MFListSubs: Subscription;
  featureListSubs: Subscription;
  textListSubs: Subscription;
  MFList: Recommendation[];
  featureList: Recommendation[];
  textList: Recommendation[];
  MF: string;
  text: string;
  feature: string;

  constructor(private route: ActivatedRoute, private finalresultApi: FinalResultApiService) {}

    ngOnInit() {

        this.route.queryParams.subscribe(params => {
            this.MF = params['MF'];
            console.log(this.MF)
            this.text = params['text'];
            console.log(this.text)
            this.feature = params['feature'];
            console.log(this.feature)
        });

        this.personalListSubs = this.finalresultApi
                  .getFinalResults(this.MF)
                  .subscribe(res => {
                      this.recommendationList = res;
                      console.log(this.recommendationList[0])
                    },
                    console.error
                  );

    }

}
