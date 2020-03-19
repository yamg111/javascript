import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageAComponent } from './components/homepage-a/homepage-a.component';
import { HomepageUComponent } from './components/homepage-u/homepage-u.component';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [{path:"login",component:LoginComponent},{path:"register",component:RegisterComponent},{path:"homepage-a",component:HomepageAComponent },{path:"homepage-u",component:HomepageUComponent },{path:"orders",component:OrdersComponent },{path:"",pathMatch:"full",redirectTo:"login"},{path:"**",redirectTo:"login"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
