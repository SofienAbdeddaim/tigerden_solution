import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, startWith, takeUntil} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

export class State {
    constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
    selector: 'app-client-domain',
    templateUrl: './client-domain.html',
    styleUrls: ['./client-domain.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientDomainComponent implements OnInit, OnDestroy {

    googleAnalytic: boolean = false;
    searchConsole: boolean = false;
    googlePlace: boolean = false;
    numberOfLocation = 1;
    numberOfDomain = 1;
    form: FormGroup;
    formErrors: any;
    private _unsubscribeAll: Subject<any>;
    stateCtrl: FormControl;
    filteredStates: Observable<any[]>;
    customerData;
    states: State[] = [
        {
            name: 'Arkansas',
            population: '2.978M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
        },
        {
            name: 'California',
            population: '39.14M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
        },
        {
            name: 'Florida',
            population: '20.27M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
        },
        {
            name: 'Texas',
            population: '27.47M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<ClientDomainComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        this.customerData = this._data.data;
        console.log(this.customerData);
        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this.filterStates(state) : this.states.slice())
            );
        this.formErrors = {
            domainName : {},
            type   : {},
            cpanelUsername: {},
            adminEmail: {},
            masterPassword: {},
            editorName: {},
            editorEmail: {},
            editorPassword: {},
            clientEmail: {},
            security: {},
            ratioForBlog: {},
            sliderRatio: {},
            featuredRatio: {},
            themePurchaseCode: {},
            sitemapinSidebar: {},
        };
    }

    onAddLocation() {
        this.numberOfLocation++;
    }

    onAddDomain() {
        this.numberOfDomain++;
    }

    filterStates(name: string) {
        return this.states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    ngOnInit() {
        this.form = this._formBuilder.group({
            // company   : [
            //     {
            //         value   : 'Google',
            //         disabled: true
            //     }, Validators.required
            // ],
            domainName : ['', Validators.required],
            type   : ['', Validators.required],
            cpanelUsername: [''],
            adminEmail: [''],
            masterPassword: [''],
            editorName: [''],
            editorEmail: [''],
            editorPassword: [''],
            clientEmail: [''],
            security: [''],
            ratioForBlog: [''],
            sliderRatio: [''],
            featuredRatio: [''],
            themePurchaseCode: [''],
            sitemapinSidebar: [''],
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });
        this._unsubscribeAll = new Subject();
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onFormValuesChanged(): void
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }

            console.log(this.form);
            console.log(this.form.value);
            console.log(this.formErrors);
        }
    }

}
