var IApp = function() {
    this.prototype = new IImportsExportsPasswordRegistrations();
    
    // password registrations
    this.passwordRegistrations = null;

    /* 
     * page instances
     */
    this.pageTrainPasswords = null;
    this.pageImportExport = null;
    this.pagePasswordManagePasswords = null;
    
    this.pagePasswordDialog = null;
    
    /*
     * password notificator
     */
    this.passwordNotificator = null;

    /*
     * initialize jquery widgets and pages
     */
    this.init = function() {};

    /*
     * restore password registrations from localStorage
     */
    this.readPasswordRegistrationsFromLocalStorage = function() {};

    /*
     * persist password registration to local storage
     */
    this.writePasswordRegistrationsToLocalStorage = function() {};
    
    /*
     * register a new password
     */
    this.addPasswordRegistration = function(description, password) {};
    
    /*
     * add a password input attempt with the given password on the given password registration
     */
    this.addPasswordAttempt = function(passwordRegistration, password) {};
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    this.getMostRecentPasswordRegistration = function() {};

};
