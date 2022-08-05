import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserStoryComponent} from "./components/user-story/user-story.component";

const routes: Routes = [
  { path:"user-story", component:UserStoryComponent},
  {path:"", component:UserStoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
