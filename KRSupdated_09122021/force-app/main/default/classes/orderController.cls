public with sharing class orderController {
   @AuraEnabled(cacheable=true)
   public static List< Account>  getAccount(){
       return [SELECT id ,Name from Account WHERE name='Myntra'];
   }

   @AuraEnabled(cacheable=true)
   public static List< Contact_Address__c>  getAddress(){
       return [SELECT id ,Name	 from Contact_Address__c WHERE  ownerId =: UserInfo.getUserId() AND Default_Address__c=true order by LastModifiedDate desc LIMIT 1];
   }
  
   @AuraEnabled(cacheable=true)
   public static List< MyOrder__c>  getorders(){
       return [SELECT Id,Total_Price__c	,Contact_Address__r.Contact_Name__c, Contact_Address__r.Contact__c,Contact_Address__r.Contact_Street_Address__c,Contact_Address__r.Contact_Locality__c,Contact_Address__r.Contact_City__c,Contact_Address__r.Contact_State__c	,Contact_Address__r.Contact_Pincode__c	,Contact_Address__r.Contact_Phone_Number__c	,StartDate__c   ,Status__c,Name from MyOrder__c WHERE ownerId =: UserInfo.getUserId() order by CreatedDate desc ];
   }

   @AuraEnabled
    public static List<Cart_Product__c> moveToOrder(){
    return [SELECT Id , Quantity__c,Product_Variant__r.Id,Product_Variant__r.Price__c  FROM Cart_Product__c WHERE ownerId =: UserInfo.getUserId()];
    
    }

    @AuraEnabled

    public static void deleteorder(Id oId)
    {
    List<Order> li= [SELECT id from Order WHERE id=:oId ];
    delete li;
    }

    
    @AuraEnabled
    public static void deletecart(Id cart)
    {
    List<Cart_Product__c> li= [SELECT Id from Cart_Product__c WHERE Id=:cart ];
    delete li;
    }

    @AuraEnabled
   public static List< OrderItems__c>  getorderItem(Id orderId){
       return [SELECT Id,Product_Variant__r.Id,Product_Variant__r.Name,Product_Variant__r.Image_URL__c,Quantity__c,TotalPrice__c,UnitPrice__c  from OrderItems__c WHERE MyOrder__r.Id=:orderId  ];
   }
   @AuraEnabled
   public static List< MyOrder__c>  getstatus(Id orderId){
       return [SELECT Id,Status__c from MyOrder__c WHERE Id=:orderId  ];
   }

   
   @AuraEnabled(cacheable=true)
   public static List< MyOrder__c>  getdeliverdOrder(){
    return [SELECT Id,Total_Price__c	,Contact_Address__r.Name, Contact_Address__r.Contact_Name__c,Contact_Address__r.Contact_Street_Address__c,Contact_Address__r.Contact_Locality__c,Contact_Address__r.Contact_City__c,Contact_Address__r.Contact_State__c	,Contact_Address__r.Contact_Pincode__c	,Contact_Address__r.Contact_Phone_Number__c	,StartDate__c   ,Status__c,Name from MyOrder__c WHERE Status__c ='Delivered' AND  ownerId =: UserInfo.getUserId()];
}
}