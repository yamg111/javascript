import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { RxwebValidators, email } from "@rxweb/reactive-form-validators"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {
  public form: FormGroup
  public form2: FormGroup
  public tab: boolean = true
  public numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  public users: any
  public cityDrop = [
    { id: 1, name: "Ashdod" }, { id: 2, name: "Bait-Dagan" }, { id: 3, name: "Givatayim" }, { id: 4, name: "Hifa" }, { id: 5, name: "Lod" }, { id: 6, name: "Nahariya" }, { id: 7, name: "Or-Yehoda" }, { id: 8, name: "Rishon-Lezion" }, { id: 9, name: "Tel-Aviv" }, { id: 10, name: "Tverya" }
  ]
  constructor(public fb: FormBuilder, public us: UsersService, public router: Router) { }
  
  ngOnInit() {

    // defining form
    this.form = this.fb.group({
      id: ["", [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(this.numericNumberReg)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      passwordVal: ["", [Validators.required, Validators.minLength(4), RxwebValidators.compare({ fieldName: 'password' })]]
    })
    this.form2 = this.fb.group({
      city: ["", Validators.required],
      street: ["",[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      name: ["", Validators.required],
    })
    this.getUsers()
  }

  getUsers(){
      this.users =[this.us.usersInfo().subscribe(
        res => {
        this.users = res
        },
        err => console.log(err)
      )]
  }

//chacking if id/email alredy exist
// TODO fix tab jumping 
  register1(form) {
      if (this.users && this.form.value) {
        console.log(this.form.value.email);
        const exist=this.users.some(user=>user.id==`${this.form.value.id}`)
        if(exist==true){
          alert("id already exist")
        }else if(this.users.some(user=>user.email==`${this.form.value.email}`)){
          alert("email already exist")
        }else{
          console.log(this.form.value);
          this.tab=false
        }
      }
  }
  sendRegister(form2) {
    let bothForms={id:this.form.value.id,email:this.form.value.email,password:this.form.value.password,city:this.form2.value.city,street:this.form2.value.street,name:this.form2.value.name}
    if (bothForms.id && bothForms.email && bothForms.password && bothForms.city && bothForms.street && bothForms.name) {
      this.us.register(bothForms).subscribe((res)=>
          this.router.navigateByUrl('/login')
      )}
  }
}