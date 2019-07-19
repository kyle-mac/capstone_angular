import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recommendation } from '../models/recommendation';
import { PRODUCTFEATURES } from '../models/productFeatures';
import { RecommendationApiService } from '../services/recommendations-api.service';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit , OnDestroy {

      recommendationListSubs: Subscription;
      recommendationList: Recommendation[];
      ProductFeatures = PRODUCTFEATURES;
      productList = [];
      featureList = [];
      productASINS = [];
      MFRec = [];
      FeatureRec = [];
      ProdRec = [];

      constructor(private recommendationApi: RecommendationApiService) {
      }

      ngOnInit() {
        this.productList.push("You haven't selected any products yet!")
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

      splitText(string) {
        return string.split(',');
        }

      saveProduct(product) {
          console.log('Clicked product was ' + product)
          this.productList = this.productList.filter(item => item !== "You haven't selected any products yet!");
          if (this.productList.includes(product)) {
             console.log("Product already added");
          }
          else {
            this.productList.push(product)
          }
          console.log('Product list is now ' + this.productList);
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

       clearProduct(product) {
           this.productList = this.productList.filter(item => item !== product);
        }

        clearFeature(feature) {
           this.featureList = this.featureList.filter(item => item !== feature);
        }

       clearFeatures() {
           this.featureList=[]
           this.productList=[]
           this.featureList.push("You haven't selected any features yet!")
           this.productList.push("You haven't selected any products yet!")
           console.log('Feature list');
       }

       storeData() {
            console.log(this.featureList)
            console.log(this.productList)
            this.recommendationListSubs = this.recommendationApi
              .getProductList(this.featureList, this.productList)
              .subscribe(res => {
                  this.productASINS = res;
                  console.log(this.productASINS)
                  return(this.productASINS)
                },
                console.error
              );
       }
}
