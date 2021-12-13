import { LightningElement,wire,api,track } from 'lwc';
import getProductsWithVarients from '@salesforce/apex/koSiteController.getProductsWithVarients';
import getProducts from '@salesforce/apex/koSiteController.getProducts';
import { NavigationMixin } from 'lightning/navigation';
import Carousel_Man1 from '@salesforce/resourceUrl/Man_v1';
import Carousel_Woman1 from '@salesforce/resourceUrl/Woman_v1';
import Carousel_Beauty1 from '@salesforce/resourceUrl/Beauty_v1';
import Carousel_Kid2 from '@salesforce/resourceUrl/Kid_v2';
export default class KoSiteCategoryProductVariantsLwc extends NavigationMixin(LightningElement) {
    //carosel images
    carousel={
        carouselMan1:Carousel_Man1,
        carouselWoman1:Carousel_Woman1,
        carouselBeauty1:Carousel_Beauty1,
        carouselKid2:Carousel_Kid2
    }
    @api recordId
    /*@wire (getProductsWithVarients,{selectedRecordId:'$recordId'})
    productsWithVarients;*/
     //Pagination
     /** Current page in the product list. */
   pageNumber = 1;
   /** The number of items on a page. */
   pageSize;
   /** The total number of items matching the selection. */
   totalItemCount = 0; 
    //products based on category
    @wire (getProducts,{category:'$recordId',pageNumber:'$pageNumber'})
    categoryProducts;
    //product details
    @track selectedRecordId
    ProductDetails(event){
        this.selectedRecordId = event.target.name;
        this[NavigationMixin.Navigate]({
           type: 'standard__recordPage',
           attributes: {
               recordId:this.selectedRecordId,
               objectApiName: 'Product2',
               actionName: 'view'
           } 
       });
    }
    //Pagination Handlers
handlePreviousPage() {
    this.pageNumber = this.pageNumber - 1;
}

handleNextPage() {
    this.pageNumber = this.pageNumber + 1;

}
}