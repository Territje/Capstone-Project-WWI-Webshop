import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    public _dataService: DataService
  ) { }

  ngOnInit(): void {
    this._dataService.getData()
    .subscribe(
      (data) => {   
        //GR 1.11: Whenever the product carousel changes it slide, it should do in an animated way
        (<any>$("#myCarousel")).carousel("cycle");   
    });

  }

  //GR 1.10: If the “Toggle Slide Show” switch is checked, the product carousel should automatically move forward one slide every 3 seconds
  public toggleSlide (val){
    if(val)
    (<any>$("#myCarousel")).carousel("cycle");
    else
    (<any> $("#myCarousel")).carousel("pause");
  }

}
