import { LightningElement,wire,track,api } from 'lwc';
import KasmoMessageChannel from '@salesforce/messageChannel/KasmoMessageChannel__c';
import { MessageContext,publish } from 'lightning/messageService';
import Kasmo_Logo from '@salesforce/resourceUrl/kasmologo';
import avatar from '@salesforce/resourceUrl/avatar';//Praveen fixed 
import heart from '@salesforce/resourceUrl/heart';//Praveen fixed 
import shoppingcart from '@salesforce/resourceUrl/shoppingcart';//Praveen fixed 
import getCategoryTabs from '@salesforce/apex/koSiteController.getCategoryTabs';
import getSubCategoryTabs from '@salesforce/apex/koSiteController.getSubCategoryTabs';
import getCartCount from '@salesforce/apex/koSiteController.getCartCount';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
//Srikanth Started 
import isGuest from "@salesforce/user/isGuest";
import basePath from "@salesforce/community/basePath"; 
import getLogoutUrl from '@salesforce/apex/applauncher.IdentityHeaderController.getLogoutUrl';
import getLoginUrl from '@salesforce/apex/system.Network.getLoginUrl';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'; //this is how you will retreive the USER ID of current in user.
import NAME_FIELD from '@salesforce/schema/User.Name';
//Srikanth Ended here
export default class KoSiteHeaderLwc extends NavigationMixin(LightningElement) {
    connectedCallback() {
        refreshApex(this.totalCartItems);
    }
    //Srikanth Started 
    get isGuest() {
        return isGuest;
    }
    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + "/secur/logout.jsp";
    }
    @track error ;
    @track name;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.name = data.fields.Name.value;
        }
    }
    // Srikanth Ended here
    //Message channel context
    @wire (MessageContext) 
    context;
    //Logo Url
    kasmologourl=Kasmo_Logo
    // Praveen fixed
    profileurl = avatar
    wishListurl = heart
    carturl = shoppingcart
    //Praveen fixed 
    //category component handler
    tabCategoryId
    tabCategoryMethod(event){
        this.tabCategoryId=event.target.name
        const category={
            CategoryId:{
                categoryValue: this.tabCategoryId,
            }
        }
        publish(this.context,KasmoMessageChannel,category)
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.tabCategoryId,
                objectApiName: 'kasmors__Category__c',
                actionName: 'view'
            } 
        });
    }
    //subcategory2 component handler
    parentCategoryId
    parentCategoryMethod(event){
        this.parentCategoryId=event.target.name
        const category={
            CategoryId:{
                categoryValue: this.parentCategoryId,
            }
        }
        publish(this.context,KasmoMessageChannel,category)
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.subCategoryId2,
                objectApiName: 'kasmors__Category__c',
                actionName: 'view'
            } 
        });
    }
//search component handler
     searchKey
    searchKeyHandler=(event)=>{
        this.searchKey=event.target.value
    }
    //category tabs 
    @wire (getCategoryTabs)
    categories;

    //subcategory tabs 
    @wire (getSubCategoryTabs,{categoryId: '$categoryId'})
    subcategories;
    
    @track showSubCategoryModel
    @track categoryId
    subCategoryHandler(event){
        this.showSubCategoryModel=true
        this.categoryId = event.target.name
        //alert(this.categoryId);    
    }

    
    //count cart
    @wire(getCartCount)
   totalCartItems;
     //navigate to login page
     navigateToLoginPage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__loginPage',
            attributes: {
                actionName: 'login'
            }
        });
    }
    //naviagte to orders
    navigateToOrders(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'kasmors__MyOrder__c',
                actionName: 'list'
            },
        });
    }
    //navigate to edit profile
    @api recordId;
    @track contactId
    navigateToEditPage() {
        this.contactId=USER_ID
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
               recordId: this.contactId,
                actionName: 'view'
            },
        });
    }
    CheckOutHandler(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'kasmors__Cart_Product__c',
                actionName: 'list'
            },
        });
        }
    //navigate to wish list component
    wishListHandler(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'kasmors__Wishlist_Product__c',
                actionName: 'list'
            },
        });  
    }
    //profile section
    @track showProfileModel
    profileHandler=()=>{
        this.showProfileModel=true
   }
   closeProfileHandler(){
       this.showProfileModel=false
   }
   // navigate to home page
   homeHandler(){
    this[NavigationMixin.Navigate]({
        type: 'standard__namedPage',
        attributes: {
            pageName: 'home'
        },
    });
}
//subcategory section

closeSubCategoryHandlerHandler(){
   this.showSubCategoryModel=false
}
}