import { LightningElement, wire } from 'lwc';
import getorders from '@salesforce/apex/orderController.getorders';
import Kasmo_Logo from '@salesforce/resourceUrl/kasmologo';
import getorderItem from '@salesforce/apex/orderController.getorderItem';
import getstatus from '@salesforce/apex/orderController.getstatus';
import getdeliverdOrder from '@salesforce/apex/orderController.getdeliverdOrder';

import { updateRecord } from 'lightning/uiRecordApi';
import KASMORS__ID_FIELD from '@salesforce/schema/MyOrder__c.Id';
import KASMORS__STATUS_FIELD from '@salesforce/schema/MyOrder__c.Status__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';




export default class KositeOrder extends LightningElement {
    logo = Kasmo_Logo;
    Demo;

    
    @wire(getorders) getorderdata;
    
    

    
    
    connectedCallback() {
        refreshApex(this.getorderdata);

    }
   
    
//     (data,error){
//         if(data){
//    console.log('Displayed Values')
//        }
//         else if(error){
//             console.log('Values Not Displayed');
//         }
//     }
    

    @wire(getdeliverdOrder)getdeliverd;
    // ({ data, error }) {
    //     if (data) {
    //         console.log("result" + data[0].Status__c);
    //     }
    //     else
    //     {
    //         console.log("no data");
    //     }
    // }


    OrderId;
    orderItemList;
    onorderclick(event) {
        // let today = new Date();

        // today.setDate(today.getDate() + 7)
        // console.log(today);
        // let da = today.toISOString().slice(0, 10);
        // console.log(da);


         refreshApex(this.getorderItem);
        this.OrderId=event.target.getAttribute('name');
        getorderItem({ orderId: this.OrderId }).then(response => {
            if (response) {
                this.orderItemList = response;
                console.log(this.orderItemList);
            }
        });
    }
    
    cancelID;
    cancelClick(event) {
        let orderstatus;
        this.cancelID = event.target.getAttribute('name');
        
        getstatus({ orderId: this.cancelID }).then(result => {
            orderstatus = result[0].kasmors__Status__c;
            if (orderstatus === 'Shipped') {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: ' Order Already Shipped: Cannot Cancel the Order ',
                        variant: 'error',
                    }),
                );
            }
            else {
                const fields = {};
                fields[KASMORS__ID_FIELD.fieldApiName] = this.cancelID;
                fields[KASMORS__STATUS_FIELD.fieldApiName] = 'Cancelled';
                const recordInput = { fields };
                updateRecord(recordInput).then(() => {
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Order Cancelled ',
                        variant: 'success'
                    })
                });
                return refreshApex(this.getorderdata);
            }

        });
    }
}