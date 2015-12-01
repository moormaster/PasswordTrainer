/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var IPagePasswordTrainer = function() {
    // password registration instance which is currently shown
    this.currentPasswordRegistration = null;

    // leveled score instance of the password registration
    this.currentLeveledScore = null;

    /*
     * initializes jquery widgets and page
     */
    this.init = function() {};

    /*
     * changes the displayed password registration
     */
    this.setPasswordRegistration = function(passwordRegistration) {};

    /*
     * update page display
     */
    this.update = function() {};

    /*
     * add a password input attempt with the given password
     */
    this.addPasswordAttempt = function(password) {};
};

