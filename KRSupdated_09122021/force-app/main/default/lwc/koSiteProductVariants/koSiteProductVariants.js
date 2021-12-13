import { LightningElement,wire,api,track } from 'lwc';
import getProductsWithVarients from '@salesforce/apex/koSiteController.getProductsWithVarients';
import getVarient from '@salesforce/apex/koSiteController.getVarient';
import getProduct from '@salesforce/apex/koSiteController.getProduct';
import getProductVariantSize from '@salesforce/apex/koSiteController.getProductVariantSize';
import getCarts from '@salesforce/apex/koSiteController.getCarts';
import getWishlists from '@salesforce/apex/koSiteController.getWishlists';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCartCount from '@salesforce/apex/koSiteController.getCartCount';
import { refreshApex } from '@salesforce/apex';

//new Product Variant component
import getVarientSizes from '@salesforce/apex/koSiteController.getVarientSizes';
import getProductVarientDetailsNew from '@salesforce/apex/koSiteController.getProductVarientDetailsNew';
import getVarientNew from '@salesforce/apex/koSiteController.getVarientNew';
import getFirstProductVarient from '@salesforce/apex/koSiteController.getFirstProductVarient';
function refreshPage() {
    location.reload();
   }
export default class KoSiteProductVariants extends NavigationMixin(LightningElement) {   
    connectedCallback() {
        refreshApex(this.totalCartItems);
    }
     //count cart
     @wire(getCartCount)
     totalCartItems;
     // page refresh method
     
    @api recordId
    variantId
    @wire (getProductVariantSize,{selectedRecordId:'$variantId'})
    productVariantSizes;
    @wire (getProduct,{selectedRecordId:'$recordId'})
    product;
    @wire (getProductsWithVarients,{selectedRecordId:'$recordId'})
    productsWithVarients;
    @wire (getVarient,{selectedRecordId:'$variantId'})
    productVarient;
    ProductVariantDetails(event){
        this.variantId=event.target.name
        }
    //New product Variant Detail Component
    @track data
    @wire (getFirstProductVarient,{selectedRecordId:'$recordId'})
    wiredRecordsMethod({ error, data }) {
        console.log('Hello'+data);
        if (data) {
            this.data  = data;
            this.error = undefined;
            this.productVariantId=data
        } else if (error) {
            this.error = error;
            this.data  = undefined;
        }
    }
    productVariantId
    ProductVariantDetailsNew(event){
        this.productVariantId=event.target.name
    }
    @wire (getProductVarientDetailsNew,{selectedRecordId:'$recordId'})
    productsWithVarientsNew;
    @wire (getVarientNew,{selectedProductVariantId :'$productVariantId'})
    productVarientNew;
    @wire (getVarientSizes,{selectedProductVariantId :'$productVariantId'})
    productVarientNewSizes;
    @track changeSizeButtonStyle = true;
    get changeButtonStyle(){
      //if changeStle is true, getter will return class1 else class2
        return this.changeSizeButtonStyle ? 'productVariantSize': 'productVariantSizeSelected';
    }
    @track selectedProductVariantSize
    isSelected=false
    SizeButtonHandler(event){
       // this.template.querySelector('productVariantSize').classList.add('border: 1px solid #b81c89;');
        //alert(event.target.name)
        this.isSelected=true
        this.selectedProductVariantSize=event.target.name
        if(this.selectedProductVariantSize){
            this.changeSizeButtonStyle = !this.changeSizeButtonStyle
        }
    }
     //Add to Bag handler
     @track cartproducts;
     @track error;
     cartdetails() {       
         //alert('productid='+this.selectedProductVariantSize);
         if(this.selectedProductVariantSize){
            getCarts({productId:this.selectedProductVariantSize})
                 .then(result => {    
                     this.cartproducts = result;
                     const event = new ShowToastEvent({
                         title: "Success!",
                         message: 'Added to Bag',
                         variant: 'success',
                     });
                     this.dispatchEvent(event);
                     refreshApex(this.wishproducts);
                     refreshApex(this.totalCartItems);
                     eval("$A.get('e.force:refreshView').fire();");
                 })
                 .catch(error => {
                     this.error = error;
                 });
                 this.selectedProductVariantSize=null
                 
         }else{
            const event = new ShowToastEvent({
                title: 'OOPS',
            message: 'Please Select The Product Size',
            variant: 'error',
            mode: 'dismissable'
            });
            this.dispatchEvent(event);
         }
             
         }
         wishlistdetails() {
            if(this.selectedProductVariantSize){
                 //alert(this.cartId);
                getWishlists({productId:this.selectedProductVariantSize})
            //   deleteRecord(this.cartId)
                    .then(result => {   
                        this.wishproducts = result;
                        const event = new ShowToastEvent({
                            title: "Success!",
                            message: 'Added to Wishlist',
                            variant: 'success',
                        });
                        this.dispatchEvent(event);
                        this.selectedProductVariantSize=null           
                    })
                    .catch(error => {
                        this.error = error;
                    });
                    this.selectedProductVariantSize=null           
            }
            else{
                const event = new ShowToastEvent({
                    title: 'OOPS',
                message: 'Please Select The Product Size',
                variant: 'error',
                mode: 'dismissable'
                });
                this.dispatchEvent(event);
             }
        }
}