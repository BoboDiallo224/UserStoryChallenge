import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserStoryComponent} from "./components/user-story/user-story.component";
import {UserStoryService} from "./services/user-story.service";

@NgModule({
  declarations: [
    AppComponent,
    UserStoryComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserStoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
