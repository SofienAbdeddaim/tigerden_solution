import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { ClientsComponent } from './clients.component';
import { ClientsService } from './clients.service';
import { ClientFormComponent } from './client-form/client-form.component';
import {ClientListComponent} from "./client-list/client-list.component";
import {FuseClientsSelectedBarComponent} from "./selected-bar/selected-bar.component";
import {ClientDomainForm} from "./client-domain-form/client-domain-form";
import {AgmCoreModule} from "@agm/core";
import {ClientDomainComponent} from "./client-domain/client-domain";

const routes: Routes = [
    {
        path     : '**',
        component: ClientsComponent,
        resolve  : {
            contacts: ClientsService
        }
    }
];

@NgModule({
    declarations   : [
        ClientsComponent,
        ClientFormComponent,
      ClientListComponent,
      FuseClientsSelectedBarComponent,
        ClientDomainForm,
        ClientDomainComponent
    ],
    imports        : [
        RouterModule.forChild(routes),
        CdkTableModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSidenavModule,
        MatTableModule,
        MatTabsModule,
        MatSelectModule,
        MatToolbarModule,
        MatStepperModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
    ],
    providers      : [
        ClientsService
    ],
    entryComponents: [ClientFormComponent, ClientDomainComponent]
})
export class ClientsModule
{
}
