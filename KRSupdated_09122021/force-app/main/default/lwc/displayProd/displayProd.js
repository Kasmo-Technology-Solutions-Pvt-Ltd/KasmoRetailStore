import { LightningElement ,wire ,track } from 'lwc';
import getproduct from '@salesforce/apex/createproduct.getproduct';
import getUserprofileInfo from '@salesforce/apex/createproduct.getUserprofileInfo';


import {publish, MessageContext} from 'lightning/messageService';
import recordSelected from "@salesforce/messageChannel/my__c";
import { refreshApex } from '@salesforce/apex';

import {getRecord , getFilelValue} from 'lightning/uiRecordApi';
import uId from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';

const Field=[NAME_FIELD];
export default class DisplayProd extends LightningElement {
    userId=uId;
    
    isButtonDisabled=false;
    displaybutton=false;
    showbutton=false;
    recordId;
    ProfileName;


     //Pagination
     /** Current page in the product list. */
   pageNumber = 1;
   /** The number of items on a page. */
   pageSize;
   /** The total number of items matching the selection. */
   totalItemCount = 0; 
    @wire(getUserprofileInfo)
    proname({data,error})
    {
        if(data)
        {
            
            this.ProfileName=data[0].Name;
            if(this.ProfileName==="System Administrator")
            {
                this.isButtonDisabled=true;
            }
        }
    }

    @wire(getproduct, {pageNumber:'$pageNumber'})
    getproducts;

    @wire(MessageContext)context;

    oncreateproductclick(event)
    {
        const displaycreate=true;
        const message = { recordId: displaycreate };
        publish(this.context, recordSelected, message);
    }
    onrefreshclick(event)
    {
        refreshApex(this.getproducts);
    }
    
    onvariantclick(event)
    {
        console.log("rec id"+this.recordId);
        this.displaybutton=false;
        const message = { recordData: this.recordId };
    
        publish(this.context, recordSelected, message);
    }
    onimgclk(event)
    {
        
        this.recordId=event.target.getAttribute("name");
        // console.log(event.target.getAttribute("name"));
        if(this.recordId!==null)
        {
            this.showbutton=true;
            this.displaybutton=((this.isButtonDisabled===true) && (this.showbutton===true));    
        }
        
    }

    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }
    
    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    
    }
}