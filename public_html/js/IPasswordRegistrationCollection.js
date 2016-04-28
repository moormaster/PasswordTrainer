var IPasswordRegistrationCollection;

IPasswordRegistrationCollection = function(passwordHasher) {
    this.prototype = new IImportsExportsPasswordRegistrations();
    this.passwordHasher = null;
    
    // collection of password registrations
    this.collection = null;
    
    /*
     * add new password registration
     */
    this.add = function(description, password) {};
    
    /*
     * recreate the hash for the given password without losing score info
     */
    this.rehash = function(description, password) {};
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    this.getMostRecentPasswordRegistration = function() {};
};
