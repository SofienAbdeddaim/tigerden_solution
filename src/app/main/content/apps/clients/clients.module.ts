import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatRippleModule, MatSidenavModule, MatStepperModule, MatTableModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { ClientsComponent } from './clients.component';
import { ClientsService } from './clients.service';
import { ClientFormComponent } from './client-form/client-form.component';
import {ClientListComponent} from "./client-list/client-list.component";
import {FuseClientsSelectedBarComponent} from "./selected-bar/selected-bar.component";
import {ClientDomainForm} from "./client-domain-form/client-domain-form";

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
        ClientDomainForm
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
        MatToolbarModule,
        MatStepperModule,
        FuseSharedModule,
        FuseConfirmDialogModule
    ],
    providers      : [
        ClientsService
    ],
    entryComponents: [ClientFormComponent]
})
export class ClientsModule
{
}
