class IApplicationModel extends IModel {
    constructor(passwordRegistrationCollection) {
        super(passwordRegistrationCollection);
        
        this.passwordRegistrations = null;
    }

    /*
     * import password registrations from json string
     *
     * returns true if json string contains a valid persistence
     * of password registrations and import was successful.
     */
    importJSON(json) {}

    /*
     * export password registrations to a json string
     *
     * returns the json string
     */
    exportJSON() {}
};
