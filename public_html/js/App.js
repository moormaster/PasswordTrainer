/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var App;

(
    function($) {
        App = function() {
            this.prototype = new IApp();
			
            this.passwordRegistrations = {};
            
            this.pageTrainPasswords = new PagePasswordTrainer(this);
            this.pageImportExport = new PageImportExport(this);
			
            this.init = function() {
                var appInstance = this;
                
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
            };
            
            this.writePasswordRegistrationsToLocalStorage = function() {
                localStorage['passwordRegistrations'] = this.exportPasswordRegistrations();
            };
            
            this.importPasswordRegistrations = function(json) {
                var passwordRegistrations = JSON.parse(json);
                
                if (!this.isPasswordRegistrationIntegrityOk(passwordRegistrations))
                    return false;
                
                this.passwordRegistrations = passwordRegistrations;
                this.pageTrainPasswords.setMostRecentPasswordRegistration();
                
                return true;
            };
            
            this.exportPasswordRegistrations = function() {
                return JSON.stringify(this.passwordRegistrations);
            };
            
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
			
			this.addPasswordAttempt = function(passwordRegistration, password) {
                if (!passwordRegistration)
                    return false;
                
				var leveledScore = new LeveledScore(passwordRegistration.scoreData);
				
                var hash = CryptoJS.MD5(password).toString();
                if (hash != passwordRegistration.hash)
                    return false;
                
                if (!leveledScore.addSuccessfulAttempt())
                    return false;
                    
                this.writePasswordRegistrationsToLocalStorage();
                
                return true;
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
            };
			
			
        };
    }(jQuery)
);
