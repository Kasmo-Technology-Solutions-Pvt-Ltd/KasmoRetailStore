@IsTest(SeeAllData = true)
public with sharing class LightningLoginFormControllerTest {
    
  static testMethod void test_login_UseCase1(){
    LightningLoginFormController loginform = new LightningLoginFormController();
    LightningLoginFormController.login('samuda','password','test data');
  }
  //Test class for LoginFormController  
 @IsTest
 static void LightningLoginFormControllerInstantiation() {
  LightningLoginFormController controller = new LightningLoginFormController();
  System.assertNotEquals(controller, null);
 }

 @IsTest
 static void testIsUsernamePasswordEnabled() {
  System.assertEquals(true, LightningLoginFormController.getIsUsernamePasswordEnabled());
 }

 @IsTest
 static void testIsSelfRegistrationEnabled() {
  System.assertEquals(false, LightningLoginFormController.getIsSelfRegistrationEnabled());
 }
 
 //Test class for SelfRegistrationURL 
 @IsTest
 static void testGetSelfRegistrationURL() {
  System.assertEquals(null, LightningLoginFormController.getSelfRegistrationUrl());
 }
   
    static testMethod void test_getForgotPasswordUrl_UseCase1(){
    LightningLoginFormController obj01 = new LightningLoginFormController();
    LightningLoginFormController.getForgotPasswordUrl();
  }

 //Test Class for Authconfig   
 @IsTest
 static void testAuthConfig() {
  Auth.AuthConfiguration authConfig = LightningLoginFormController.getAuthConfig();
  System.assertNotEquals(null, authConfig);
 }
    static testMethod void test_setExperienceId_UseCase1(){
    LightningLoginFormController obj01 = new LightningLoginFormController();
    LightningLoginFormController.setExperienceId('test data');
  }
}