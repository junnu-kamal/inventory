import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { API_END_POINT } from '../app.constants';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css']
})
export class OrderBookComponent implements OnInit {
  public total = 0;
  constructor(public dialogRef: MatBottomSheetRef<OrderBookComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public cart: any[],private _http: HttpClient,){}
  ngOnInit(): void {
    this.cart.forEach((item : any)=>{
      this.total +=  item.sell_price * item.quantity
    })
  }

  completeOrder(){
    let data = this.cart.map((item)=>{
      return {
        "product": item.id,
        "quantity": item.quantity,
      }
    })
    this._http.post( API_END_POINT + "core/orders/",data).subscribe({
      next : (products : any)=>{
        this.dialogRef.dismiss();
      },
      error : ()=>{

      },
    })
  }
}
