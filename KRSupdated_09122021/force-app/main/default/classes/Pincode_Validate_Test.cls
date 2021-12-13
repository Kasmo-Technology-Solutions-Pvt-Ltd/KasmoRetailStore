@isTest
public class Pincode_Validate_Test {
@isTest static void testCallout(){
Test.setMock(HttpCalloutMock.class, new ValidatePINcodeMock());
Test.startTest();
    ValidatePINcode.checkPinCode('624308');
HttpResponse res = ValidatePINcode.res;
//Httpresponse res = new HttpResponse();
Test.stopTest();
    String expected = '{"Message":"Number of pincode(s) found:9","Status":"Success","PostOffice":{"Country":"India","Pincode":"624308"}}';
string fakeBody = res.getBody();
    System.debug('Test'+fakeBody );
system.assertEquals(200,res.getStatusCode());
system.assertEquals(expected, fakeBody);
//return true;
}
}