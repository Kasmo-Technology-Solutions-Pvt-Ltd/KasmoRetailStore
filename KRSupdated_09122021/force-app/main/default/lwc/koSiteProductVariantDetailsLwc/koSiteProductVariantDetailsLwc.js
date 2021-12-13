import { LightningElement,api,track,wire } from 'lwc';
import getProductVarientDetails from '@salesforce/apex/koSiteController.getProductVarientDetails';

export default class KoSiteProductVariantDetailsLwc extends LightningElement {
@api recordId 
@wire (getProductVarientDetails,{selectedRecordId:'$recordId'})
    productsWithVarients; 
}