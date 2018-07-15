import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {LoginService} from "./main/content/pages/authentication/login/login.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    {
      if(this.authService.isItAuthenticated()) {
        return true
      }
      else this.router.navigate(['/']);
    }
  }
}
