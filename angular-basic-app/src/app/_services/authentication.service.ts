﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {first, map} from 'rxjs/operators';

import {User} from "../_models/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getCurrentUser(email:string) {
    this.http.get<any>(`https://reqres.in/api/users`)
      .pipe(
        first()
      )
      .subscribe(users => {
        let usr =users.data.filter((e : any) => e.email == email)[0];
        localStorage.setItem('currentUser', JSON.stringify(usr));
        this.currentUserSubject.next(usr);
      });

  }

  login(email:string, password:string) {
    return this.http.post<any>(`https://reqres.in/api/login`, { email, password })
      .pipe(map(user => {
        this.getCurrentUser(email);
        return user;
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
  isUserLogedIn(){
    return this.currentUserSubject.value != null;
  }

}
