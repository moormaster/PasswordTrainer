var IPasswordRegistrationCollection;

IPasswordRegistrationCollection = function() {
    this.prototype = new IImportsExportsPasswordRegistrations();
    
    // collection of password registrations
    this.collection = null;
    
    /*
     * add new password registration
     */
    this.add = function(description, password) {};
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    this.getMostRecentPasswordRegistration = function() {};
};
