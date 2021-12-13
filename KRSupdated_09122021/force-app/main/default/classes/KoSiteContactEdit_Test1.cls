@isTest
public class KoSiteContactEdit_Test1 {
    Static testmethod void myTest(){
        Contact c = new Contact();
        c.Email='testing@gmail.com';
        c.LastName='Testing';
        c.FirstName='Salesforce';
        insert c;
        c.FirstName='Trigger';
        update c;
    }
    
}