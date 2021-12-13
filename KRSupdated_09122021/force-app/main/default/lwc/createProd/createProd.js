import { LightningElement, track, api, wire } from 'lwc';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import ID_FIELD from '@salesforce/schema/Product2.Id';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import ACTIVE_FIELD from '@salesforce/schema/Product2.IsActive';
import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';
import KASMORS__IMAGE_FIELD from '@salesforce/schema/Product2.Image_URL__c';
//import CATEGORY_FIELD from '@salesforce/schema/Product2.Category__c';
import { createRecord } from 'lightning/uiRecordApi';
//import SUBCATEGORY_FIELD from '@salesforce/schema/Product2.Sub_Category__c';
import KASMORS__CHILDCATEGORY_FIELD from '@salesforce/schema/Product2.ChildCategory__c';

import createnewProduct from '@salesforce/apex/createproduct.createnewProduct';
import getconId from '@salesforce/apex/createproduct.getconId';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext, subscribe, APPLICATION_SCOPE } from 'lightning/messageService';
import recordSelected from "@salesforce/messageChannel/my__c";

export default class CreateProd extends NavigationMixin(LightningElement) {

    recordId;
    displaylayout = false;
    verId;
    contId;
    rec = {
        Name: NAME_FIELD,
        IsActive: ACTIVE_FIELD,
    //    Category: CATEGORY_FIELD,
        Description: DESCRIPTION_FIELD,
  //      SubCategory: SUBCATEGORY_FIELD,
        ChildCategory: KASMORS__CHILDCATEGORY_FIELD
    }

    @wire(MessageContext) context;

    connectedCallback() {
        console.log("inside call back");
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        subscribe(
            this.context,
            recordSelected,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE }

        )

    }
    handleMessage(message) {
        console.log("inside handle" + message.recordId);
        this.displaylayout = message.recordId;

        console.log("create prod" + this.displaylayout);


    }
    onproductChange(event) {
        this.rec.Name = event.target.value;
        console.log(this.rec.Name);
    }
    onactivechange(event) {
        this.rec.IsActive = event.target.checked;
        console.log(this.rec.IsActive);

    }
    ondeschange(event) {
        this.rec.Description = event.target.value;
    }
    onsubmit(event) {
        
        var fields = { 'Name': this.rec.Name, 'IsActive': this.rec.IsActive, 'Description': this.rec.Description, 'kasmors__ChildCategory__c':this.rec.ChildCategory  };
//'Category__c': this.rec.Category,'Sub_Category__c':this.rec.SubCategory,
        var objRecordInput = { 'apiName': 'Product2', fields };
        createRecord(objRecordInput).then(response => {
            if(response !==null)
            {
            console.log(response);
            this.recordId = response.id;
            this.rec.Name = '';
            this.rec.IsActive = '';
            this.rec.Description = '';
            //this.rec.Category = '';
            //this.rec.SubCategory = '';
            this.rec.ChildCategory = '';
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: ' Product Created Successfully: ',
                    variant: 'success',
                }),
            );
            }
            else{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: ' No Product Found: ',
                        variant: 'error',
                    }),
                );
            }
        })
        
    

    }
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }

    onupload(event) {
        const uploadedFile = event.detail.files;
        console.log(uploadedFile);
        let uploadedFileNames = '';
        for (let i = 0; i < uploadedFile.length; i++) {
            uploadedFileNames += uploadedFile[i].name + ', ';
        }

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFile.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
        // Method Call to get Content and Version Id
        getconId({ pd: this.recordId })
            .then(results => {
                console.log("cont Id" + results.ContentDocumentId);
                console.log("ver Id" + results.ContentDocument.LatestPublishedVersionId);
                this.verId = results.ContentDocument.LatestPublishedVersionId;
                this.contId = results.ContentDocumentId;

                let urlimg = "/sfc/servlet.shepherd/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=" + this.verId + "&operationContext=CHATTER&contentId=" + this.contId;

                console.log(urlimg);
                // Update the Image URL field
                const fields = {};
                fields[ID_FIELD.fieldApiName] = this.recordId;
                fields[KASMORS__IMAGE_FIELD.fieldApiName] = urlimg;
                const recordInput = {
                    fields
                };
                updateRecord(recordInput);
            });
        this.displaylayout = null;

    }


    onreset(event) {
        this.template.querySelectorAll('lightning-input').forEach(element => {
            if (element.type === 'checkbox') {
                element.checked = false;
            } else {
                element.value = null;
            }
        });

        this.template.querySelector('lightning-input[data-name="prod"]').value = null;
        this.template.querySelector('lightning-input[data-name="des"]').value = null;
        this.recordId = null;
        this.displaylayout = false;

    }
    /*myLookupHandle1(event) {
        console.log("my detail" + event.target.value);
        this.rec.Category = event.target.value;
        console.log("catname" + this.rec.Category);
        //alert("parent catgory :" + this.rec.Category);

    }
    myLookupHandle2(event) {
        console.log("my detail" + event.target.value);
        this.rec.SubCategory = event.target.value;
        console.log("catname" + this.rec.SubCategory);
       // alert("subcatgory : " + this.rec.SubCategory);
    }*/
    myLookupHandle3(event) {
        console.log("my detail" + event.target.value);
        this.rec.ChildCategory = event.target.value;
        console.log("catname" + this.rec.ChildCategory);
       // alert("child catgory : " + this.rec.ChildCategory);
        
    }

}