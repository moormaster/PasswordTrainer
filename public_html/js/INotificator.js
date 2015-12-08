/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var INotificator;
INotificator = function(window) {
    /*
     * returns true if application may send notifications
     */
    this.hasNotificationPermission = function() {};

    /*
     * returns true if application may vibrate
     */
    this.hasVibrationPermission = function() {};
    
    /*
     * sends a new notification and returns an notification instance
     */
    this.notify = function(title, text) {};
};
