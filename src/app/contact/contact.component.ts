import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  public form: FormGroup;
  public name = new FormControl('');
  public email = new FormControl('');
  public message = new FormControl('');

  public sortType: string = "";

  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
  }

  public selectSort(val) {
    this.sortType = val;
  }

  //GR 5.5: The form should show validation errors if the form isn’t filled out correctly and the send button is pressed
  submitAlert() {
    let allGood = true;
    $(".validationWarning").hide();

    if($("#name").val() == "") {
        $("#name").siblings(".validationWarning").show();
        allGood = false;
    }
   
    if($("#email").val() == "") {
      $("#email").siblings(".validationWarning").show();
      allGood = false;
    }

    if($("#subject").val() == "0") {
      $("#subject").siblings(".validationWarning").show();
      allGood = false;
    }

    if($("#message").val() == "") {
      $("#message").siblings(".validationWarning").show();
      allGood = false;
    }

    //GR 5.4: The sendbutton should create an alert based on the message sent
    if (allGood){
    alert('Thanks for your message about ' + $("#subject").val() + ', ' + $("#name").val()  + '\r' +
          'We will get back to you at ' + $("#email").val() +' as soon as we can.'  + '\r\r' +
          'Your message:'  + '\r' +
          $("#message").val());
    }
  }
}