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
