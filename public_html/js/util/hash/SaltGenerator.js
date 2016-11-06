/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SaltGenerator = function(length, charSet) {
    this.prototype = new ISaltGenerator(length, charSet);
    
    this.length = length;   // the desired length of the salt
    this.charSet = charSet;  // the desired charset

    if (!this.charSet)
        this.charSet = '!"§$%&/()=?`´+*#\'~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    /*
     * Generates and returns a salt value (as specified by the constructor 
     * parameters)
     */
    this.generate = function() {
        var salt = "";

        if (!charSet)
            charSet = '!"§$%&/()=?`´+*#\'~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (var i=0;i<this.length;i++) {
            var rnd = Math.floor(Math.random()*charSet.length);

            salt += charSet[rnd]
        }

        return salt;
    };
}
