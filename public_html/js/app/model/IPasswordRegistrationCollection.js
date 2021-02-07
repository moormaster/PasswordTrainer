if (typeof require == "function")
    IModel = require('./IModel.js').IModel;

class IPasswordRegistrationCollection extends IModel {
    constructor(scoreDataComparator) {
        super(scoreDataComparator);
        
        this.scoreDataComparator = null;
    }
    
    /*
     * add new password registration
     */
    add(description, hash) {}
    
    /*
     * updates password registration from the given structure
     */
    update(description, registration) {}
    
    /*
     * returns the cloned password registration for the given description
     */
    get(description) {}
    
    /*
     * returns a map of all registrations
     */
    getAll() {}
    
    /*
     * find the password registration which is minimal according to the scoreDataComparator
     * (i.e. maximal feeHours or minimal lock hours)
     */
    getMostRecentPasswordRegistration() {}
    
    /*
     * find password registration by description
     */
    getPasswordRegistrationByDescription(description) {}

    /*
     * import from object structure
     *
     * returns true if successful
     */
    import(passwordRegistrations) {}
};

if (typeof exports == "object")
    exports.IPasswordRegistrationCollection = IPasswordRegistrationCollection;
