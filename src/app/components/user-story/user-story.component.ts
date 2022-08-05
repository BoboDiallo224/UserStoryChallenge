import { Component, OnInit } from '@angular/core';
import {UserStoryService} from "../../services/user-story.service";
import {UserStory} from "../../entities/user-story.entitie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  isChecked:boolean = false;
  isActivate:boolean = false;
  isComplete:boolean = false;
  isAll: boolean = false;
  usersStories:UserStory[] |null = null;
  userFormGroup!:FormGroup;
  submitted:boolean = false;

  constructor(private userStoryService:UserStoryService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      details:["", Validators.required],
    });
  }

  onGetAllUsersStories(){
    this.isChecked = false;
    this.isAll = true;
    this.isActivate = false;
    this.isComplete = false;
    this.userStoryService.getAllUsersStories().subscribe(data =>{
      this.usersStories = data;
      },
      error => {
            console.log(error)
      }

    )
  }

  onGetActivatedUsersStories(){
    this.isChecked = false;
    this.isActivate = true;
    this.isComplete = false;
    this.isAll = false;
    this.userStoryService.getActivatedUserStories().subscribe(data =>{
        this.usersStories = data;
      },
      error => {
        console.log(error)
      }

    )
  }

  onGetCompletedUserStory() {
    this.isChecked = false;
    this.isActivate = false;
    this.isComplete = true;
    this.isAll = false;
    this.userStoryService.getCompletedUserStories().subscribe(
      data =>{
            this.usersStories = data;
      },
      error => {
            console.log(error)
      })
  }

  onActivateUserStory(u:UserStory) {
    this.userStoryService.activateUserStory(u)
        .subscribe(data =>{
          u.activate = data.activate;
          alert("Activated successfully");
          if (this.isAll)
            this.onGetAllUsersStories();
          else
            this.onGetActivatedUsersStories()
        })
  }

  onCompleteUserStory(u:UserStory) {
    this.userStoryService.completeUserStroy(u)
      .subscribe(data =>{
        u.activate = data.activate;
        alert("Task completed successfully");
        this.onGetActivatedUsersStories()
      })
  }

  onDeleteUserStory(u: UserStory) {
    this.userStoryService.deleteUserStory(u).toPromise();
    alert("Task deleted successfully");
    this.onGetCompletedUserStory();
    return true
  }

  onDeactivateUserStory(u:UserStory) {
    if (!this.isComplete)
    this.userStoryService.activateUserStory(u)
      .subscribe(data =>{
        u.activate = data.activate;
        alert("Deactivated successfully");
        if (this.isAll)
          this.onGetAllUsersStories();
        else
          this.onGetActivatedUsersStories()
      })
  }

  onAddUserStory() {
    this.submitted = true;
    if (this.userFormGroup.invalid)return;
    this.userStoryService.saveUserStroy(this.userFormGroup.value)
      .subscribe(data =>{
        alert("User story save successfully");
        this.onGetAllUsersStories();
      })
  }

  onDeleteAllCompleteStories() {
    if (this.usersStories) {
      this.usersStories.forEach(obj => {
        this.userStoryService.deleteAllCompleteUserStory(obj).subscribe(data =>{
          this.onGetCompletedUserStory();
        });
      });
    }
    alert("Task deleted successfully");

  }
}
