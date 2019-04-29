import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../data.service";
import { Alledata, Category, Subcategories, Item } from '../fullDataSet';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})

export class ShoppingComponent implements OnInit {

  public currentCat: Category;
  public currentSubCat: Subcategories;
  public currentItem: Item;
  public showingLine: string = "";
  public stock: boolean = true;
  public sortType: string = "";

  constructor(
    public _dataService: DataService,
    private _route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit() {
    this._dataService.getData().subscribe(
      (data) => {
        this._route.queryParams.subscribe(params => {
          if(params.category && params.subcategory)
            this.setCatSubCat(params.category, params.subcategory);
      });
    });
  }

  //GR 2.12: Clicking on a categoryname in the category menu should toggle a dropdown of the available subcategories within that category
  public setCurrentCategory(_category) {
    this.currentCat = _category;
    this.currentSubCat = null;
    //GR 3.11 Clicking the “Back” button should take the user back to where they came from, whether it was the Shopping page or the Product Page
    this.router.navigate([], { queryParams: {category: this.currentCat.category, subcategory: ""} });
    this.showingLine =  "Showing  " + _category.subcategories.length + " of " + _category.subcategories.length + " subcategories in " + _category.category;
  }
  
  //GR 2.13: Clicking on a subcategory should repopulate the grid of products with items from the subcategory that was just clicked
  public setCatSubCat(cat, subcat){
    let deze = this;
    if (this._dataService.alles && this._dataService.alles.categories){
      this._dataService.alles.categories.forEach(function(_category){
        if(_category.category == cat) {
          deze.currentCat = _category;
          _category.subcategories.forEach(function(subcategory){
            if(subcategory.name == subcat)
              deze.currentSubCat = subcategory;
          });
        }
      });
    }
  } 

  //GR 2.19: If the user clicks on a product name within a grid cell, they should be taken to a product page that is populated with the details of the clicked product
  public setCurrentItem(_item) {
    this.currentItem = _item;
  }

  //GR 2.16: If the “In Stock Only” toggle is checked, only items that are in stock should be shown in the products grid
  public onlyStock(checked){
    this.stock = checked;
    let deze = this;
    this.showingLine = "Showing " + this.currentSubCat.items.filter(function(e){return deze.stock == false || (e.stock > 0);}).length + " of " + deze.currentSubCat.items.length + " items in " + deze.currentSubCat.name;
  }

  //GR 2.13: Clicking on a subcategory should repopulate the grid of products with items from the subcategory that was just clicked
  public showProducts(_subCategory, $event) {
    $event.stopPropagation();
    this.currentSubCat = _subCategory;
    //GR 3.11 Clicking the “Back” button should take the user back to where they came from, whether it was the Shopping page or the Product Page
    this.router.navigate([], { queryParams: {category: this.currentCat.category, subcategory: this.currentSubCat.name} });
    this.selectSort(this.sortType);
    this.onlyStock(this.stock);
  }

  //GR 2.20: Changing the selected sorting method should reorder the products in the grid
  public selectSort(val) {
    this.sortType = val;
    switch (val)
    {
      case '1':
      this.currentSubCat.items = this.currentSubCat.items.sort(function(a,b){return Number(a.price) > Number(b.price) ? 1: -1;});
      break;
      case '2':
      this.currentSubCat.items = this.currentSubCat.items.sort(function(a,b){return a.name > b.name ? 1: -1;});
      break;
      case '3':
      this.currentSubCat.items = this.currentSubCat.items.sort(function(a,b){return Number(a.rating) < Number(b.rating) ? 1: -1;});
      break;
    }
  }

}
