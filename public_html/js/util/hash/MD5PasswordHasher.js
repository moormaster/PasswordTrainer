/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var MD5PasswordHasher = function(saltGenerator) {
    // unsalted md5 generator
    this.prototype = new IPasswordHasher(null);
    
    this.saltGenerator = new SaltGenerator(32, null);
    
    /*
     * generate salted hash from given password
     * If no salt is given then the saltGenerator will be used to generate one
     */
    this.generateSaltedHash = function(password, salt) {
        if (salt == null)
            salt = this.saltGenerator.generate();
        
        if (!salt)
            // backward compatibility - check unsalted hash
            return CryptoJS.MD5(password).toString();
        else
            return CryptoJS.MD5(password + salt).toString() + ":" + salt;
    };
    
    /*
     * From a given hash value parse the salt and the password hash
     */
    this.parseSaltedHash = function(hash) {
        var index = null;
        if (hash && (index = hash.lastIndexOf(":")) >= 0 )
            return {salt: hash.substr(index+1), hash: hash.substring(0, index)};
        
        return {salt: "", hash: hash};
    };
}