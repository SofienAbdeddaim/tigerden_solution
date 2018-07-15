import {FuseUtils} from "../../../../../@fuse/utils/index";

export class Client
{
    id: string;
    companyName: string;
    customerName: string;
    emailId: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    contactNumber: string;
    mobileNumber: string;

    constructor(client)
    {
        {
            this.id = client.id || FuseUtils.generateGUID();
            this.companyName = client.companyName || '';
            this.customerName = client.customerName || '';
            this.emailId = client.emailId || '';
            this.address1 = client.address1 || '';
            this.address2 = client.address2 || '';
            this.address3 = client.address3 || '';
            this.city = client.city || '';
            this.state = client.state || '';
            this.country = client.country || '';
            this.pincode = client.pincode || '';
            this.contactNumber = client.contactNumber || '';
            this.mobileNumber = client.mobileNumber || '';
        }
    }
}
