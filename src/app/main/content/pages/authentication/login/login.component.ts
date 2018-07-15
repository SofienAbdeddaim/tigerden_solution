import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
    selector   : 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class FuseLoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    wrongAuth: boolean = false;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router
    )
    {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            email   : {},
            password: {}
        };
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLogIn() {
      this.loginService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(
          response => {
              this.router.navigate(['/apps/dashboards/analytics']);
          }
        )
        .catch(
          error => {
            this.wrongAuth = true;
          }
        );
        // .catch(
        //   error => { this.router.navigate(['/']); }
        // );
    }

    onLoginFormValuesChanged()
    {
      this.wrongAuth = false;
      for ( const field in this.loginFormErrors )
        {
          if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
}
