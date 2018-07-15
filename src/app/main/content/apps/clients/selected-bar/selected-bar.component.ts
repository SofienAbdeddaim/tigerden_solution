import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ClientsService} from "../clients.service";

@Component({
  selector    :   'client-selected-bar',
  templateUrl :   './selected-bar.component.html',
  styleUrls   :   ['./selected-bar.component.scss']
})

export class FuseClientsSelectedBarComponent {
  selectedClients: string[];
  hasSelectedClients: boolean;
  isIndeterminate: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(private clientsService: ClientsService,
              public dialog: MatDialog) {
    this.clientsService.onSelectedClientsChanged
      .subscribe(selectedClients => {
        this.selectedClients = selectedClients;
        setTimeout(() => {
          this.hasSelectedClients = selectedClients.length > 0;
          this.isIndeterminate = (selectedClients.length !== this.clientsService.clients.length && selectedClients.length > 0);
        }, 0);
      });

  }

  selectAll() {
    this.clientsService.selectClients();
  }

  deselectAll() {
    this.clientsService.deselectClients();
  }

  deleteSelectedClients() {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
            this.clientsService.deleteSelectedClients();
        }
        this.confirmDialogRef = null;
    });
  }

}
