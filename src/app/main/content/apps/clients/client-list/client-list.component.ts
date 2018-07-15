import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ClientsService} from "../clients.service";

@Component({
  selector     : 'client-list',
  templateUrl  : './client-list.component.html',
  styleUrls    : ['./client-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ClientListComponent implements OnInit, OnDestroy
{
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

  clients: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'companyName', 'customerName', 'emailId', 'mobileNumber', 'buttons'];
  selectedClients: any[];
  checkboxes: {};

  onClientsChangedSubscription: Subscription;
  onSelectedClientsChangedSubscription: Subscription;

  dialogRef: any;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog
  ) {
  //  onClientChangeSubscription
    this.onClientsChangedSubscription =
      this.clientsService.onClientsChanged.subscribe(clients => {
        this.clients = clients;
        this.checkboxes = {};

        clients.map(client => {
          this.checkboxes[client.id] = false;
        });
      });
    //  onSelectedClientChangeSubscription
    this.onSelectedClientsChangedSubscription =
      this.clientsService.onSelectedClientsChanged.subscribe(selectedClients => {
        for ( const id in this.checkboxes )
        {
          if ( !this.checkboxes.hasOwnProperty(id) )
          {
            continue;
          }

          this.checkboxes[id] = selectedClients.includes(id);
        }
        this.selectedClients = selectedClients;
      });
  }

  ngOnInit()
  {
    this.dataSource = new FilesDataSource(this.clientsService);
  }

  ngOnDestroy()
  {
  //  onDestroy subscriptions
    this.onClientsChangedSubscription.unsubscribe();
    this.onSelectedClientsChangedSubscription.unsubscribe();
  }

  editContact(contact) {}

  /**
   * Delete Contact
   */
  deleteClient(client) {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if ( result )
      {
        this.clientsService.deleteClient(client);
      }
      this.confirmDialogRef = null;
    });
  }

  addDomain(data) {}

  onSelectedChange(id)
  {
    this.clientsService.toggleSelectedClient(id);
  }
}

export class FilesDataSource extends DataSource<any>
{
  constructor(private clientService: ClientsService)
  {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]>
  {
    return this.clientService.onClientsChanged;
  }

  disconnect()
  {
  }
}
