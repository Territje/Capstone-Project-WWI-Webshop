import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../fullDataSet';
import { DataService } from "../data.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  public _item: Item;
  private _qty: string = "1";

  constructor(
    private _route: ActivatedRoute,
    private _dataService: DataService
  ) { }

  //GR 3.11 Clicking the “Back” button should take the user back to where they came from, whether it was the Shopping page or the Product Page
  ngOnInit(): void {
    this._dataService.getData().subscribe(() => {
      this._route.queryParams.subscribe(params => {
        this._item = this._dataService.getItem(params.name);
      });
    });
  }

}
