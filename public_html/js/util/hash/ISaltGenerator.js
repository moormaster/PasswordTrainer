class ISaltGenerator {
    constructor (length, charSet) {
        this.length = null;   // the desired length of the salt
        this.charSet = null;  // the desired charset
    }
    
    /*
     * Generates and returns a salt value (as specified by the constructor 
     * parameters)
     */
    generate() {}
};

if (typeof exports == "object")
    exports.ISaltGenerator = ISaltGenerator;
