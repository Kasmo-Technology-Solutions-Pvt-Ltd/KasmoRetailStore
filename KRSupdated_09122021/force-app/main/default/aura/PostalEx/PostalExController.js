({
	doInit : function(component, event, helper) {
		var action = component.get('c.PINcode');
        action.setParams({ pincode : component.get('v.code') });
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
        });
        $A.enqueueAction(action);
      
	}
})