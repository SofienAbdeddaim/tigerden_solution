import {Component, Inject, Input, Output, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CalendarEvent } from 'angular-calendar';
import {Contact} from "../../contacts/contact.model";

// import { Contact } from '../contact.model';

@Component({
    selector     : 'client-domain-form',
    templateUrl  : './client-domain-form.html',
    styleUrls    : ['./client-domain-form.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ClientDomainForm
{
    event: CalendarEvent;
    dialogTitle: string;
    contactForm: FormGroup;
    action: string;
    contact: Contact;
    @Input() data;

    constructor() {}

    justTest(e) {
        e.stopPropagation();
        console.log('test');
    }

}
