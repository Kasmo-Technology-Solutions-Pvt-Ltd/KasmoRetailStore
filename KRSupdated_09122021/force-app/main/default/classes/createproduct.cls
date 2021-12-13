public with sharing class createproduct {
    @AuraEnabled
    public static Product2 createnewProduct(Product2 prod) {

        System.debug('prod'+prod);
    
            insert prod;
            return prod;
        
    }
    @AuraEnabled
    public static ContentDocumentLink getconId(ID pd) {

       return [SELECT id, ContentDocumentId, ContentDocument.LatestPublishedVersionId FROM ContentDocumentLink WHERE LinkedEntityId IN (select id from Product2 WHERE Id=:pd)]; 
    } 

    @AuraEnabled
    public static ContentDocumentLink getconIdofvar(Id prodvar) {

       return [SELECT id, ContentDocumentId, ContentDocument.LatestPublishedVersionId FROM ContentDocumentLink WHERE LinkedEntityId IN (select id from Product_Variant__c WHERE Id=:prodvar)]; 
    } 


    static Integer PAGE_SIZE = 21;
    @AuraEnabled(cacheable=true)
    public static  PagedResult  getproduct(Integer pageNumber) {
        Integer pageSize = createproduct.PAGE_SIZE;
        Integer offset = (pageNumber - 1) * pageSize;
        PagedResult result = new PagedResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;
        result.totalItemCount = Database.countQuery('SELECT count() FROM Product2');
        String mysoql='SELECT id, Name , Image_URL__c FROM Product2 ORDER BY CreatedDate desc ';
        result.records = Database.query(mysoql+'LIMIT :pageSize OFFSET :offset');
        return result;

    //    return [SELECT id, Name , Image_URL__c FROM Product2 ORDER BY CreatedDate desc]; 
    } 

    @AuraEnabled(cacheable=true)
    public static List<Profile> getUserprofileInfo(){
      Id profileId = UserInfo.getProfileId();
      return [Select id, Name FROM Profile WHERE id=:profileId];
       
    }


    @AuraEnabled
    public static List<Product_Variant__c>  getVarDetail(Id prodId, string option  ){
      return [SELECT Id, Name, Image_Url__c FROM Product_Variant__c WHERE (Product__c = :prodId) AND (Option_1_Value__c= :option) LIMIT 1];
    }
    public with sharing class PagedResult {
        @AuraEnabled
        public Integer pageSize { get; set; }
    
        @AuraEnabled
        public Integer pageNumber { get; set; }
    
        @AuraEnabled
        public Integer totalItemCount { get; set; }
    
        @AuraEnabled
        public Object[] records { get; set; }
    }
    @AuraEnabled(cacheable=true)
    public static List<Category__c> getCustomLookupAccount (String catName){
       List<Category__c> catLookupList =  new List<Category__c>();
       if(catName != ''){
           String categoryName = '%' + catName + '%';
           catLookupList = [Select Id, Name From Category__c Where Name like:categoryName];
           return catLookupList;
       }
       return catLookupList;
    }
    
}