class IApp {
    constructor() {
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
    }



    /*
     * initialize jquery widgets and pages
     */
    init() {}

    /*
     * restore password registrations from localStorage
     */
    readPasswordRegistrationsFromLocalStorage() {}

    /*
     * persist password registration to local storage
     */
    writePasswordRegistrationsToLocalStorage() {}
    
    /*
     * import password registrations from json string
     *
     * returns true if json string contains a valid persistence
     * of password registrations.
     */
    importJSON(json) {}

    /*
     * export password registrations to a json string
     *
     * returns the json string
     */
    exportJSON() {}
    
    /*
     * register a new password
     */
    addPasswordRegistration(description, password) {}
    
    /*
     * add a password input attempt with the given password on the given password registration
     */
    addPasswordAttempt(passwordRegistration, password) {}
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    getMostRecentPasswordRegistration() {}
    
    /*
     * find password registration by description
     */
    getPasswordRegistrationByDescription(description) {}

};
