/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class INotificator {
    constructor(window) {}
    
    /*
     * returns true if application may send notifications
     */
    hasNotificationPermission() {};

    /*
     * returns true if application may vibrate
     */
    hasVibrationPermission() {};
    
    /*
     * sends a new notification and returns an notification instance
     */
    notify(title, text) {};
};
