class IPasswordRegistrationCollection {
    constructor(scoreDataComparator) {
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
};
