/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var App;
var PagePasswordTrainer;

function formatTime(ms) {
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
        string += years + " years ";
    
    if (days > 0)
        string += days + " days ";
    
    if (hours > 0)
        string += hours + " hours ";
    
    if (minutes > 0)
        string += minutes + " minutes ";
    
    string += seconds + " seconds";
    
    return string;
}
    
(
    function($) {
        App =   function() {
            var appInstance = this;
            this.passwordRegistrations = {};
            
            this.pageTrainPasswords = new PagePasswordTrainer(this);

            this.init = function() {
                $('#passwordregistration').JQPasswordRegistration(
                    {
                        passwordDescription:            $('#passwordregistration .passworddescription'),
                        password:                       $('#passwordregistration .password'),
                        passwordRepeat:                 $('#passwordregistration .passwordrepeat'),
                    }
                );
            
                $('#passwordregistration').on('passwordEntered', 
                    function(e, desc, pwd) {
                        appInstance.addPasswordRegistration(desc, pwd);
                    }
                );
            
                this.pageTrainPasswords.init();
            };
            
            this.setPasswordRegistrationsFromLocalStorage = function() {
                var passwordRegistrations = JSON.parse(localStorage['passwordRegistrations']);
                
                if (!passwordRegistrations)
                    return;
                
                this.passwordRegistrations = passwordRegistrations;
                this.updateVisiblePasswordRegistration();
            }
            
            this.writePasswordRegistrationsToLocalStorage = function() {
                localStorage['passwordRegistrations'] = JSON.stringify(this.passwordRegistrations);
                
                return true;
            }
            
            this.addPasswordRegistration = function(description, password) {
                this.passwordRegistrations[description] =
                    {
                        description:    description,
                        hash:           hash_md5(password),
                        scoreData:      {
                                            lastSuccessScore:   null,
                                            lastSuccessTimestamp:  null
                                        }
                    };
            };
            
            this.updateVisiblePasswordRegistration = function() {
                this.pageTrainPasswords.setPasswordRegistration(this.getMostRecentPasswordRegistration());
            }
            
            this.getMostRecentPasswordRegistration = function() {
                var maxHours = null;
                var mostRecentInstance = null;
                
                var leveledScore = new LeveledScore();
                
                // determine instance with max fee hours passed and minimal lock hours left
                for (var key in this.passwordRegistrations) {
                    var passwordRegistration = this.passwordRegistrations[key];
                    
                    var updateInstance = false;
                    leveledScore.reset(passwordRegistration.scoreData);
                    
                    var hours = leveledScore.feeHoursPassed - leveledScore.lockHoursLeft;
                    
                    if (maxHours == null || maxHours < hours) {
                        maxHours = hours;
                        mostRecentInstance = passwordRegistration;
                    }
                }
                
                return mostRecentInstance;
            };
        };
                
        PagePasswordTrainer = function(app) {
            var pageInstance = this;
            
            this.app = app;
            this.currentPasswordRegistration;
            this.currentLeveledScore = new LeveledScore();
            
            this.setPasswordRegistration = function(passwordRegistration) {
                if (!passwordRegistration)
                    return false;
                
                if (this.currentPasswordRegistration != passwordRegistration) {
                    $('#passwordtrainer .password').removeClass('bg_anim_green');
                    $('#passwordtrainer .password').removeClass('bg_anim_red');
                }
                
                this.currentPasswordRegistration = passwordRegistration;
                this.currentLeveledScore.reset(this.currentPasswordRegistration.scoreData);
                
                $('#passwordtrainer .passworddescription').text(passwordRegistration.description);
                this.updateScore();
                
                return true;
            };

            this.updateScore = function() {
                var displayTime = null;
                
                if (this.currentLeveledScore.feeHoursPassed)
                    displayTime = formatTime(this.currentLeveledScore.feeHoursPassed*60*60*1000) + " fee time";
                
                if (this.currentLeveledScore.lockHoursLeft)
                    displayTime = "locked for " + formatTime(this.currentLeveledScore.lockHoursLeft*60*60*1000);
                
                if (!displayTime)
                    $('#passwordtrainer .passwordscore').text("Level " + this.currentLeveledScore.level);
                else
                    $('#passwordtrainer .passwordscore').text("Level " + this.currentLeveledScore.level + " (" + displayTime + ")");
                    
                    
            };
            
            this.isPasswordAttemptSuccessful = function(password) {
                if (!this.currentPasswordRegistration)
                    return false;
                
                var hash = hash_md5(password);

                if (hash == this.currentPasswordRegistration.hash)
                    return this.currentLeveledScore.addSuccessfulAttempt();
                
                return false;
            }
            
            this.init = function() {
                $('#passwordtrainer .password').JQPasswordInput();
                $('#passwordtrainer .password').on('passwordEntered',
                    function(e, password) {
                        $(this).removeClass('bg_anim_green');
                        $(this).removeClass('bg_anim_red');
                        
                        if (pageInstance.isPasswordAttemptSuccessful(password)) {
                            $(this).addClass('bg_anim_green');
                            app.writePasswordRegistrationsToLocalStorage();
                        } else {
                            $(this).addClass('bg_anim_red');
                        }
                        
                        $(this).val("");
                        window.setTimeout(
                            function() {
                                pageInstance.app.updateVisiblePasswordRegistration();
                            },
                            2000
                        );
                    }
                );
                
                $('#pageTrainPasswords').on('pageshow', 
                    function(e) {
                        pageInstance.app.updateVisiblePasswordRegistration();
                    }
                );
                
                window.setInterval(
                    function() {
                        pageInstance.updateScore()
                    },
                    1000
                );
            };
        }
        
        var app;
        
        $(document).ready(
            function() {
                app = new App();
                app.init();
                app.setPasswordRegistrationsFromLocalStorage();
            }
        );
    }(jQuery)
)
