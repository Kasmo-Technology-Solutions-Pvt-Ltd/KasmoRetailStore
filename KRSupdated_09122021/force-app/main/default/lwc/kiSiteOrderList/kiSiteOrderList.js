import { LightningElement, wire,track } from 'lwc';

import getorders from '@salesforce/apex/koSiteController.getorders';
import deleteorder from '@salesforce/apex/koSiteController.deleteorder';
import Kasmo_Logo from '@salesforce/resourceUrl/kasmologo';
import { NavigationMixin } from 'lightning/navigation';


export default class KiSiteOrderList extends NavigationMixin( LightningElement ) {
    logo=Kasmo_Logo;
    @wire(getorders)getorder;

    ondelclick(event)
    {
        deleteorder();
    }
    @track showdetail=false;
    orderid;
    onorderbuttonclick(event)
    {
        
        this.orderid=this.template.querySelector('div').value;
        console.log(this.orderid);
        this.showdetail=true;
    }
    onimageclick(event)
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            },
        });
    }
    wishListHandler(event)
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'kasmors__Wishlist_Product__c',
                actionName: 'list'
            },
        });  
    }
    

}