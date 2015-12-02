var AppNotificator;

AppNotificator = function(app, window) {
	this.prototype = new IAppNotificator(app, window);
        
        this.app = app;
	this.notificator = new Notificator(window);
        
        this.suppressNotification = false;
	
	this.notify = function() {
            var date = new Date();
            var readyPasswordDescs = gatherReadyPasswordDescriptions(this.app.passwordRegistrations, date);

            if (!readyPasswordDescs.length) {
                this.suppressNotification = false;
                return;
            }
            
            if (this.suppressNotification)
                return;
            
            this.notificator.notify("PasswordTrainer", readyPasswordDescs.length + " passwords are ready", [300, 100, 300, 100, 300]);
            this.suppressNotification = true;
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
