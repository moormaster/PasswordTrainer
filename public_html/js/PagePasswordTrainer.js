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
            
            /*
             * initializes widgets and auto page update
             */
            this.init = function() {
                var pageInstance = this;
                
                $('#passwordtrainer .password').JQPasswordInput();
                $('#passwordtrainer .password').on('passwordEntered',
                    function(e, password) {
                        $(this).removeClass('bg_anim_green');
                        $(this).removeClass('bg_anim_red');
                        
                        if (pageInstance.addPasswordAttempt(password))
                            $(this).addClass('bg_anim_green');
                        else
                            $(this).addClass('bg_anim_red');
                        
                        $(this).val("");
                        window.setTimeout(
                            function() {
                                pageInstance.update();
                            },
                            2000
                        );
                    }
                );
                
                $('#pageTrainPasswords').on('pageshow', 
                    function(e) {
                        pageInstance.update();
                    }
                );
                        
                window.setInterval(
                    function() {
                        pageInstance.update();
                    },
                    1000
                );
            };
            
            this.setPasswordRegistration = function(passwordRegistration) {
                if (!passwordRegistration)
                    return false;
                
                if (this.currentPasswordRegistration != passwordRegistration) {
                    $('#passwordtrainer .password').removeClass('bg_anim_green');
                    $('#passwordtrainer .password').removeClass('bg_anim_red');
                }
                
                this.currentPasswordRegistration = passwordRegistration;
                this.currentLeveledScore.setScoreData(this.currentPasswordRegistration.scoreData);
                
                $('#passwordtrainer .passworddescription').text(passwordRegistration.description);
                updateWidgets(this.currentLeveledScore);
                
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
                updateWidgets(this.currentLeveledScore);
                
                this.appInstance.appNotificator.notify();
            };

            var updateWidgets = function(leveledScore) {
                var statusDisplay = formatStatus(leveledScore);
                var leveledScoreDisplay = formatLeveledScore(leveledScore);
                
                if (!statusDisplay)
                    $('#passwordtrainer .passwordscore').text(leveledScoreDisplay);
                else
                    $('#passwordtrainer .passwordscore').text(leveledScoreDisplay + " (" + statusDisplay + ")");
                
                if (leveledScore.lockHoursLeft)
                    $('#passwordtrainer .password').attr("readonly", "");
                else
                    $('#passwordtrainer .password').removeAttr("readonly");
            };
            
            var formatStatus = function(leveledScore) {
                if (leveledScore.fee)
                    return formatScore(leveledScore.fee) + " fee";
                
                if (leveledScore.lockHoursLeft)
                    return "locked for " + formatTime(leveledScore.lockHoursLeft*60*60*1000);
            };
            
            var formatLeveledScore = function(leveledScore) {
                return "Score " + formatScore(leveledScore.score) + " / Level " + leveledScore.level;
            };
            
            var formatScore = function(score) {
                return Math.round(score*100)/100;
            };
            
            var formatTime = function(ms) {
                if (ms < 0)
                    return "-" + formatTime(-ms);

                var years, days, hours, minutes, seconds;

                years = 0;
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;

                if (ms >= 1000*60*60*24*365) {
                    years = Math.floor(ms / (1000*60*60*24*365));
                    ms -= years * 1000*60*60*24*365;
                }

                if (ms >= 1000*60*60*24) {
                    days = Math.floor(ms / (1000*60*60*24));
                    ms -= days * 1000*60*60*24;        
                }

                if (ms >= 1000*60*60) {
                    hours = Math.floor(ms / (1000*60*60));
                    ms -= hours * 1000*60*60;
                }

                if (ms >= 1000*60) {
                    minutes = Math.floor(ms / (1000*60));
                    ms -= minutes * 1000*60;
                }

                if (ms >= 1000) {
                    seconds = Math.floor(ms / 1000);
                    ms -= seconds * 1000;
                }

                var string = "";

                if (years > 0)
                    string += years + "y ";

                if (days > 0)
                    string += days + "d ";

                if (hours > 0)
                    string += hours + "h ";

                if (minutes > 0)
                    string += minutes + "m ";

                string += seconds + "s";

                return string;
            };
        };
    }(jQuery)
);
