import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import {
    MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
    MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
    MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
        MatAutocompleteModule,
        MatExpansionModule,
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
