var IPasswordRegistrationCollection;

IPasswordRegistrationCollection = function() {
    // collection of password registrations
    this.collection = null;
    
    /*
     * import password registrations from json string
     *
     * returns true if json string contains a valid persistence
     * of password registrations.
     */
    this.importJSON = function(json) {};

    /*
     * export password registrations to a json string
     *
     * returns the json string
     */
    this.exportJSON = function() {};

    /*
     * add new password registration
     */
    this.add = function(description, password) {};
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    this.getMostRecentPasswordRegistration = function() {};
};
