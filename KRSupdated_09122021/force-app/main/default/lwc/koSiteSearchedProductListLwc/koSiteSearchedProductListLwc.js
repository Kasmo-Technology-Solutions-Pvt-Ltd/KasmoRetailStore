import { LightningElement,wire,track,api } from 'lwc';
import getSearchProducts from '@salesforce/apex/koSiteController.getSearchProducts';
import { NavigationMixin } from 'lightning/navigation';

export default class KoSiteSearchedProductListLwc extends NavigationMixin(LightningElement) {
    @api receivedSearchKey
   
    @wire (getSearchProducts,{searchKey:'$receivedSearchKey'})
    productSearch;
    searchedProductId
    searchedProductDetails=(event)=>{
        this.searchedProductId=event.target.name
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.searchedProductId,
                    objectApiName: 'Product2',
                    actionName: 'view'
                } 
            });
    }

}