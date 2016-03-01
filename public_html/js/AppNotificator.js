var AppNotificator;

AppNotificator = function(app, window) {
    this.prototype = new IAppNotificator(app, window);
        
    this.app = app;
    this.notificator = new Notificator(window);
    
    this.activeNotifications = [];
    this.lastNotificationPasswordCount = null;
    
    this.notify = function() {
        var date = new Date();
        // TODO SLA
        var readyPasswordDescs = gatherReadyPasswordDescriptions(this.app.passwordRegistrations, date);

        // no pending passwords -> reset notifications
        if (!readyPasswordDescs.length) {
            resetNotifications(this.activeNotifications);
            this.lastNotificationPasswordCount = null;

            return;
        }

        // suppress creation of a new notification if password count lowers
        if (readyPasswordDescs.length <= this.lastNotificationPasswordCount) {
            this.lastNotificationPasswordCount = readyPasswordDescs.length;
            return;
        }

        // create new notification
        resetNotifications(this.activeNotifications);
        var notification = this.notificator.notify("PasswordTrainer", readyPasswordDescs.length + " passwords are ready", [300, 100, 300, 100, 300]);
        this.activeNotifications.push(notification);
        this.lastNotificationPasswordCount = readyPasswordDescs.length;
    };
    
    var resetNotifications = function(notificationList) {
        if (!notificationList)
            return false;
        
        while (notificationList.length > 0) {
            var notification = notificationList.pop();
            
            if (!notification)
                continue;
                
            notification.close();
        }
        
        if (notificationList.length > 0)
            return false;
        
        return true;
    };
    
    var gatherReadyPasswordDescriptions = function(passwordRegistrations, date) {
        var readyPasswordDescs = [];

        if (!passwordRegistrations)
            return null;

        if (!passwordRegistrations.collection)
            return null;

        for (var desc in passwordRegistrations.collection) {
            var passwordRegistration = passwordRegistrations.collection[desc];

            if (!passwordRegistration)
                continue;

            if (!passwordRegistration.scoreData)
                continue;

            var leveledScore = new LeveledScore(passwordRegistration.scoreData);
            if (leveledScore.getLockHoursLeft(date) > 0)
                continue;

            readyPasswordDescs.push(desc);
        }

        return readyPasswordDescs;
    };
};
