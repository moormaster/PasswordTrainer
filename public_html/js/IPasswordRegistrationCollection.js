var IPasswordRegistrationCollection;

IPasswordRegistrationCollection = function(passwordHasher, scoreDataComparator) {
    this.prototype = new IImportsExportsPasswordRegistrations();
    this.passwordHasher = null;
    this.scoreDataComparator = null;
    
    // collection of password registrations
    this.collection = null;
    
    /*
     * add new password registration
     */
    this.add = function(description, password) {};
    
    /*
     * recreate the hash for the given password without losing score info
     * 
     * returns true on success
     */
    this.rehash = function(description, password) {};
    
    /*
     * find the password registration which is minimal according to the scoreDataComparator
     * (i.e. maximal feeHours or minimal lock hours)
     */
    this.getMostRecentPasswordRegistration = function() {};
};
