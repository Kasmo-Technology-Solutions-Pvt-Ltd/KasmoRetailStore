import { LightningElement,wire,track,api } from 'lwc';
import getProducts from '@salesforce/apex/koSiteController.getProducts';
import KasmoMessageChannel from '@salesforce/messageChannel/KasmoMessageChannel__c';
import { publish,subscribe,MessageContext, APPLICATION_SCOPE, unsubscribe } from 'lightning/messageService';
import Carousel_Men from '@salesforce/resourceUrl/MenCarousal';
import Carousel_Women from '@salesforce/resourceUrl/WomenCarousal';
import Carousel_Beauty from '@salesforce/resourceUrl/BeautyCarousal';
import Carousel_Kids from '@salesforce/resourceUrl/KidsCarousal';
//import getCollections from '@salesforce/apex/kasmoHeaderApexClass.getCollections';
//import getCategoryCollections from '@salesforce/apex/kasmoHeaderApexClass.getCategoryCollections'; 
import { NavigationMixin } from 'lightning/navigation';
export default class KoSiteCategoryProductListLwc extends NavigationMixin(LightningElement) {
    carousel={
        carouselMen:Carousel_Men,
        carouselWomen:Carousel_Women,
        carouselBeauty:Carousel_Beauty,
        carouselKids:Carousel_Kids
    }
    //Pagination
     /** Current page in the product list. */
   pageNumber = 1;
   /** The number of items on a page. */
   pageSize;
   /** The total number of items matching the selection. */
   totalItemCount = 0; 

    @api recordId
    receivedCaterogry
    selectedRecordId
    showCarousel=true
    showCategoryBasedData=true
    showCollections=true
    showProducts=true
    //products based on category
    @wire (getProducts,{category:'$receivedCaterogry',pageNumber:'$pageNumber'})
    categoryProducts;
    //collection based on category
    //@wire (getCategoryCollections,{CollectioncategoryId:'$recordId'})
    //collectionCategories;
    // collection data
    //@wire(getCollections)
    //collections;
    ProductDetails(event){
        this.selectedRecordId = event.target.name;
        this[NavigationMixin.GenerateUrl]({
           type: 'standard__recordPage',
           attributes: {
               recordId:this.selectedRecordId,
               objectApiName: 'Product2',
               actionName: 'view'
           } 
       }).then(url => { window.open(url) });
    }
    //massege channel for tab id 
    @wire (MessageContext)
    context;
    connectedCallback(){
        this.subscribeCategory()   
    }
   
    subscribeCategory(){
        subscribe(this.context,KasmoMessageChannel,(category)=>{this.handleCategory(category)},{scope:APPLICATION_SCOPE})
    }
    handleCategory(category){
        this.receivedCaterogry=category.CategoryId.categoryValue ? category.CategoryId.categoryValue : 'null'
    }
    //Pagination Handlers
handlePreviousPage() {
    this.pageNumber = this.pageNumber - 1;
}

handleNextPage() {
    this.pageNumber = this.pageNumber + 1;

}

}