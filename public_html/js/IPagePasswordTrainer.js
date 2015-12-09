/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var IPagePasswordTrainer = function(app) {
    // app instance where this page is displayed in
    this.appInstance = null;
    
    // password registration instance which is currently shown
    this.currentPasswordRegistration = null;

    // leveled score instance of the password registration
    this.currentLeveledScore = null;
    
    // refresh interval id
    this.intervalId

    /*
     * initializes jquery ui widgets and page
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

