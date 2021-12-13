@isTest
private class koSiteControllerOne_Test{
    
    //Test class for Getting user Details of Current User 
    static testMethod void test_getUserDetails_UseCase1(){
        
    //Instantiate a new controller with all parameters in the page    
    koSiteControllerOne obj = new koSiteControllerOne();
    List<contact > con = kositeControllerone.getuserDetails(userinfo.getuserid());
    koSiteControllerOne.getUserDetails('testing');
  }
}