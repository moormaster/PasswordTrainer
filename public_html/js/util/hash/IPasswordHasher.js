class IPasswordHasher {
    constructor(saltGenerator) {
        // the salt generator which shall be used
        this.saltGenerator = null;                
    }
    
    
    /*
     * generate salted hash from given password
     * If no salt is given then the saltGenerator will be used to generate one
     */
    generateSaltedHash(password, salt) {}
    
    /*
     * From a given hash value parse the salt and the password hash
     */
    parseSaltedHash(hash) {}
};

if (typeof exports == "object")
    exports.IPasswordHasher = IPasswordHasher;
