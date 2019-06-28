import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CategoryApiService } from './services/category-api.service';
import { Category } from './models/category';
import { OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'capstone-app';
    categoriesListSubs: Subscription;
    categoriesList: Category[];

    constructor(private categoryApi: CategoryApiService) {
    }

    ngOnInit() {
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
