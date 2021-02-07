var PasswordNotificator = (
    function() {
        var resetNotifications = function() {
            if (!this.activeNotifications)
                this.activeNotifications = [];

            while (this.activeNotifications.length > 0) {
                var notification = this.activeNotifications.pop();

                if (!notification)
                    continue;

                notification.close();
            }

            if (this.activeNotifications.length > 0)
                return false;

            return true;
        };

        var gatherReadyPasswordDescriptions = function(date) {
            var readyPasswordDescs = [];

            if (!this.passwordRegistrations)
                return null;

            var passwordRegistrationsMap = this.passwordRegistrations.getAll();

            for (var desc in passwordRegistrationsMap) {
                var passwordRegistration = passwordRegistrationsMap[desc];

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

        class PasswordNotificator extends IPasswordNotificator {
            constructor(passwordRegistrations, notificator) {
                super(passwordRegistrations, notificator);

                this.passwordRegistrations = passwordRegistrations;
                this.notificator = notificator;

                this.activeNotifications = [];
                this.lastNotificationPasswordCount = null;
            }

            notify() {
                var date = new Date();
                var readyPasswordDescs = gatherReadyPasswordDescriptions.call(this, date);

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
                resetNotifications.call(this);
                var notification = this.notificator.notify("PasswordTrainer", readyPasswordDescs.length + " passwords are ready", [300, 100, 300, 100, 300]);
                this.activeNotifications.push(notification);
                this.lastNotificationPasswordCount = readyPasswordDescs.length;
            }
        };

        return PasswordNotificator;
    }
)();
