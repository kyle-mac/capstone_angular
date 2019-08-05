import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recommendation } from '../models/recommendation';
import { PRODUCTFEATURES } from '../models/productFeatures';
import { RecommendationApiService } from '../services/recommendations-api.service';
import { ActivatedRoute } from '@angular/router';


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
      textProds = [];
      MFProds = [];
      featureProds = [];
      keywords: string;
      category: string;

      constructor(private recommendationApi: RecommendationApiService, private route: ActivatedRoute) {
      }

      ngOnInit() {

        this.productList.push("You haven't selected any products yet!")

        this.route.queryParams.subscribe(params => {
            this.keywords = params['keywords'];
            this.category = params['category'];
            console.log(this.keywords)
            console.log(this.category)
            console.error
                });

        this.featureList = (this.keywords.split(' '))
        this.featureList = this.featureList.map(function(x) { return ("'"+x+"'"); });

        this.recommendationListSubs = this.recommendationApi
          .getRecommendations(this.keywords, this.category)
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
        console.log('Split string is' + string.split(','))
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
                  this.MFProds = this.productASINS['MFProds'];
                  this.featureProds = this.productASINS['featureProds'];
                  this.textProds = this.productASINS['textProds'];
                  console.log(this.productASINS)
                  console.log(this.MFProds)
                  console.log(this.featureProds)
                  console.log(this.textProds)
                  return(this.productASINS)
                },
                console.error
              );
       }
}
