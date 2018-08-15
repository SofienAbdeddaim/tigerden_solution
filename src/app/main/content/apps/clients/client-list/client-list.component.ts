import {
    Component,
    EventEmitter, Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable, Subscription} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ClientsService} from "../clients.service";
import {ClientFormComponent} from "../client-form/client-form.component";
import {ClientDomainForm} from "../client-domain-form/client-domain-form";
import {ClientDomainComponent} from "../client-domain/client-domain";

@Component({
    selector: 'client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClientListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

    clients: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'companyName', 'customerName', 'emailId', 'mobileNumber', 'buttons'];
    selectedClients: any[];
    checkboxes: {};
    @Input() domainShow: boolean = false;
    dataToSend;
    @Output() showDomain = new EventEmitter<boolean>();
    onClientsChangedSubscription: Subscription;
    onSelectedClientsChangedSubscription: Subscription;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRefDomain: any;

    constructor(
        private clientsService: ClientsService,
        public dialog: MatDialog,
        public dialogShow: MatDialog
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
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedClients.includes(id);
                }
                this.selectedClients = selectedClients;
            });
    }

    ngOnInit() {
        this.dataSource = new FilesDataSource(this.clientsService);
    }

    ngOnDestroy() {
        //  onDestroy subscriptions
        this.onClientsChangedSubscription.unsubscribe();
        this.onSelectedClientsChangedSubscription.unsubscribe();
    }

    deleteClient(client) {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clientsService.deleteClient(client);
            }
            this.confirmDialogRef = null;
        });
    }

    addDomain(data) {
        console.log(data);
        this.dialogRefDomain = this.dialog.open(ClientDomainComponent, {
            height: '90%',
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });
    }

    onSelectedChange(id) {
        this.clientsService.toggleSelectedClient(id);
    }

    showClientData(data) {
        console.log(data);
        this.dataToSend = data;
        this.domainShow = true;
        this.showDomain.emit(this.domainShow);

        // this.dialogRef = this.dialogShow.open(ClientDomainForm, {
        //     panelClass: 'client-form-domain-dialog',
        //     data: {
        //         contact: data,
        //         action: 'edit'
        //     }
        // });

        // this.dialogRefShow.afterClosed()
        //     .subscribe(response => {
        //         if (!response) {
        //             return;
        //         }
        //         const actionType: string = response[0];
        //         const formData: FormGroup = response[1];
        //         switch (actionType) {
        //             /**
        //              * Save
        //              */
        //             case 'save':
        //
        //                 // this.contactsService.updateContact(formData.getRawValue());
        //
        //                 break;
        //             /**
        //              * Delete
        //              */
        //             case 'delete':
        //
        //                 // this.deleteContact(data);
        //
        //                 break;
        //         }
        //     });
    }
}

export class FilesDataSource extends DataSource<any> {
    constructor(private clientService: ClientsService) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        return this.clientService.onClientsChanged;
    }

    disconnect() {
    }
}
