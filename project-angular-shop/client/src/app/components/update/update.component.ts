import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public form2: FormGroup
  constructor( public dialogRef: MatDialogRef<UpdateComponent>,public fb: FormBuilder,public is:ItemsService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form2 = this.fb.group({
      item_name: [this.data.item_name, Validators.required],
      price: [this.data.price, Validators.required],
      image_url: [this.data.image_url, Validators.required]
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload()
  }

  // update item from item table by item id
  updateItem(update: NgForm){
    console.log(update.form.controls["price"].value);
    let formVal={"id":this.data.id,"item_name":update.form.controls["item_name"].value,"price":update.form.controls["price"].value,"image_url":update.form.controls["image_url"].value}
    this.is.updateItem(formVal).subscribe(
      err=>console.log(err)
    )
  } 
}

