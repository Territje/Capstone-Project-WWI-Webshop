import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Alledata, Item } from './fullDataSet';
import { CartItem } from './cartItem';

@Injectable({ providedIn: 'root' })


export class DataService {

    private _url: string = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';
    private _itemsData: any;
    public alles: Alledata;
    public cartItems: CartItem[] = [];
    public totAsNum: Number;

    messageService: any;
    public kees: string = "";

    constructor(
        private http: HttpClient
    ) { }

    //GR 8.10: Data was accessed using the Azure Web API and not a local file 
    public getData() {
        return new Observable((observer) => {
            if(!this.alles) {
            this._itemsData = this.http
                .get(this._url)
                .subscribe(
                    (result) => {
                        this.alles = {categories : result} as Alledata;
                        console.log('new data');
                        observer.next(this.alles);
                        return observer.complete();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
            else {
                console.log('old data');
                observer.next(this.alles);
                return observer.complete();
            }
        });
    }

    public getItem(_itemName){
        let ret : Item;
        this.alles.categories.forEach(function(category,i){
            category.subcategories.forEach(function(subcategory,i){
                subcategory.items.forEach(function(item,i){
                    if(item.name == _itemName)
                        ret = item;
                })
            })
        });
        return ret;   
    }

    //GR 2.17: Clicking on the “Add” button inside a grid cell should add 1 unit of the  associated product to the shoppingcart
    //GR 3.10: Clicking the “Add” button should add the number of units specified in the “Qty” input field of the selected product to the shopping cart
    public addToCart(_newItem, _qty){
        let newItem = {imagelink: _newItem.imagelink, name: _newItem.name, price: _newItem.price, qty: Number(_qty)};
        let alreadyInCart = false;
        this.cartItems.forEach((cartItem) => {
            if(cartItem.name == newItem.name) {
                cartItem.qty += newItem.qty; 
                alreadyInCart = true;
            }
        });
        if (!alreadyInCart)
            this.cartItems.push(newItem);
    }

    public totalItemsInCart() {
        let _total = 0;
        this.cartItems.forEach((cartItem) => {
            _total += Number(cartItem.qty);
        });
        return _total.toString();
    }

    //GR 4.9: The cost column in the table should update if the quantity input field is changed
    public qtyChange(_cartItem, _value){
        this.cartItems.forEach((cartItem) => {
            if(cartItem.name == _cartItem.name && _value > -1)
            cartItem.qty = _value; 
        });
    }

    //GR 4.8: The remove button should remove an item from the shopping cart
    public removeFromCart(_cartItem){
        let newArray: CartItem [] = [];
        this.cartItems.forEach((cartItem) => {
            if(cartItem.name != _cartItem.name)
                newArray.push(cartItem); 
        });
        this.cartItems = newArray;
    }

    //GR 4.7: The cost details section should update if any items are removed from the shopping cart of if any of the item quantities are updated
    //GR 4.9: The cost column in the table should update if the quantity input field is changed
    public cartSubTotal= function(){
        let subtot = 0;
        this.cartItems.forEach((cartItem) => {
            subtot +=  (cartItem.qty * cartItem.price); 
        });
        return (Number((Math.round(subtot * 100) / 100).toFixed(2)));
    };

    //GR 4.7: The cost details section should update if any items are removed from the shopping cart of if any of the item quantities are updated
    public alertTotal= function() {
        this.totAsNum = (Number(this.cartSubTotal())*1.1).toFixed(2);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`DataService: ${message}`);
    }

}