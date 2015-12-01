var IApp = function() {
    // password registrations
    this.passwordRegistrations = null;

    /* 
     * page instances
     */
    this.pageTrainPasswords = null;
    this.pageImportExport = null;
	
	/*
	 * app notificator
	 */
	this.appNotificator = null;

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
     * add a password input attempt with the given password on the given password registration
     */
    this.addPasswordAttempt = function(passwordRegistration, password) {};
};
