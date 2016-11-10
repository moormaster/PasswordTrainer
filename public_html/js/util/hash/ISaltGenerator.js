/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
