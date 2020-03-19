import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',  
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public form2: FormGroup
  constructor( public dialogRef: MatDialogRef<AddComponent>,public fb: FormBuilder,public is:ItemsService) { }

  ngOnInit() {
    const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this.form2 = this.fb.group({
      item_name: ["", Validators.required],
      category_id: ["",Validators.required],
      price: ["", [Validators.required,Validators.pattern(numericNumberReg)]],
      image_url: ["", Validators.required]
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // add new item to items table
  addNewItem(form2){
   let form2Val=this.form2.value
   console.log(form2Val)
  this.is.addNewItem(form2Val).subscribe(
    err=>console.log(err)
  )
  }

}
