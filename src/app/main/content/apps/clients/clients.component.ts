import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ClientsService } from './clients.service';
import {ClientFormComponent} from "./client-form/client-form.component";

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

    newContact()
    {
        this.dialogRef = this.dialog.open(ClientFormComponent, {
            height: '90%',
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

        // this.dialogRef.afterClosed()
        //     .subscribe((response: FormGroup) => {
        //         if ( !response )
        //         {
        //             return;
        //         }
        //
        //         // this.contactsService.updateContact(response.getRawValue());
        //
        //     });

    }

  ngOnDestroy()
  {
    this.onSelectedClientsChangedSubscription.unsubscribe();
  }

}
