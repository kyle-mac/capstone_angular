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

    options = [
    'Baby & Toddler Toys',
    'Fan Shop',
    'Tricycles, Scooters & Wagons',
    'Electronics for Kids',
    'Dress Up & Pretend Play',
    'Grown-Up Toys',
    'Novelty & Gag Toys',
    'Learning & Education',
    'Puzzles',
    'Sports & Outdoors Play',
    'Arts & Crafts',
    'Pary Supplies',
    'Toy Remote Control & Play Vehicles',
    'Dolls & Accessories',
    'Hobbies',
    'Stuffed Animals & Plush',
    'Games'];

    optionSelected: any;

    onOptionsSelected(event){
     console.log(event); //option value will be sent as event
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
