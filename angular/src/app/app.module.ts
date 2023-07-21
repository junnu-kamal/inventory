import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { QuantityBoxComponent } from './quantity-box/quantity-box.component';

const routes : Routes = [
  {
    path :'',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path :'login',
    component : LoginComponent
  },
  {
    path :'home',
    component : HomeComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OrderBookComponent,
    QuantityBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents:[
    OrderBookComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
