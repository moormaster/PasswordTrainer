/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var MD5PasswordHasher = function(saltGenerator) {
    // unsalted md5 generator
    this.prototype = new IPasswordHasher(null);
    
    /*
     * generate salted hash from given password
     * If no salt is given then the saltGenerator will be used to generate one
     */
    this.generateSaltedHash = function(password, salt) {
        return CryptoJS.MD5(password).toString();
    };
    
    /*
     * From a given hash value parse the salt and the password hash
     */
    this.parseSaltedHash = function(hash) {
        return {salt: null, hash: hash};
    };
}
