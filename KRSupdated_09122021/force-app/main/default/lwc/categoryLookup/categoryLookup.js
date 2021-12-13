import { LightningElement , track, wire } from 'lwc';
import getCustomLookupAccount from '@salesforce/apex/createproduct.getCustomLookupAccount';


export default class CategoryLookup extends LightningElement {
    @track categoryName='';
 @track categoryList=[];
 @track objectApiName='Account';
 @track categoryId;
 @track isShow=false;
 @track messageResult=false;
 @track isShowResult = true;
 @track showSearchedValues = false;

 @wire(getCustomLookupAccount,{catName:'$categoryName'})
 retrieveAccounts ({error,data}){
     this.messageResult=false;
     if(data){
         console.log('data## ' + data);
         if(data.length>0 && this.isShowResult){
            this.categoryList =data;
            this.showSearchedValues=true;
            this.messageResult=false;
         }
         else if(data.length == 0){
            this.categoryList=[];
            this.showSearchedValues=false;
            if(this.categoryName != ''){
               this.messageResult=true;
            }
         }
         else if(error){
             this.categoryId='';
             this.categoryName='';
             this.categoryList=[];
             this.showSearchedValues=false;
             this.messageResult=true;
         }

     }
 }



 searchHandleClick(event){
  this.isShowResult = true;
  this.messageResult = false;
}


searchHandleKeyChange(event){
  this.messageResult=false;
  this.categoryName = event.target.value;
}

parentHandleAction(event){        
    this.showSearchedValues = false;
    this.isShowResult = false;
    this.messageResult=false;
    //Set the parent calendar id
    this.categoryId =  event.target.dataset.value;
    //Set the parent calendar label
    this.categoryName =  event.target.dataset.label;      
    console.log('accountId::'+this.categoryId);    
    const selectedEvent = new CustomEvent('selected', { detail: this.categoryId });
        // Dispatches the event.
    this.dispatchEvent(selectedEvent);    
}


}