class NavigatorNotificator extends INotificator{
    constructor() {
        super();
        
        this.navigator = navigator;

        // use current window instance per default
        this.setWindow(window);

        if (this.Notification)
            this.Notification.requestPermission();
    }
    
    setWindow(window) {
        this.Notification = window.Notification;
    }
    
    hasNotificationPermission() {
        if (!this.Notification)
            return false;
        
        if (this.Notification.permission != "granted")
            return false;
        
        return true;
    }

    hasVibrationPermission() {
        if (!this.navigator)
            return false;
        
        if (!this.navigator.vibrate)
            return false;
        
        return true;
    }
    
    notify(title, text, vibrationLengthInMs) {
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
    }
};
