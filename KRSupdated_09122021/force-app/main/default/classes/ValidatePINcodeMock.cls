@isTest
global class ValidatePINcodeMock implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest request){
        HttpResponse response = new HttpResponse();
       response.setHeader('Content-Type', 'application/json');
        response.setBody('{"Message":"Number of pincode(s) found:9","Status":"Success","PostOffice":{"Country":"India","Pincode":"624308"}}');      
        //response.setBody(RESPONSE_BODY);
        response.setStatusCode(200);
        return response;
    }
}