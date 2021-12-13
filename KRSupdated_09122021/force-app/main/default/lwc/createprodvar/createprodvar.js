import { LightningElement, api, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import recordSelected from "@salesforce/messageChannel/my__c";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import  ID_FIELD from '@salesforce/schema/Product_Variant__c.Id';
import  KASMORS__VARIMAGE_FIELD from '@salesforce/schema/Product_Variant__c.Image_URL__c';
import KASMORS__OPTION_1LABEL from '@salesforce/schema/Product_Variant__c.Option_1_Label__c';
import  KASMORS__OPTION_2LABEL from '@salesforce/schema/Product_Variant__c.Option_2_Label__c';




import getconIdofvar from '@salesforce/apex/createproduct.getconIdofvar';
import getVarDetail from '@salesforce/apex/createproduct.getVarDetail';


export default class Createprodvar extends LightningElement {
    temp = false;
    @api prodId;
    recordId;


    versionId;
    contentId;
    @wire(MessageContext) context;
    connectedCallback() {
        // console.log("inside var connected call back");
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
        console.log("inside handle click");
        this.prodId = message.recordData;
        this.PRODUCT = message.recordData;
        if (this.prodId !== undefined) {
            this.temp = true;
        }
        // console.log("prodID" + this.PRODUCT);
        // console.log("prodID" + this.prodId);

    }

    // Get Picklist Values from Object
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: KASMORS__OPTION_1LABEL })
    option1;
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: KASMORS__OPTION_2LABEL })
    option2;

    Option_1_Label;
    Option_1_value;
    uploadview = true;

    Option_1_Labelchange(event) {
        this.Option_1_Label = event.target.value;
        // console.log(this.Option_1_Label);
    }

    Option1valueChange(event) {
        this.Option_1_value = event.target.value;
        // console.log(this.Option_1_value);

    }
    Option_2_Label;
    Option_2_value;
    Option_2_Labelchange(event) {
        this.Option_2_Label = event.target.value;
        // console.log(this.Option_2_Label);

    }
    Option2valueChange(event) {
        this.Option_2_value = event.target.value;
        // console.log(this.Option_2_value);

    }

    Name;
    PRICE;
    PRODUCT;

    onproductvarChange(event) {
        this.Name = event.target.value;
        // console.log(this.Name);
    }
    onpriceChange(event) {
        this.PRICE = event.target.value;
        // console.log(this.PRICE);
    }


    imgurl;
    onsubmit(event) {
        let prodvarId = null;
        if (this.temp) {
           // alert(this.Name + this.PRICE +this.Option_1_Label+this.Option_1_value +this.Option_2_Label +this.Option_2_value);
            if ((this.Name !== undefined) && (this.PRICE !== undefined) && (this.Option_1_Label !== undefined) && (this.Option_1_value !== undefined) && (this.Option_2_Label !== undefined) && (this.Option_2_value !== undefined)) {
            var fields = {
                'Name': this.Name,'kasmors__Price__c': this.PRICE, 'kasmors__Product__c': this.PRODUCT,
                'kasmors__Option_1_Label__c': this.Option_1_Label, 'kasmors__Option_2_Label__c': this.Option_2_Label,
                'kasmors__Option_1_Value__c': this.Option_1_value, 'kasmors__Option_2_Value__c': this.Option_2_value
            };

            var objRecordInput = { 'apiName': 'kasmors__Product_Variant__c', fields };

            // LDS method to create record.
            
                createRecord(objRecordInput).then(response => {
                    
                        this.recordId = response.id;
                        // console.log("varID" + this.recordId);
                        this.prodvarId = response.id;
                        // console.log("response"+this.prodvarId);
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: ' Variant crated Successfully: ',
                                variant: 'success',
                            }),
                        );
                    
                });
            }
            else {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: ' Enter All Details: ',
                        variant: 'error',
                    }),
                );

            }
        }
        else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: ' No Product Id Found: ',
                    variant: 'error',
                }),
            );
        }

        getVarDetail({ prodId: this.prodId, option: this.Option_1_value }).then(result => {
            console.log("inside get var Detail");
            if (result.length !== 0) {
                console.log(result);
                console.log("inside get varr detail");
                this.uploadview = false;
                this.imgurl = result[0].kasmors__Image_URL__c;
                console.log(this.imgurl);
                
            }
        })



    }
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }

    onaddimageclick(event) {
        console.log("inside add image");
        console.log(this.recordId);
        //console.log('imgurl');
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[KASMORS__VARIMAGE_FIELD.fieldApiName] = this.imgurl;
        const recordInput = {
            fields
        };
        updateRecord(recordInput).then(up => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: ' Image Addes Successfully: ',
                    variant: 'success',
                }),
            );
        })
    }
    onimageupload(event) {
        if(this.recordId !==undefined)
        {
        const uploadedFile = event.detail.files;
        console.log(uploadedFile);
        
        
        let uploadedFileNames = '' ;
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
        }
        else{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'No Record ID Found..! Cannot upload Image: ',
                    variant: 'error',
                }),
            );

        }
    
        getconIdofvar({ prodvar: this.recordId })
            .then(res => {
                console.log(res.ContentDocumentId);
                console.log(res.ContentDocument.LatestPublishedVersionId);
                this.contentId = res.ContentDocumentId;
                this.versionId = res.ContentDocument.LatestPublishedVersionId;
                // updated on 17-11-2021 by Ram with Vadiraj,Neelappa,Swetha & Jegadesh
                let hostname = window.location.hostname;
                let arr = hostname.split(".");
                let instance = arr[0];
                let urlimg = "https://"+instance +"--c.documentforce.com"+"/sfc/servlet.shepherd/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=" + this.versionId + "&operationContext=CHATTER&contentId=" + this.contentId;

                console.log('Updated URL******************' +urlimg);
                // Update the Image URL field
                const fields = {};
                fields[ID_FIELD.fieldApiName] = this.recordId;
                fields[KASMORS__VARIMAGE_FIELD.fieldApiName] = urlimg;
                const recordInput = {
                    fields
                };
                updateRecord(recordInput);

            });


    }

    onresetclick(event) {
        console.log("inside rest");

        this.template.querySelector('lightning-input[data-name="prodvar"]').value = null;
        this.template.querySelector('lightning-input[data-name="price"]').value = null;
        this.template.querySelector('lightning-input[data-name="option1"]').value = null;
        this.template.querySelector('lightning-input[data-name="option2"]').value = null;
        this.Option_1_Label = null;
        this.Option_2_Label = null;
        this.temp = false;
        console.log(this.temp);
        this.uploadview = true;
        this.prodId = null;
    }




}