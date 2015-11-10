/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var App;
var PagePasswordTrainer;
var PageImportExport;

(
    function($) {
        App = function() {
            var appInstance = this;
            this.passwordRegistrations = {};
            
            this.pageTrainPasswords = new PagePasswordTrainer(this);
            this.pageImportExport = new PageImportExport(this);

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
                this.pageImportExport.init();
            };
            
            this.readPasswordRegistrationsFromLocalStorage = function() {
                this.importPasswordRegistrations(localStorage['passwordRegistrations']);
            }
            
            this.writePasswordRegistrationsToLocalStorage = function() {
                localStorage['passwordRegistrations'] = this.exportPasswordRegistrations();
            }
            
            this.importPasswordRegistrations = function(json) {
                var passwordRegistrations = JSON.parse(json);
                
                if (!this.isPasswordRegistrationIntegrityOk(passwordRegistrations))
                    return false;
                
                this.passwordRegistrations = passwordRegistrations;
                this.pageTrainPasswords.setMostRecentPasswordRegistration();
                
                return true;
            }
            
            this.exportPasswordRegistrations = function() {
                return JSON.stringify(this.passwordRegistrations);
            }
            
            this.addPasswordRegistration = function(description, password) {
                this.passwordRegistrations[description] =
                    {
                        description:    description,
                        hash:           CryptoJS.MD5(password).toString(),
                        scoreData:      {
                                            lastSuccessScore:   null,
                                            lastSuccessTimestamp:  null
                                        }
                    };
            };
            
            this.isPasswordRegistrationIntegrityOk = function(passwordRegistration) {
                if (!passwordRegistration)
                    return false;
                
                for (var desc in passwordRegistration) {
                    var currentRegistration = passwordRegistration[desc];
                    
                    if (!currentRegistration)
                        return false;
                    
                    if (currentRegistration.description != desc)
                        return false;
                    
                    if (!currentRegistration.scoreData)
                        return false;
                }
                
                return true;
            }
        };
                
        PagePasswordTrainer = function(app) {
            this.appInstance = app;
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
            
            this.setMostRecentPasswordRegistration = function() {
                this.setPasswordRegistration(getMostRecentPasswordRegistration(this.appInstance.passwordRegistrations));
            }

            this.updateScore = function() {
                var statusDisplay = null;
                
                if (this.currentLeveledScore.fee)
                    statusDisplay = formatScore(this.currentLeveledScore.fee) + " fee";
                
                if (this.currentLeveledScore.lockHoursLeft)
                    statusDisplay = "locked for " + formatTime(this.currentLeveledScore.lockHoursLeft*60*60*1000);
                
                if (!statusDisplay)
                    $('#passwordtrainer .passwordscore').text("Score " + formatScore(this.currentLeveledScore.score) + " / Level " + this.currentLeveledScore.level);
                else
                    $('#passwordtrainer .passwordscore').text("Score " + formatScore(this.currentLeveledScore.score) + " / Level " + this.currentLeveledScore.level + " (" + statusDisplay + ")");
                    
                    
            };
            
            this.addPasswordAttempt = function(password) {
                if (!this.currentPasswordRegistration)
                    return false;
                
                var hash = CryptoJS.MD5(password).toString();

                if (hash != this.currentPasswordRegistration.hash)
                    return false;
                
                if (!this.currentLeveledScore.addSuccessfulAttempt())
                    return false;
                    
                app.writePasswordRegistrationsToLocalStorage();
                
                return true;
            }
            
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
                                pageInstance.setMostRecentPasswordRegistration();                                
                            },
                            2000
                        );
                    }
                );
                
                $('#pageTrainPasswords').on('pageshow', 
                    function(e) {
                        pageInstance.setMostRecentPasswordRegistration();
                    }
                );
                        
                window.setInterval(
                    function() {
                        pageInstance.updateScore()
                    },
                    1000
                );
            };
            
            var formatScore = function(score) {
                return Math.round(score*100)/100;
            }
            
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
            
            var getMostRecentPasswordRegistration = function(passwordRegistrations) {
                var maxHours = null;
                var mostRecentInstance = null;
                
                var leveledScore = new LeveledScore();
                
                // determine instance with max fee hours passed and minimal lock hours left
                for (var key in passwordRegistrations) {
                    var passwordRegistration = passwordRegistrations[key];
                    
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
        }
        
        PageImportExport = function(app) {
            this.appInstance = app;
            
            this.init = function() {
                var pageInstance = this;
                
                $('#pageImportExport').on('pageshow',
                    function(e) {
                        pageInstance.export();
                    }
                );
        
                $('#pageImportExport').on('change',
                    function(e) {
                        pageInstance.import();
                    }
                );
            };
            
            this.export = function() {
                var json = this.appInstance.exportPasswordRegistrations();
                
                $('#importexportfield').val(json);                
            }
            
            this.import = function() {
                var json = $('#importexportfield').val();
                
                if (this.appInstance.importPasswordRegistrations(json)) {
                    this.appInstance.writePasswordRegistrationsToLocalStorage();
                    $.mobile.changePage('#pageTrainPasswords')
                }
            }
        } 
        
        var app;
        
        $(document).ready(
            function() {
                app = new App();
                app.init();
                app.readPasswordRegistrationsFromLocalStorage();
            }
        );
    }(jQuery)
)
