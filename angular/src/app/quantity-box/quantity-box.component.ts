import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quantity-box',
  templateUrl: './quantity-box.component.html',
  styleUrls: ['./quantity-box.component.css']
})
export class QuantityBoxComponent implements OnInit {
  public quantity = 1;
  constructor(
    public dialogRef: MatDialogRef<QuantityBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
   this.quantity =  this.data.product.quantity ? this.data.product.quantity : 0
  }

  close(){
    this.dialogRef.close(this.quantity)
  }
}
