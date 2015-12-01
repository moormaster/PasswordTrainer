var AppNotificator;

AppNotificator = function(app, window) {
	this.prototype = new IAppNotificator(app, window);
	this.notificator = new Notificator(window);
	
	this.notify = function() {
		var date = new Date();
		var readyPasswordDescs = gatherReadyPasswordDescriptions(date);
		
		if (readyPasswordDescs.length)
			this.notificator.notify(readyPasswordDescs.length + " password registrations are ready", 2000);
	};
	
	var gatherReadyPasswordDescriptions = function(date) {
		var readyPasswordDescs = [];
		
		for (var desc in this.app.passwordRegistrations) {
			var passwordRegistration = this.app.passwordRegistrations[desc];
			
			if (!passwordRegistrations)
				continue;
				
			if (!passwordRegistration.scoreData)
				
			var leveledScore = new LeveledScore(passwordRegistrations.scoreData);
			if (leveledScore.getLockHoursLeft(date) > 0)
				continue;
				
			readyPasswordDescs.push(desc);
		}
		
		return readyPasswordDescs;
	};
};
