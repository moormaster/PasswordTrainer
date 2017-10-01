var App = (
    function($) {
        class App extends IApp {
            constructor() {
                super();
            
                this.passwordHasher = new MD5PasswordHasher();
                this.passwordRegistrations = new PasswordRegistrationCollection(this.passwordHasher, new ScoreDataFeeHoursAndLockHoursComparator());

                this.passwordNotificator = new PasswordNotificator(this.passwordRegistrations, window);
            
                this.pageTrainPasswords = new PagePasswordTrainer(this);
                this.pageImportExport = new PageImportExport(this);
                this.pagePasswordManagePasswords = new PageManagePasswords(this);
            
                this.pagePasswordDialog = new PagePasswordDialog(this);
            }
                        
            init() {
                var appInstance = this;

                this.pageTrainPasswords.init();
                this.pageImportExport.init();
                this.pagePasswordManagePasswords.init();
                
                this.pagePasswordDialog.init();
            }
            
            readPasswordRegistrationsFromLocalStorage() {
                this.passwordRegistrations.importJSON(localStorage['passwordRegistrations']);
            }
            
            writePasswordRegistrationsToLocalStorage() {
                localStorage['passwordRegistrations'] = this.passwordRegistrations.exportJSON();
            }
            
            importJSON(json) {
                if (this.passwordRegistrations.importJSON(json)) {
                    this.writePasswordRegistrationsToLocalStorage();
                    
                    this.pageTrainPasswords.update();
                    $.mobile.changePage('#pageTrainPasswords');
                }
            }

            exportJSON() {
                return this.passwordRegistrations.exportJSON();
            }
            
            addPasswordRegistration(description, password) {
                this.passwordRegistrations.add(description, password);
                this.writePasswordRegistrationsToLocalStorage();
            }
            
            addPasswordAttempt(desc, password) {
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
            }            
            
            getMostRecentPasswordRegistration() {
                if (!this.passwordRegistrations)
                    return null;
                
                return this.passwordRegistrations.getMostRecentPasswordRegistration();
            }
            
            getPasswordRegistrationByDescription(description) {
                if (!this.passwordRegistrations)
                    return null;
                
                return this.passwordRegistrations.getPasswordRegistrationByDescription(description);
            }
        };
        
        return App;
    }(jQuery)
);
