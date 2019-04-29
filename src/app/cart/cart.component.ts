import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from '../fullDataSet';
import { DataService } from '../data.service';
import * as $ from "jquery";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  public form: FormControl;
  public _item: Item;

  constructor(
    public _dataService: DataService
  ) {this.form = new FormControl();  }

  ngOnInit() { 
  }

  //GR 4.5: The checkout button should create an alert based on the users shipping details and total cost
  //GR 4.6 The form should showvalidation errors if the form isn’t filled out correctly and the checkout button is pressed
  submitAlert() {
    let allGood = true;
    $(".validationWarning").hide();

    if($("#name").val() == "") {
        $("#name").siblings(".validationWarning").show();
        allGood = false;
    }

    if($("#address").val() == "") {
      $("#address").siblings(".validationWarning").show();
      allGood = false;
    }

    if($("#zity").val() == "") {
      $("#zity").siblings(".validationWarning").show();
      allGood = false;
    }

    if($("#phone").val() == "") {
      $("#phone").siblings(".validationWarning").show();
      allGood = false;
    }

    if (allGood){
      this._dataService.alertTotal();
      alert('Thanks for shopping with us, ' + $('#name').val() + '\r' +
        'The total cost is $' + this._dataService.totAsNum + '\r' +
        'Your order will be shipped to:\r' +
        $('#address').val() + '\r' +
        $('#zity').val());
    }
  }

}