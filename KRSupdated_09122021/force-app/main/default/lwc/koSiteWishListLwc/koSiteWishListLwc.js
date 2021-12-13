import { LightningElement, wire, track, api } from 'lwc';
import getWishListProducts from '@salesforce/apex/koSiteController.getWishListProducts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCarts from '@salesforce/apex/koSiteController.getCarts';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

function refreshPage() {
    location.reload();
}
export default class KoSiteWishListLwc extends NavigationMixin(LightningElement) {
    @track getWishListProducts
    @track error
    @wire(getWishListProducts)
    wishListProduct;
    wishListProductId

    connectedCallback() {
        refreshApex(this.wishListProduct);
    }
    removeHandler(event) {
        this.wishListProductId = event.target.name
        deleteRecord(this.wishListProductId)
            .then(() => {
                const toastEvent = new ShowToastEvent({
                    title: 'Wish List Product Deleted',
                    message: 'Wish List Product removed successfully',
                    variant: 'success',
                })
                this.dispatchEvent(toastEvent);
                 refreshApex(this.wishListProduct);

            })
            .catch(error => {
                window.console.log('Unable to delete record due to ' + error.body.message);
            });
    }
    @track selectedProductVariantSize
    moveToBagHandler(event) {
        this.selectedProductVariantSize = event.target.name;
        this.wishListProductId = event.target.dataset.id;
        getCarts({ productId: this.selectedProductVariantSize })
            .then(result => {
                this.cartproducts = result;
                const event = new ShowToastEvent({
                    title: "Success!",
                    message: 'Added to Bag', 
                    variant: 'success',
                });
                this.dispatchEvent(event);
                deleteRecord(this.wishListProductId);
                refreshApex(this.wishListProduct);
                eval("$A.get('e.force:refreshView').fire();");
            })
            .catch(error => {
                this.error = error;
            });
    }
    @track productVariantId
    productDetails(event) {
        this.productVariantId = event.target.name
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.productVariantId,
                objectApiName: 'Product2',
                actionName: 'view'
            }
        });
    }


    goToHome() {

        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            },
        });

    }

}