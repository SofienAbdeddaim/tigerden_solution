import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationTurkish } from './navigation/i18n/tr';

import * as firebase from 'firebase';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    constructor(
        private translate: TranslateService,
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService,
        private fuseTranslationLoader: FuseTranslationLoaderService
    )
    {
        // Add languages
        this.translate.addLangs(['en', 'tr']);

        // Set the default language
        this.translate.setDefaultLang('en');

        // Set the navigation translations
        this.fuseTranslationLoader.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this.translate.use('en');
    }

    ngOnInit() {
      firebase.initializeApp({
        apiKey: "AIzaSyBnQ6nmHQiW3aSYraMEOzNtv5_yegsq888",
        authDomain: "tigerden-a99eb.firebaseapp.com"
      })
    }
}
