import { Component, OnInit } from '@angular/core';
import {User} from "../_models/user";
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {filter, first} from "rxjs/operators";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  currentUser: User;
  userLogedIn =false;
  users: User[];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userLogedIn = this.authenticationService.isUserLogedIn();
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  logout() {
    this.userLogedIn =false;
    this.authenticationService.logout();
  }
  private loadAllUsers() {
    this.userService.getAll()
      .pipe(
        first()
        )
      .subscribe(users => {
        this.users = users.data
      });
  }

  changeBackground(): any {
    return { 'background-color':'rgb('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+')' };
  }
}
