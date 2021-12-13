public with sharing class koSiteController {
    public koSiteController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Coupon__c> calculateDiscount(string code){
        system.debug('Code'+code);
        List<Coupon__c> discount =  [select DiscountValue__c from Coupon__c 
                   Where CouponCode__c =:code AND Status__c = 'Active'];
           system.debug('DiscountAmount'+discount);
           return discount;
    }
   /* @AuraEnabled(cacheable=true)
    public static string getmydomain(){   
        String urlInstance=String.valueof(System.URL.getSalesforceBaseURL().gethost());
        system.debug('URL ****************************************'+urlInstance);
          String s2=urlInstance.removeEndIgnoreCase('.my.salesforce.com');
            return s2;
        }*/
    //update user details 
    @AuraEnabled
     public static void userDetailsUpdate(string Contactid,string Mobilephone , string Firstname , string Lastname , string email , date Birthdate ,  string Assistphone , string Assistname, string Gender){
            list<contact> usrDetails= [select id,Contact_Gender__c,name,FirstName,LastName,Email,MobilePhone,Birthdate,AssistantName,AssistantPhone from contact where Id=:Contactid];
            for(contact c:usrDetails){
                c.FirstName=Firstname != null ? Firstname :c.FirstName;
                c.LastName=Lastname != null ? Lastname :c.LastName;
                c.MobilePhone=Mobilephone != null ? Mobilephone :c.MobilePhone;
                c.Email=email != null ? email :c.Email;
                c.Birthdate=Birthdate != null ? Birthdate : c.Birthdate;
                c.AssistantPhone=Assistphone != null ? Assistphone : c.AssistantPhone;
                c.AssistantName=Assistname != null ? Assistname : c.AssistantName;
                c.Contact_Gender__c=Gender != null ? Gender : c.Contact_Gender__c;
            }
            update usrDetails;
     }
    //get current user details
    @AuraEnabled(cacheable=true)
    public static list<Contact> getUserDetails(string userId){
        string cId;
        //list<user> usr=[select id,ContactId from user where id=:userId];
        for(user usr:[select id,ContactId from user where id=:userId]){
            cId=(string)usr.get('ContactId');
        }
        return[select id,name,FirstName,Contact_Gender__c,LastName,Email,MobilePhone,Birthdate,AssistantName,AssistantPhone,MailingCity, MailingCountry,MailingState, MailingStreet, MailingPostalCode from contact where id=:cId];
    }
    //create address for the user
    @AuraEnabled
    public static void createAddress(string AddressType,string PinCode,string Street,string Locality,string City,string State,string ContactName, string ContactPhone ){
        Contact_Address__c CA=new Contact_Address__c();
        CA.Name=AddressType;
        CA.Contact_Name__c=ContactName;
        CA.Contact_Phone_Number__c=ContactPhone;
        CA.Contact_Pincode__c=PinCode;
        CA.Contact_Street_Address__c=Street;
        CA.Contact_Locality__c=Locality;
        CA.Contact_City__c=City;
        CA.Contact_State__c=State;
        //CA.Contact__c = UserInfo.getUserId();
        insert CA;
     }

     //update address for the user
    @AuraEnabled
    public static void updateAddress(string PinCode,string Street,string Locality,string City,string State, string ContactPhone ){
        Contact_Address__c CA=new Contact_Address__c();
        CA.Contact_Phone_Number__c=ContactPhone;
        CA.Contact_Pincode__c=PinCode;
        CA.Contact_Street_Address__c=Street;
        CA.Contact_Locality__c=Locality;
        CA.Contact_City__c=City;
        CA.Contact_State__c=State;
        update CA;
     }
     

     //user Address information
     @AuraEnabled(cacheable=true)
     public static list<Contact_Address__c> getUserAddress(){
         return [Select Id, Name,Contact_Pincode__c,Contact_Name__c,Contact_Phone_Number__c, Contact_Street_Address__c, Contact_Locality__c, Contact_State__c,Default_Address__c from Contact_Address__c  WHERE ownerId =: UserInfo.getUserId() order by CreatedDate desc ];
     }
     //user default address
     @AuraEnabled
     public static void updateUserDefaultAddress(string DefaultAddress){
        
            list<Contact_Address__c> CA= [Select Id, Name,Contact_Pincode__c,Contact_Name__c,Contact_Phone_Number__c,Default_Address__c, Contact_Street_Address__c, Contact_Locality__c, Contact_State__c from Contact_Address__c  WHERE Id=:DefaultAddress ];
            string pincode;
            for(Contact_Address__c c:CA){
                c.Default_Address__c=true;                
            }            
           update CA;                                    
     }
     //
     @AuraEnabled
     public static void updateprofiledetails(string DefaultAddress){
            list<Contact> con= [Select Id, Name,MobilePhone,FirstName,LastName,Email,Birthdate,OtherPhone from Contact  WHERE Id=:DefaultAddress ];
            for(Contact c:con){
            
            }
            update con;
     }
     @AuraEnabled(cacheable=true)
     public static list<Contact> getprofiledetails(){
            return [Select Id, Name,MobilePhone,FirstName,LastName,Email,Birthdate,OtherPhone from Contact];
     }
     //user default address
     @AuraEnabled(cacheable=true)
     public static list<Contact_Address__c> getUserDefaultAddress(){
            return [Select Id, Name,Contact_Pincode__c,Contact_Name__c,Contact_Phone_Number__c, Contact_Street_Address__c, Contact_Locality__c, Contact_State__c from Contact_Address__c  WHERE (Default_Address__c =true) AND (ownerId =: UserInfo.getUserId()) order by LastModifiedDate  desc limit 1 ];
     }
     // Wish List Products
     @AuraEnabled(cacheable=true)
     public static list<Wishlist_Product__c> getWishListProducts(){
         return [Select id , name,Product_Variant__r.Image_URL__c,Product_Variant__r.Name,Product_Variant__r.Option_1_Value__c,Product_Variant__r.Product__c,Product_Variant__r.Price__c,Product_Variant__r.Option_2_Value__c  from Wishlist_Product__c WHERE ownerId =: UserInfo.getUserId() order by CreatedDate desc ];
     }
    //Product variant Size
    @AuraEnabled(cacheable=true)
    public static list<Product_Variant_Size__C> getProductVariantSize(string selectedRecordId){
        return [select Id,Product_Variant_Size__c from Product_Variant_Size__C  where Product_Variant__r.id=:selectedRecordId order by Product_Variant_Size__c  ];
    }
    //Product Details
    @AuraEnabled(cacheable=true)
    public static list<Product2> getProduct(string selectedRecordId){
        return [select id, name,Image_URL__c, Category__r.name, Category__r.id from product2 where Id=:selectedRecordId  ];
    }
     //Poduct Variant Details tabs method
     @AuraEnabled(cacheable=true)
     public static list<Product_Variant__c> getProductVarientDetails(string selectedRecordId){
         return [SELECT id, Name,Image_URL__c,Option_1_Label__c,Option_1_Value__c,Option_2_Label__c,Option_2_Value__c,Price__c,Product__r.Id FROM Product_Variant__c WHERE Id=:selectedRecordId WITH SECURITY_ENFORCED];
     }
     @AuraEnabled(cacheable=true)
     public static list<Product_Variant__c> getVarient(string selectedRecordId){
         return [SELECT id, Name,Image_URL__c,Discription__c,Product_Size__c,Option_1_Label__c,Option_1_Value__c,Option_2_Label__c,Option_2_Value__c,Price__c,Product__r.Id FROM Product_Variant__c WHERE Id=:selectedRecordId WITH SECURITY_ENFORCED ];
     }
     
    //Category tabs method
    @AuraEnabled(cacheable=true)
    public static list<Category__c > getCategoryTabs(){
        return [select id, name from Category__c where CategoryLevel__c = 0 AND Status__c='Active' limit 5 ];
    }
    //subCategory tabs method
    @AuraEnabled(cacheable=true)
    public static list<Category__c > getSubCategoryTabs(Id categoryId){
        system.debug(categoryId); 
        return [select id, name,(select id,name from Categories__r) from Category__c where ParentCategory__c = :categoryId AND Status__c='Active' ];
    }
    
    // list of searched products
    @AuraEnabled(cacheable=true)
    public static list<product2> getSearchProducts( string searchKey){
        string searchproduct='%'+searchKey+'%';
        return [select id ,name,Image_URL__c from Product2 where name like :searchproduct limit 10 ];
    }
    //list of products for category
    static Integer PAGE_SIZE = 18;
    @AuraEnabled(cacheable=true)
    public static PagedResult getProducts( string category,Integer pageNumber){
        Integer pageSize = koSiteController.PAGE_SIZE;
    Integer offset = (pageNumber - 1) * pageSize;
    PagedResult result = new PagedResult();
    result.pageSize = pageSize;
    result.pageNumber = pageNumber;
    /*List<Category__c> p1 = [select id from Category__c where ParentCategory__c='a065g00000C1BdlAAF'];
system.debug(p1);
List<Category__c> p2 = [select id from Category__c where ParentCategory__c =:p1];
system.debug(p2);
List<Category__c> p3 = [select id,name from Category__c where ParentCategory__c =:p2];
system.debug(p3);*/
        
    result.totalItemCount = Database.countQuery('SELECT count() FROM Product2 WHERE Category__c=:category OR Sub_Category__c=:category OR ChildCategory__c=:category ');
    result.records = Database.query('SELECT id, Name,Image_URL__c FROM Product2 where Category__c=:category OR Sub_Category__c=:category OR ChildCategory__c=:category LIMIT :pageSize OFFSET :offset');
    //result.records = Database.query('SELECT id, Name,Image_URL__c,Category__r.id FROM Product2 WHERE Category__r.Id=:category LIMIT :pageSize OFFSET :offset');
    return result;
    //Changed By Seetha
    // return [select id, name,Image_URL__c, Category__r.name, Category__r.id from product2 where Category__r.id=:category];
    }
    //List of Product Variants
    static Integer VPAGE_SIZE = 18;
    @AuraEnabled(cacheable=true)
    public static list<Product_Variant__c> getProductsWithVarients(string selectedRecordId){
        //changed by Seetha
        return[select id , name,Option_1_Label__c,Product_Size__c,Image_URL__c, Option_1_Value__c ,Option_2_Label__c, Option_2_Value__c , Price__c,Product__r.id from Product_Variant__c  where Product__r.Id =:selectedRecordId ];
    }
    // Wrapper class For Pagination
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
    //New Product Variant Detail Component
    @AuraEnabled(cacheable=true)
     public static Id getFirstProductVarient(string selectedRecordId){
        Product_Variant__c firstProductVariantId=[SELECT id, Name,Image_URL__c,Product_Size__c,Option_1_Label__c,Option_1_Value__c,Option_2_Label__c,Option_2_Value__c,Price__c,Product__r.Id FROM Product_Variant__c WHERE Product__r.Id=:selectedRecordId  LIMIT 1];
        return  firstProductVariantId.Id;
        //return [SELECT id, Name,Image_URL__c,Product_Size__c,Option_1_Label__c,Option_1_Value__c,Option_2_Label__c,Option_2_Value__c,Price__c,Product__r.Id FROM Product_Variant__c WHERE Product__r.Id=:selectedRecordId  LIMIT 1];
     }
    @AuraEnabled(cacheable=true)  
     public static list<Product_Variant__c> getProductVarientDetailsNew(string selectedRecordId){
        list <AggregateResult> valueList=[ select Option_1_Value__c from Product_Variant__c where Product__r.Id=:selectedRecordId group by Option_1_Value__c];
        list<Product_Variant__c> pvclist=new list<Product_Variant__c>();
        for(AggregateResult aggr :valueList){
            string value= (string)aggr.get('kasmors__Option_1_value__c');
            Product_Variant__c pvc = [select id,Image_URL__c,Option_1_Value__c from Product_Variant__c where (Product__r.Id=:selectedRecordId) AND (Option_1_value__c =:value) limit 1];
        pvclist.add(pvc);
        }
        system.debug('Variant URL' +pvclist);
        return pvclist;
        //return [select id,Image_URL__c from Product_Variant__c where (Product__r.Id=:selectedRecordId) AND (Option_1_value__c in :valueList)]
         //return [SELECT Name,Image_URL__c FROM Product_Variant__c where Product__r.Id=:selectedRecordId  group by Name,Image_URL__c ];
     }
     @AuraEnabled(cacheable=true)
     public static list<Product_Variant__c> getVarientNew(string selectedProductVariantId){
         return [SELECT id, Name,Image_URL__c,Product_Size__c,Option_1_Label__c,Option_1_Value__c,Option_2_Label__c,Option_2_Value__c,Price__c,Product__r.Id FROM Product_Variant__c WHERE Id=:selectedProductVariantId  LIMIT 1];
     }
     @AuraEnabled(cacheable=true)
     public static list<Product_Variant__c> getVarientSizes(string selectedProductVariantId){
        string ImageUrl;
         list<Product_Variant__c> VariantImageUrl=new list<Product_Variant__c>();
         VariantImageUrl=[SELECT id,Image_URL__c,Price__c, Product__r.Id FROM Product_Variant__c WHERE Id=:selectedProductVariantId];
         for(Product_Variant__c pvSize :VariantImageUrl ){
             ImageUrl= (string)pvSize.get('kasmors__Image_URL__c');
         }
         list<Product_Variant__c> VariantSizeList=new list<Product_Variant__c>();
         VariantSizeList=[SELECT Id,Price__c,Option_2_Value__c from Product_Variant__c where Image_URL__c=:ImageUrl];
        return VariantSizeList;
         //return [SELECT id, Name,Product_Size__c,Option_1_Label__c,Option_1_Value__c,Option_2_Label__c,Option_2_Value__c,Price__c,Product__r.Id FROM Product_Variant__c where Option_1_Value__c='blue'];
     }
     //End of new product variant detail component
     @AuraEnabled
     public static void cartQuantityUpdate(String CartId,Integer Quantity){
        list<Cart_Product__c> cpList=[Select Id,Quantity__c from Cart_Product__c WHERE Id=:CartId];
        for(Cart_Product__c cp:cpList){
            cp.Quantity__c=Quantity;
        }
        update cpList;
   
     }
     
     
     @AuraEnabled(cacheable=true)
     public static integer getTotalCartProductsAmount(string selectedProductVariantId){
        integer totalPrice=0;
        list<Cart_Product__c> cpList=[Select Id,Quantity__c,Product_Variant__r.Price__c from Cart_Product__c   WHERE ownerId =: UserInfo.getUserId() order by CreatedDate desc];
        for(Cart_Product__c cp:cpList){
            if(cp.Product_Variant__r.Price__c != null){
                totalPrice += integer.valueof(cp.Product_Variant__r.Price__c)*integer.valueof(cp.Quantity__c);
            

            }
        }
        return totalPrice;
    }
    @AuraEnabled(cacheable=true)
    public static List<Cart_Product__c> getCartProducts(){
           return [Select Id ,name,Quantity__c,Product_Variant__r.Price__c,Product_Variant__r.Name,Product_Variant__r.Image_URL__c,Product_Variant__r.Product__c,Product_Variant__r.Option_1_Value__c, Product_Variant__r.Option_2_Value__c  from Cart_Product__c  WHERE ownerId =: UserInfo.getUserId() order by CreatedDate desc];
     } 
      @AuraEnabled(cacheable=true)
     public static void  editprofile(string firstname,string lastname, string email  ){
         Contact con=[select id,Firstname,Lastname,Email from Contact WHERE ownerId =: UserInfo.getName() ];
          User u= [select id, Firstname,Lastname,Email from User where Name=:UserInfo.getName()];
      con.Firstname=firstname;
      con.Lastname=lastname;
      con.Email=email;
      update con;
      u.Firstname=firstname;
      u.Lastname=lastname;
      u.Email=email;
      update u; 
    }

            /*Add to Bag Methods*/
    @AuraEnabled
    public static Integer  getCarts(string productId){
         system.debug('productid='+productId );
       // Product_Variant__c   prod= [select id , name, Option_1_Label__c ,Image_URL__c, Option_1_value__c	 ,Option_2_Label__c, Option_2_Value__c	 , Price__c,Product__r.id from Product_Variant__c where Id=:productId];
        //system.debug('productid='+productId + 'productsize='+prod);
        Cart_Product__c cart = new Cart_Product__c();
        cart.Product_Variant__c=productId;
        cart.Quantity__c=1;
        system.debug('productid=inserting the cartrecords' );
        insert cart;
       // user us= [select id,Alias from user where Alias='SRedd' ];
        List<Cart_Product__c> currentCarts =[SELECT Id, Name, Product_Variant__r.Name
                                            FROM Cart_Product__c WHERE ownerId =: UserInfo.getUserId()];
         return currentCarts.size();
      }
            /* Delete product from the Cart Product list*/ 
            @AuraEnabled
                public static Cart_Product__c deleteProducts(Cart_Product__c products) {
                    delete products;
                    return products;
}
/*Get Count of Items in the Cart*/
       @AuraEnabled(cacheable=true)
       public static Integer getCartCount(){
       Integer i = [ SELECT COUNT() FROM Cart_Product__c WHERE ownerId =: UserInfo.getUserId() ]; 
           return i;
}


/** Add to Wishlist Method */
  /*Add to Bag Methods*/
  @AuraEnabled
  public static Integer  getWishlists(string productId){
    //    system.debug('productid='+productId );     
      Wishlist_Product__c wishlist = new Wishlist_Product__c();
      wishlist.Product_Variant__c=productId;
      system.debug('productid=inserting the wishlistrecords' );
      insert wishlist;
      List<Wishlist_Product__c> currentWishlists =[SELECT Id, Name, Cart_Product__r.Name
                                          FROM Wishlist_Product__c WHERE ownerId =: UserInfo.getUserId()];
       return currentWishlists.size();
    } 

    @AuraEnabled
    public static List<Cart_Product__c> moveToOrder(){
        // OrderItem orders=new OrderItem();
        List<Cart_Product__c> pv=new List<Cart_Product__c>();
        List<Cart_Product__c> cp=[SELECT Id , Quantity__c,Product_Variant__r.Id  FROM Cart_Product__c WHERE ownerId =: UserInfo.getUserId()];
        
        return cp;


    }

   @AuraEnabled(cacheable=true)
    public static List<OrderItems__c> getorders(){
         //OrderItem orders=new OrderItem();
        List<OrderItems__c> order = [SELECT id, Name , Quantity__c, Product_Variant__r.Id, Product_Variant__r.Name,Product_Variant__r.Price__c ,Product_Variant__r.Image_URL__c ,Product_Variant__r.Option_2_Value__c,Product_Variant__r.Option_1_Value__c 
        FROM OrderItems__c];
        // WHERE User__c =: UserInfo.getUserId()];
System.debug('getorder method frm class');
        return order;
    }
    @AuraEnabled
    public static void deleteorder()
    {
    List<OrderItems__c> li= [SELECT id from OrderItems__c];
    delete li;
    }
    
    @AuraEnabled
    public static void deletecart(Id cart)
    {
    List<Cart_Product__c> li= [SELECT id from Cart_Product__c where id=:cart];
    delete li;
    }
    
}