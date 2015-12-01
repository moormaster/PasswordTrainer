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
			
            this.passwordRegistrations = new PasswordRegistrationCollection();
			
			this.appNotificator = new AppNotificator(this, window);
            
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
                        appInstance.passwordRegistrations.add(desc, pwd);
						this.writePasswordRegistrationsToLocalStorage();
                    }
                );
            
                this.pageTrainPasswords.init();
                this.pageImportExport.init();
            };
            
            this.readPasswordRegistrationsFromLocalStorage = function() {
                this.passwordRegistrations.importJSON(localStorage['passwordRegistrations']);
            };
            
            this.writePasswordRegistrationsToLocalStorage = function() {
                localStorage['passwordRegistrations'] = this.exportJSON();
            };
			
			this.addPasswordAttempt = function(desc, password) {
                if (!this.passwordRegistrations)
                    return false;
					
				if (!this.passwordRegistrations.collection)
					return false;
					
				var passwordRegistration = this.passwordRegistrations.collection[desc];
				
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
        };
    }(jQuery)
);
