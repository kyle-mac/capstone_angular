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
    one = [];


    constructor(private categoryApi: CategoryApiService) {
    }

    ngOnInit() {
      this.one.push("one")
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
