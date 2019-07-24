import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../models/category';
import { SUBCATEGORIES } from '../models/subcategories';
import { CategoryApiService } from '../services/category-api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , OnDestroy {

    categoriesListSubs: Subscription;
    categoriesList: Category[];
    subcategories = SUBCATEGORIES;
    searchTerms = [];
    selection: string

    options = [
    'Toys & Games',
    'Baby & Toddler Toys',
    'Bath Toys',
    'Spinning Tops',
    'Music & Sound',
    'Tricycles',
    'Scooters & Wagons',
    'Ride-On Toys',
    'Push & Pull Toys',
    'Hammering & Pounding Toys',
    'Rattles',
    'Activity Play Centers',
    'Balls',
    'Crib Toys & Attachments',
    'Stuffed Animals & Toys',
    'Car Seat & Stroller Toys',
    'Blocks',
    'Stuffed Animals & Toys',
    'Indoor Climbers & Play Structures',
    'Stacking & Nesting Toys',
    'Shape Sorters',
    'Balance Bikes',
    'Baby & Toddler Toys',
    'Clothing',
    'Shoes & Jewelry',
    'Boys',
    'Clothing',
    'Novelty',
    'Costumes & More',
    'Costumes & Accessories',
    'Costumes',
    'Kids & Baby',
    'Boys',
    'Teaching Clocks',
    'Baby & Toddler Toys',
    'Toys & Games',
    'Ride-On Toys',
    'Clothing',
    'Luggage & Travel Gear',
    'Backpacks',
    'Kids' Backpacks',
    'Rocking & Spring Ride-Ons'];


    optionSelected: any;

    onOptionsSelected(event){
     console.log(event); //option value will be sent as event
     this.selection = event
     console.log(this.selection);
    }

    constructor(private categoryApi: CategoryApiService) {
    }

    ngOnInit() {
      this.searchTerms.push("one")
      this.categoriesListSubs = this.categoryApi
        .getCategories()
        .subscribe(res => {
            this.categoriesList = res;
          },
          console.error
        );
    }

    ngOnDestroy() {
      this.categoriesListSubs.unsubscribe();
    }

}
