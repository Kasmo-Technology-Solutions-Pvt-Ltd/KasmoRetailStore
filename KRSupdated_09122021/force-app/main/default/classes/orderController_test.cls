@isTest
/*Test class on orderController*/
public class orderController_test {
/* instantiation is created to add the records of every object in the test class*/
public static testmethod void getAccount(){
test.starttest();
List< Account> newlist= orderController.getAccount();
List< Contact_Address__c> newlist1= orderController.getAddress();
List< MyOrder__c> newlist2= orderController.getOrders();
List<Cart_Product__c> newlist3= orderController.moveToOrder();
List< MyOrder__c> newlist4= orderController.getdeliverdOrder();
List< MyOrder__c> newlist5= orderController.getstatus('a0C5g000001qSyEAZs');
List< OrderItems__c> newlist6= orderController.getorderItem('a0B5g000000evBoEAI');
    
//static testMethod void test_deleteorder_UseCase1(){
    orderController controller = new orderController();
    orderController.deleteorder('01p90000006uk2w');
  
test.stopTest();
}
/* Passing parameter to deletecart method*/
@istest static void deletecart()
{

List<Cart_Product__c> c = [select Id from Cart_Product__c];
orderController.deletecart('a0B5g000000GjMCEA5');
}

}