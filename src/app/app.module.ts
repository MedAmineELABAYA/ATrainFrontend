import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatmodalComponent } from './chatmodal/chatmodal.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AlertModule} from "ngx-bootstrap/alert";
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    ChatmodalComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    AlertModule
  ],
  providers: [HttpClientModule,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
