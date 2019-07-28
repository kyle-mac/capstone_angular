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

    options = ['Action Figures & Statues',
              'Games',
              'Stuffed Animals & Plush',
              'Hobbies',
              'Dolls & Accessories',
              'Toy Remote Control & Play Vehicles',
              'Toys & Games',
              'Party Supplies',
              'Arts & Crafts',
              'Sports & Outdoor Play',
              'Puzzles',
              'Learning & Education',
              'Novelty & Gag Toys',
              'Building Toys',
              'Grown-Up Toys',
              'Dress Up & Pretend Play',
              'Electronics for Kids',
              'Baby & Toddler Toys',
              'Tricycles, Scooters & Wagons']

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
