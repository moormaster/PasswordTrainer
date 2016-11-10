class IPasswordRegistrationCollection {
    constructor(passwordHasher, scoreDataComparator) {
        this.passwordHasher = null;
        this.scoreDataComparator = null;

        // collection of password registrations
        this.collection = null;
    }
    
    /*
     * add new password registration
     */
    add(description, password) {}
    
    /*
     * recreate the hash for the given password without losing score info
     * 
     * returns true on success
     */
    rehash(description, password) {}
    
    /*
     * find the password registration which is minimal according to the scoreDataComparator
     * (i.e. maximal feeHours or minimal lock hours)
     */
    getMostRecentPasswordRegistration() {}

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
