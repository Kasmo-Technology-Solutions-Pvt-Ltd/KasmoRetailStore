public with sharing class koSiteControllerOne {
    public koSiteControllerOne() {

    }
    @AuraEnabled(cacheable=true)
    public static list<Contact> getUserDetails(string userId){
        string cId;
        //list<user> usr=[select id,ContactId from user where id=:userId];
        for(user usr:[select id,ContactId from user where id=:userId]){
            cId=(string)usr.get('ContactId');
            system.System.debug('saichaitanya');
        }
        return[select id,name,FirstName,LastName,Email,MobilePhone from contact where id=:cId];
    }
}