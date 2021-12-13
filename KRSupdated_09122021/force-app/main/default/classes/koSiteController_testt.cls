

@isTest
public class koSiteController_testt {
@istest static void deletecart()
{
//Integer uid =001;
List<Cart_Product__c> c = [select Id from Cart_Product__c];
koSiteController.deletecart('a0B5g000000GjMCEA5');
}
@istest static void deleteorder(){
List<OrderItems__c> n1= [SELECT id from OrderItems__c];
koSiteController.deleteorder();
}
@istest static void getWishlists(){
//ID productId='W-93';
Product2 p = new Product2();
p.Name = ' Test Product ';
p.Description='Test Product Entry For Product';
p.productCode = 'SFDCPanther-123';
p.isActive = true;
insert p;
Product_Variant__c pv = new Product_Variant__c();
pv.Name = ' Test Product ';
pv.Price__c = 455.00;
pv.Product__c = p.Id;
insert pv;
Wishlist_Product__c wishlist = new Wishlist_Product__c();
wishlist.Product_Variant__c= pv.Id;
test.startTest();
insert wishlist;
test.stopTest();
List<Wishlist_Product__c> currentWishlists = [SELECT id from Wishlist_Product__c];
koSiteController.getWishlists(pv.Id);

}
@istest static void cartQuantityUpdate(){
List<Cart_Product__c> o1= [SELECT id from Cart_Product__c];
koSiteController.cartQuantityUpdate('a055g000000cF4IAAU',1);
}
@istest static void getVarientNew(){
List<Product_Variant__c> p1= [SELECT id from Product_Variant__c];
koSiteController.getVarientNew('a035g000002lsLIAAY');
}
@istest static void getVarientSizes(){
List<Product_Variant__c> p1= [SELECT id from Product_Variant__c];
koSiteController.getVarientSizes('a035g000002lsLIAAY');
}
@istest static void getProductVarientDetailsNew(){
List<Product_Variant__c> t1= [SELECT id from Product_Variant__c];
koSiteController.getProductVarientDetailsNew('a035g000004EA1kAAG');

}

@istest static void getSearchProducts(){
List<product2> p1= [SELECT id from product2];
koSiteController.getSearchProducts('shirt');
}
    @istest static void getSubCategoryTabs(){
        Id catId='a035g000002lsLIAAY';
        List<Category__c> cat =[select id,name from Category__c];
        koSiteController.getSubCategoryTabs(catId);
    }


public static testmethod void userDetailsUpdate(){
Contact ca = new Contact();
ca.FirstName='Praveen';
ca.LastName='Ankale';
ca.MobilePhone='9972213212';
ca.Email='pravee@gmail.com';
// ca.Birthdate='10/6/2020';
insert ca;
String ContactId= ca.id;



test.starttest();
koSiteController.userDetailsUpdate(ContactId, ca.Mobilephone, ca.Firstname, ca.Lastname, ca.Email, date.today(), '9972213212', 'Assistname', 'Male');
List<Category__c> NewList = koSiteController.getCategoryTabs();
//List<Category__c> NL = koSiteController.getSubCategoryTabs('a0C5g000001qSyFEAU');
List<Contact> NewList2 = koSiteController.getprofiledetails();
List<Contact_Address__c> NewList3 = koSiteController.getUserDefaultAddress();
List<Wishlist_Product__c> NewList4 = koSiteController.getWishListProducts();
List<Contact_Address__c> NewList5 =koSiteController.getUserAddress();
List<product2> NewList6 = koSiteController.getSearchProducts('Saree');
List<Product_Variant__c> NewList7 = koSiteController.getProductsWithVarients('a0C5g000001qSyFEAU');
List<Product_Variant__c> NewList8 =koSiteController.getProductVarientDetailsNew('a0C5g000001qSyFEAU');
List<Product_Variant_Size__C> NewList9 = koSiteController.getProductVariantSize('M');
List<Product2> NewList10 = koSiteController.getProduct('a0C5g000001qSyFEAU');
List<Cart_Product__c>NewList11=koSiteController.moveToOrder();
List<Product_Variant__c> NewList12 = koSiteController.getProductVarientDetails('a0C5g000001qSyFEAU');
List<Product_Variant__c>NewList13= koSiteController.getVarient('a0C5g000001qSyFEAU');
// koSiteController.PagedResult('Men','02');
// koSiteController.getFirstProductVarient('a0C5g000001qSyFEAU');
List<Product_Variant__c>NewList14 = koSiteController.getVarientNew('a0C5g000001qSyFEAU');
// koSiteController.cartQuantityUpdate('a0C5g000001qSyFEAU', '2');
List<Contact> NewList15 =koSiteController.getUserDetails('a0C5g000001qSyFEAU');
// Id<Product_Variant__c> b=koSiteController.getFirstProductVarient('a0C5g000001qSyFEAU');
List<product2> b =koSiteController.getSearchProducts('men');
List<Contact> b1 =koSiteController.getUserDetails('a0C5g000001qSyFEAU');
List<Contact>b3 = koSiteController.getUserDetails(userinfo.getuserid());
// Integer It = new koSiteController.getWishlists('a0C5g000001qSyFEAU');
test.stopTest();
}



private static testmethod void createAddress(){
Contact_Address__c c = new Contact_Address__c();
c.Name='Home';
c.Contact_Name__c='Usha';
c.Contact_Phone_Number__c='9965521321';
c.Contact_Pincode__c='580001';
c.Contact_Street_Address__c='TestStreet';
c.Contact_Locality__c='Test Local';
c.Contact_City__c='TestCity';
c.Contact_State__c='Test State';
    test.startTest();
insert c;

//koSiteController.createAddress('Home', '580001', 'Street', 'Locality', 'City', 'State', 'ContactName', 'ContactPhone');

test.stopTest();
}
private static testmethod void Mytest(){
Cart_Product__c cp = new Cart_Product__c();
String ContactId= cp.id;
Integer Quantity=2;
cp.Quantity__c=2;
koSiteController.cartQuantityUpdate(ContactId, 2);
System.assertEquals(cp.Quantity__c , Quantity );
Product2 p = new Product2();
p.Name = ' Test Product ';
p.Description='Test Product Entry For Product';
p.productCode = 'SFDCPanther-123';
p.isActive = true;
insert p;
Product_Variant__c pv = new Product_Variant__c();
pv.Name = ' Test Product ';
pv.Price__c = 455.00;
pv.Product__c = p.Id;
insert pv;
koSiteController.getTotalCartProductsAmount(pv.Id); 
koSiteController.getCartProducts();
koSiteController.getCarts(pv.Id);

}

@istest static void getproduct(){

//Id prodId='001';
//string option='red';
string category= 'Men';
Integer pageNumber = 2;
List<Product2> p = [SELECT id, Name,Image_URL__c FROM Product2];
koSiteController.getproducts('Men', 2);
    
    

}
    

}