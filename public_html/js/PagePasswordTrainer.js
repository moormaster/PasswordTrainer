/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var PagePasswordTrainer;

(
    function($) {
        PagePasswordTrainer = function(app) {
            this.prototype = new IPagePasswordTrainer(app);
            
            this.appInstance = app;
            this.currentPasswordRegistration;
            this.currentLeveledScore = new LeveledScore();
            
            this.intervalId = null;
            
            /*
             * initializes widgets and auto page update
             */
            this.init = function() {
                var pageInstance = this;
                
                $('#passwordtrainer .password').JQPasswordInput();
                $('#passwordtrainer .password').on('passwordEntered',
                    function(e, password) {
                        $(this).val("");
                        
                        interruptInterval(pageInstance, 1000);
                        var success = pageInstance.addPasswordAttempt(password);
                        updateWidgets.call(pageInstance, success);
                    }
                );
                
                $('#pageTrainPasswords').on('pageshow', 
                    function(e) {
                        pageInstance.update();
                    }
                );
                
                activateInterval(pageInstance);
            };
            
            this.setPasswordRegistration = function(passwordRegistration) {
                if (!passwordRegistration)
                    return false;
                
                this.currentPasswordRegistration = passwordRegistration;
                
                if (!this.currentPasswordRegistration)
                    this.currentLeveledScore.setScoreData(null);
                else
                    this.currentLeveledScore.setScoreData(this.currentPasswordRegistration.scoreData);
                
                updateWidgets.call(this, true);
                
                return true;
            };
            
            this.setMostRecentPasswordRegistration = function() {
                // TODO SLA
                this.setPasswordRegistration(this.appInstance.passwordRegistrations.getMostRecentPasswordRegistration());
            };
            
            this.addPasswordAttempt = function(password) {
                if (!this.appInstance)
                    return false;
                
                return app.addPasswordAttempt(this.currentPasswordRegistration.description, password);
            };
            
            this.update = function() {
                this.setMostRecentPasswordRegistration();
                updateWidgets.call(this);
                
                this.appInstance.appNotificator.notify();
            };
            
            var activateInterval = function(pageInstance) {
                pageInstance.intervalId = window.setInterval(
                    function() {
                        pageInstance.update();
                    },
                    1000
                );
            };
            
            var clearInterval = function(pageInstance) {
                if (!pageInstance.intervalId)
                    return false;
                
                window.clearInterval(pageInstance.intervalId);
                pageInstance.intervalId = null;
                
                return true;
            };
            
            var interruptInterval = function(pageInstance, interruptDurationMs) {
                if (!clearInterval(pageInstance))
                    return false;
                
                window.setTimeout(
                    function() {
                        activateInterval(pageInstance);
                    },
                    interruptDurationMs
                );
                
                return true;
            };

            var updateWidgets = function(successState) {
                updateWidgetDescription(this.currentPasswordRegistration);
                updateWidgetsSuccessColor((this.currentLeveledScore.lockHoursLeft > 0), successState);
                updateWidgetsStatus(this.currentLeveledScore);
            };
            
            var updateWidgetDescription = function(passwordRegistration) {
                if (!passwordRegistration)
                    $('#passwordtrainer').JQPasswordInput("description", {text: ""});
                else
                    $('#passwordtrainer').JQPasswordInput("description", {text: passwordRegistration.description});
            };
            
            var updateWidgetsSuccessColor = function(lockedState, successState) {
                $('#passwordtrainer').JQPasswordInput("successColor", {isSuccessful: successState});

                switch(successState) {
                    case false:
                    case true:
                        break;
                    
                    default:
                        $('#passwordtrainer').JQPasswordInput("lock", {isLocked: lockedState});
                        break;
                }
            };
            
            var updateWidgetsStatus = function(leveledScore) {
                var formatter = new LeveledScoreFormatter();
                var leveledScoreDisplay = formatter.formatLeveledScore(leveledScore);
                var statusDisplay = formatter.formatStatus(leveledScore);
                
                if (!statusDisplay)
                    $('#passwordtrainer').JQPasswordInput("status", {text: leveledScoreDisplay});
                else
                    $('#passwordtrainer').JQPasswordInput("status", {text: leveledScoreDisplay + " (" + statusDisplay + ")"});
            };
        };
    }(jQuery)
);
