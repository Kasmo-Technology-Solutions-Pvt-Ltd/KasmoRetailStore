import { LightningElement } from 'lwc';
import FACEBOOK_LOGO from '@salesforce/resourceUrl/facebookLogo';
import TWITTER_LOGO from '@salesforce/resourceUrl/twitterLogo';
import LINKEDIN_LOGO from '@salesforce/resourceUrl/linkedInLogo';

export default class KoSiteFooterLwc extends LightningElement {
    facebookLogo=FACEBOOK_LOGO
    twitterLogo=TWITTER_LOGO
    linkedInLogo=LINKEDIN_LOGO
}