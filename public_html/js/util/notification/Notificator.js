/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Notificator;
Notificator = function(window) {
    this.prototype = new INotificator(window);
    
    this.Notification = window.Notification;
    this.navigator = window.navigator;
    
    if (this.Notification)
        this.Notification.requestPermission();
    
    this.hasNotificationPermission = function() {
        if (!this.Notification)
            return false;
        
        if (this.Notification.permission != "granted")
            return false;
        
        return true;
    };

    this.hasVibrationPermission = function() {
        if (!this.navigator)
            return false;
        
        if (!this.navigator.vibrate)
            return false;
        
        return true;
    };
    
    this.notify = function(title, text, vibrationLengthInMs) {
        if (vibrationLengthInMs && this.hasVibrationPermission())
            this.navigator.vibrate(vibrationLengthInMs);
        
        if (this.hasNotificationPermission()) {
            try {
                // try deprecated way first
                return new this.Notification(title, { body: text });
            } catch (e) {
                // use future chrome implementation 
                if (ServiceWorkerRegistration && ServiceWorkerRegistration.showNotification)
                    return ServiceWorkerRegistration.showNotification(title, { body: text });
            }
        }
        
        return null;
    };
};