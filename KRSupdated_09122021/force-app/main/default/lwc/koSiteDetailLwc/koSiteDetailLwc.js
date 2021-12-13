import { LightningElement,wire,track,api } from 'lwc';
import Carousel_Man1 from '@salesforce/resourceUrl/Man_v1';
import Carousel_Man2 from '@salesforce/resourceUrl/Man_v2';
import Carousel_Woman1 from '@salesforce/resourceUrl/Woman_v1';
import Carousel_Woman2 from '@salesforce/resourceUrl/Woman_v2';
import Carousel_Beauty1 from '@salesforce/resourceUrl/Beauty_v1';
// import Carousel_Beauty2 from '@salesforce/resourceUrl/Beauty_v2';
import Carousel_Kid1 from '@salesforce/resourceUrl/Kid_v1';
import Carousel_Kid2 from '@salesforce/resourceUrl/Kid_v2';

export default class KoSiteDetailLwc extends LightningElement {
    carousel={
        carouselMan1:Carousel_Man1,
        carouselMan2:Carousel_Man2,
        carouselWoman1:Carousel_Woman1,
        carouselWoman2:Carousel_Woman2,
        carouselBeauty1:Carousel_Beauty1,
        // carouselBeauty2:Carousel_Beauty2,
        carouselKid1:Carousel_Kid1,
        carouselKid2:Carousel_Kid2,
    }
    
}