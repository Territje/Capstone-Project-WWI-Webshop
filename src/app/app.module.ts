import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';
import { DataService } from "./data.service";

import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component'
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ContactComponent,
    AboutComponent
  ],
  bootstrap: [AppComponent],
  providers: [DataService]
})

export class AppModule {
 }
