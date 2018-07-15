import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class RegisterService
{
  constructor(private http: HttpClient) {
  }

  saveUser(user) {
    return this.http.post('https://tigerden-a99eb.firebaseio.com/users.json', user, { observe: 'response'});
  }
  creatAccount(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error))
  }
}
