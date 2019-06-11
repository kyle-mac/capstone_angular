import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-products';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  products = PRODUCTS;


  ngOnInit() {
  }

}
