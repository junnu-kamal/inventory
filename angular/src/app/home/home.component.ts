import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_END_POINT } from '../app.constants';
import { mergeMap } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OrderBookComponent } from '../order-book/order-book.component';
import { MatDialog } from '@angular/material/dialog';
import { QuantityBoxComponent } from '../quantity-box/quantity-box.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  public cart:any[]= [];
  public products : any[] = [];
  public originalProducts : any[] = [];
  constructor(
    private _http: HttpClient,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog ){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._http.get( API_END_POINT + "core/products/").subscribe({
      next : (products : any)=>{
        this.originalProducts = [...products];
        this.products = products
      },
      error : ()=>{},
    })
  }

  increaseQty(product: any){
    if(product.quantity){
      product.quantity++;
    }
    else{
      product.quantity = 1;
    }
  }
  decreaseQty(product: any){
    if(product.quantity){
      product.quantity--;
    }
  }

  openOrderBook(){
    let bottomSheet = this._bottomSheet.open(OrderBookComponent, { data : this.cart})
    bottomSheet.afterDismissed().subscribe((data) => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  onQtyChange(product : any){
    let productIndexInCart = this.cart.findIndex((item : any)=>{ return item.id ===  product.id})
    if(product.quantity > 0){
      if(productIndexInCart > -1){
        this.cart[productIndexInCart] = product;
      }
      else{
        this.cart.push(product)
      }
    }
    else{
      if(productIndexInCart > -1){
        this.cart.splice(productIndexInCart,1)
      }
    }
  }

  refresh(){
    if(confirm("Are you sure want to refresh order book?")){
      this.cart.map((item)=>{ item.quantity = null; return item; });
      this.cart = [];
    }
  }
}
