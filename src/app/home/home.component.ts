import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '../models/categories';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  categories = CATEGORIES;

  ngOnInit() {
  }

}
