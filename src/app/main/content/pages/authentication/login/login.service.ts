import {HttpClient} from "@angular/common/http";
import {EventEmitter, Injectable, Input, Output} from "@angular/core";
import * as firebase from 'firebase';
import {reject} from "q";
import {Router} from "@angular/router";
let isAuthenticated: boolean = false;

@Injectable()
export class LoginService
{
  response: any;
  token: string = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  isItAuthenticated() {
    return isAuthenticated;
  }

  loginUser(email: string, password: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(
            response => {
              isAuthenticated = true;
              resolve(response);
            }
          )
          .catch(
            error => {
              reject(error);
            }
          )
      }
    );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }
}
