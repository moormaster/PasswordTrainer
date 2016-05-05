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
            
            this.passwordHasher = new MD5PasswordHasher();
            this.passwordRegistrations = new PasswordRegistrationCollection(this.passwordHasher);

            this.passwordNotificator = new PasswordNotificator(this.passwordRegistrations, window);
            
            this.pageTrainPasswords = new PagePasswordTrainer(this);
            this.pageImportExport = new PageImportExport(this);
            this.pagePasswordManagePasswords = new PageManagePasswords(this);
            
            this.pagePasswordDialog = new PagePasswordDialog(this);
            
            
            this.init = function() {
                var appInstance = this;

                this.pageTrainPasswords.init();
                this.pageImportExport.init();
                this.pagePasswordManagePasswords.init();
                
                this.pagePasswordDialog.init();
            };
            
            this.readPasswordRegistrationsFromLocalStorage = function() {
                this.passwordRegistrations.importJSON(localStorage['passwordRegistrations']);
            };
            
            this.writePasswordRegistrationsToLocalStorage = function() {
                localStorage['passwordRegistrations'] = this.passwordRegistrations.exportJSON();
            };
            
            this.importJSON = function(json) {
                if (this.passwordRegistrations.importJSON(json)) {
                    this.writePasswordRegistrationsToLocalStorage();
                    
                    this.pageTrainPasswords.update();
                    $.mobile.changePage('#pageTrainPasswords');
                }
            };

            this.exportJSON = function() {
                return this.passwordRegistrations.exportJSON();
            };
            
            this.addPasswordRegistration = function(description, password) {
                this.passwordRegistrations.add(description, password);
                this.writePasswordRegistrationsToLocalStorage();
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
                
                // parse salt value from stored hash
                var saltedHash = this.passwordHasher.parseSaltedHash(passwordRegistration.hash);
                
                if (!saltedHash)
                    return false;
                
                var hash = this.passwordHasher.generateSaltedHash(password, saltedHash.salt);
                if (hash != passwordRegistration.hash)
                    return false;
                
                if (!leveledScore.addSuccessfulAttempt())
                    return false;
                
                // rehash with a new salt on every attempt
                this.passwordRegistrations.rehash(desc, password);
                    
                this.writePasswordRegistrationsToLocalStorage();
                
                return true;
            };
            
            
            this.getMostRecentPasswordRegistration = function() {
                if (!this.passwordRegistrations)
                    return null;
                
                return this.passwordRegistrations.getMostRecentPasswordRegistration();
            };
        };
    }(jQuery)
);
