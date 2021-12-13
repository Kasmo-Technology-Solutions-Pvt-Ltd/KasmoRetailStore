public class ValidatePINcode {
     @TestVisible 
        static HTTPResponse res; 
    @AuraEnabled(cacheable=true)
    public static boolean checkPinCode(String pincode) {
        
        HttpRequest req = new HttpRequest(); 
        req.setMethod('GET');
        req.setEndpoint('https://api.postalpincode.in/pincode/'+pincode);
       // req.setHeader('Content-Length', '-1');
       
        Http http = new Http();
       // @TestVisible 
         res = http.send(req);
        System.debug('BODY: '+res.getBody());
        System.debug('STATUS:'+res.getStatus());
        System.debug('STATUS_CODE:'+res.getStatusCode());
        if(res.getBody().contains('No records found')){
        return false;}
            else{
                JSONParser jp = JSON.createParser(res.getBody());
                while(jp.nextToken()!=null){
                    if(jp.getCurrentToken() == JSONToken.FIELD_NAME){
                        if(jp.getText()=='Name'){
                            //Location = jp.getText();
                            //system.debug('Location'+ Location); 
                            jp.nextToken();
                        }
                    }
                }
            return true;
            }        
        
        
    }
}