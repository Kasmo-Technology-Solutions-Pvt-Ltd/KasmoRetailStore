@IsTest(SeeAllData = false)

/* Test class on CreateProduct */
public class createproductTest {
    static testMethod Product2 test_createnewProduct_UseCase1(){
    //createproduct obj01 = new createproduct();
   // createproduct.createnewProduct(new Product2());
   Product2 prod = new Product2();
        prod.Name = 'TestClassProduct';
        prod.IsActive=true;
        //prod.ChildCategory__c = '';
        	insert prod;
            return prod;
    
  }
/*test method to insert the data */
public static testmethod void datasetup() {
Product2 p = new Product2();
p.Name = 'xyz';
p.kasmors__Image_URL__c = 'www.image.com';
insert p;
   
}
/* test data passed on method getuserprofileinfo */
@istest static void getUserprofileInfo() {
string uid = '001';
string name = 'xyz';
List < profile > pro = [Select id, Name FROM Profile];
createproduct.getUserprofileInfo();
}

/* test data passed on method getVarDetail */
@istest static void getVarDetail() {
List < Product_Variant__c > pv = [SELECT Id, Name, kasmors__Image_Url__c FROM Product_Variant__c];
createproduct.getVarDetail('a0B5g000000GjMCEA0', 'red');
}



/* test data passed on method getCustomLookupAccount */
@istest static List < Category__c > getCustomLookupAccount() {
List < Category__c > catLookupList = [Select Id, Name From Category__c];
catLookupList = createproduct.getCustomLookupAccount('men');
return catLookupList;
    

}

/* test data passed on method getconId */
@istest static List < ContentDocumentLink > getconId() {
List<Product2> pd  = [select id from Product2 limit 1];
Id pid='01t5g000004aE5qAAE';
//for(List<Product2> pd:[select id,name from Product2 limit 1]){
//pid=pd.id;
//}
List < ContentDocumentLink > lm = [SELECT id, ContentDocumentId, ContentDocument.LatestPublishedVersionId FROM ContentDocumentLink WHERE LinkedEntityId IN(select id from Product2 where id=:pid)];
return lm;
}



/* test data passed on method getconIdofvar */
@istest static List<ContentDocumentLink> getconIdofvar() {
ID prodvar = 'a035g000004EA1pAAG';
List < ContentDocumentLink > m = [SELECT id, ContentDocumentId, ContentDocument.LatestPublishedVersionId FROM ContentDocumentLink WHERE LinkedEntityId IN(select id from Product_Variant__c WHERE Id=:prodvar)];
return m;
}
    
    
    
    
 
    
    
    
/* test data passed on method getproduct */
@istest static void getproduct() {
Integer pageNumber = 2;
List < Product2 > p = [SELECT id, Name, kasmors__Image_URL__c FROM Product2];
createproduct.getproduct(pageNumber);
}
}