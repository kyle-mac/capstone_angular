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
export class PersonalRecommendationComponent implements OnInit, OnDestroy {

  personalListSubs: Subscription;
  recommendationList: Recommendation[];
  MF = [];
  text = [];
  feature = [];

  constructor(private route: ActivatedRoute) {}

    ngOnInit() {
       this.MF = this.route.snapshot.paramMap.get('MF');
       console.log(this.MF)
       this.text = this.route.snapshot.paramMap.get('text');
       console.log(this.text)
       this.feature = this.route.snapshot.paramMap.get('feature');
       console.log(this.feature)
    }


}
