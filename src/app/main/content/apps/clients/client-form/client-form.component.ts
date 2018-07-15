import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Client} from "../clients.model";
import {ClientsService} from "../clients.service";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientFormComponent implements OnInit {

  // clientForm: FormGroup;
  client: Client;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eigthFormGroup: FormGroup;
  ninthFormGroup: FormGroup;
  tenthFormGroup: FormGroup;
  eleventhFormGroup: FormGroup;
  twelvthFormGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _formBuilder: FormBuilder,
    private clientService: ClientsService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      customerName: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      emailId: ['', Validators.required]
    });
    this.forthFormGroup = this._formBuilder.group({
      address1: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      address2: ''
    });
    this.sixthFormGroup = this._formBuilder.group({
      address3: ''
    });
    this.seventhFormGroup = this._formBuilder.group({
      cityName: ['', Validators.required]
    });
    this.eigthFormGroup = this._formBuilder.group({
      stateName: ['', Validators.required]
    });
    this.ninthFormGroup = this._formBuilder.group({
      countryName: ['', Validators.required]
    });
    this.tenthFormGroup = this._formBuilder.group({
      pincode: ['', Validators.required]
    });
    this.eleventhFormGroup = this._formBuilder.group({
      contactNumber: ['', Validators.required]
    });
    this.twelvthFormGroup = this._formBuilder.group({
      mobileNumber: ''
    });
  }

  onSaveClient() {
    this.client = new Client(
      {
        id: null,
        companyName : this.firstFormGroup.value.companyName,
    customerName : this.secondFormGroup.value.customerName,
    emailId : this.thirdFormGroup.value.emailId,
    address1 : this.forthFormGroup.value.address1,
    address2 : this.fifthFormGroup.value.address2,
    address3 : this.sixthFormGroup.value.address3,
    city : this.seventhFormGroup.value.cityName,
    state : this.eigthFormGroup.value.stateName,
    country : this.ninthFormGroup.value.countryName,
    pincode : this.tenthFormGroup.value.pincode,
    contactNumber : this.eleventhFormGroup.value.contactNumber,
    mobileNumber : this.twelvthFormGroup.value.mobileNumber
      });
    this.clientService.saveClient(this.client)
      .then(
        (data: any) => {
          if(data.status === 200) this.dialogRef.close();
        }
      )
      .catch(
        error => console.log(error)
      );
  }

}
