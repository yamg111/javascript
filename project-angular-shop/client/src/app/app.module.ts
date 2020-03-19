import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {MatNativeDateModule,MatDatepickerModule,MatSelectModule,MatCardModule,MatToolbarModule,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,MatTabsModule,MatDialogModule} from '@angular/material';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HomepageAComponent } from './components/homepage-a/homepage-a.component';
import { HomepageUComponent } from './components/homepage-u/homepage-u.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { ResizableModule } from 'angular-resizable-element';
import { CartComponent } from './components/cart/cart.component';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { AddComponent } from './components/add/add.component';
import { UpdateComponent } from './components/update/update.component';
import { OrdersFilterPipe } from './services/orders-filter.pipe.service'
import { StorageServiceModule } from 'angular-webstorage-service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageAComponent,
    HomepageUComponent,
    OrdersComponent,
    RegisterComponent,
    CartComponent,
    AddComponent,
    UpdateComponent,
    OrdersFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatTabsModule,
    NgMatSearchBarModule,
    ResizableModule,
    MatCardModule,
    RxReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StorageServiceModule 
  ],
  entryComponents: [AddComponent, UpdateComponent],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
