import { LightningElement,api,track,wire } from 'lwc';
import getUserDetails from '@salesforce/apex/koSiteController.getUserDetails';
import userDetailsUpdate from '@salesforce/apex/koSiteController.userDetailsUpdate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';

export default class KoSiteEditProfileLwc extends NavigationMixin(LightningElement) {
    @api recordId;
    @track userData
    @wire(getUserDetails,{userId:'$recordId'})
    userData;
    @track userMobile
    mobileHandler=(event)=>{
        this.userMobile=event.target.value;
    }
    @track userFirstName
    firstNameHandler=(event)=>{
        this.userFirstName=event.target.value;
    }
    @track userLastName
    lastNameHandler=(event)=>{
        this.userLastName=event.target.value;
    }
    @track userEmail
    emailHandler=(event)=>{
        this.userEmail=event.target.value;
    }
    @track birthDate
    birthDateHandler=(event)=>{
        this.birthDate=event.target.value
    }
    @track location
    locationHandler=(event)=>{
        this.location=event.target.value
    }
    @track assistPhone
    assistPhoneHandler=(event)=>{
        this.assistPhone=event.target.value
    }
    @track assistName
    assistNameHandler=(event)=>{
        this.assistName=event.target.value
    }
    userGender
    genderHandler=(event)=>{
        this.userGender=event.target.value
        if(this.userGender === 'Male'){
            this.template.querySelector('.genderButtonMale').classList.add('selectedGenderButton');
            this.template.querySelector('.genderButtonFemale').classList.remove('selectedGenderButton'); 
        }else if(this.userGender === 'Female'){
            this.template.querySelector('.genderButtonFemale').classList.add('selectedGenderButton');
            this.template.querySelector('.genderButtonMale').classList.remove('selectedGenderButton');
        }else{
            this.template.querySelector('.genderButtonMale').classList.remove('selectedGenderButton'); 
            this.template.querySelector('.genderButtonFemale').classList.remove('selectedGenderButton');
        }
        
    }
    changePasswordHandler(){
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
            url: "/login/ForgotPassword"
            }
        });
    }
    @track conId
    userUpdateHandler(event) {
        this.conId=event.target.name
        if(this.userMobile || this.userFirstName || this.userLastName || this.userEmail || this.birthDate || this.assistPhone || this.assistName || this.userGender){
            userDetailsUpdate({Contactid : this.conId, Mobilephone: this.userMobile, 
                Firstname: this.userFirstName, Lastname: this.userLastName , 
                email: this.userEmail , Birthdate:this.birthDate , Location: this.location , Assistphone:this.assistPhone , Assistname:this.assistName , Gender: this.userGender})
                .then(() => {   
                    const event = new ShowToastEvent({
                        title: "Success!",
                        message: 'Updated the Details Successfully',
                        variant: 'success',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(event);
                    refreshApex(this.userData);
                    this.userMobile=null,this.userFirstName=null,this.userLastName=null,this.userEmail=null
                })
                .catch(error => {
                    this.error = error;
                });
        }
        else{
            const event = new ShowToastEvent({
            title: 'No Changes',
            message: 'No Changes Updated',
            variant: 'error',
            mode: 'dismissable'
            });
            this.dispatchEvent(event);
         }
    }
}