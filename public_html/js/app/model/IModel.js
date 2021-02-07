class IModel {
    /*
     * import from object structure
     *
     * returns true if successful
     */
    import(object) {}

    /*
     * export password registrations to an object structure
     *
     * returns the object structure
     */
    export() {}
};

if (typeof exports == "object")
    exports.IModel = IModel;
