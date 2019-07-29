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
            console.log('MFs: ' + this.MF)
            this.text = params['text'];
            console.log('Text: ' + this.text)
            this.feature = params['feature'];
            console.log('Features ' + this.feature)
        });

        this.MFListSubs = this.finalresultApi
                  .getFinalResults(this.MF)
                  .subscribe(res => {
                      this.MFList = res;
                      console.log(this.MFList)
                    },
                    console.error
                  );

         this.featureListSubs = this.finalresultApi
                   .getFinalResults(this.feature)
                   .subscribe(res => {
                       this.featureList = res;
                       console.log(this.featureList)
                     },
                     console.error
                   );

         this.textListSubs = this.finalresultApi
                   .getFinalResults(this.text)
                   .subscribe(res => {
                       this.textList = res;
                       console.log(this.textList)
                     },
                     console.error
                   );
    }
}
