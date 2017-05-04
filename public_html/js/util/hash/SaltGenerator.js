/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class SaltGenerator extends ISaltGenerator {
    constructor(length, charSet) {
        super(length, charSet);
    
        this.length = length;   // the desired length of the salt
        this.charSet = charSet;  // the desired charset

        if (!this.charSet)
            this.charSet = '!§$%&/()=?`´+*#\'~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    /*
     * Generates and returns a salt value (as specified by the constructor 
     * parameters)
     */
    generate() {
        var salt = "";

        for (var i=0;i<this.length;i++) {
            var rnd = Math.floor(Math.random()*this.charSet.length);

            salt += this.charSet[rnd]
        }

        return salt;
    }
};
