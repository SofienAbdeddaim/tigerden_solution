import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ClientsService } from './clients.service';
import {ClientFormComponent} from "./client-form/client-form.component";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {ClientDomainComponent} from "./client-domain/client-domain";

@Component({
    selector     : 'clients-component',
    templateUrl  : './clients.component.html',
    styleUrls    : ['./clients.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ClientsComponent implements OnInit, OnDestroy
{
    searchInput: FormControl;
    hasSelectedClients: boolean;
    dialogRef: any;
    dialogRefDomain: any;
    iconFlag = 'person_add';
    domainShow: boolean;
    onSelectedClientsChangedSubscription: Subscription;

    //--------------------------------------->
    // @ViewChild('test') test: TemplateRef<any>;

    constructor(
        private clientsService: ClientsService,
        public dialog: MatDialog,
    )
    {
        this.searchInput = new FormControl('');
    }

    ngOnInit() {
      this.onSelectedClientsChangedSubscription =
        this.clientsService.onSelectedClientsChanged
          .subscribe(selectedClients => {
            this.hasSelectedClients = selectedClients.length > 0;
          });
      this.searchInput.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(searchText => {
          this.clientsService.onSearchTextChanged.next(searchText);
        });
    }

    newDomain() {
        this.dialogRefDomain = this.dialog.open(ClientDomainComponent, {
            height: '90%',
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });
    }

    newContact()
    {

        if(this.iconFlag === 'person_add') {
            this.dialogRef = this.dialog.open(ClientFormComponent, {
                height: '90%',
                panelClass: 'contact-form-dialog',
                data      : {
                    action: 'new'
                }
            });
        }
        else {
            this.domainShow = false;
            this.iconFlag = 'person_add';
        }

    }

  ngOnDestroy()
  {
    this.onSelectedClientsChangedSubscription.unsubscribe();
  }

    onChangeView(event) {
        if(event) {
            this.iconFlag = 'reply';
            this.domainShow = true;
        }
    }

}
